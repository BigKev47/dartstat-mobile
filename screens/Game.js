import React from 'react';
import {View, Alert, StyleSheet, Text} from 'react-native';

import { NumberGrid } from '../components/NumberGrid.js';
import {
  createDart,
  allUsers,
  createGame,
  endTurn,
  updateCurrentGame,
  getCurrentGame,
  resetCurrentGame
} from "../graphql";
import {graphql, compose} from "@expo/react-apollo";
import {Scoreboard} from "../components/Game/Scoreboard/Scoreboard";
import {DartEntry} from "../components/Game/DartEntry";
import NewGame from "../components/Game/NewGame";
import Colors from "../constants/Colors";
import {GameOver} from "../components/Game/GameOver";





export class Game extends React.Component {
         static navigationOptions = { header: null };

         constructor(props) {
           super(props);

           this.state = { players: ["cjf673owt4whi0104fng14osm", "cjf677xt84xp50104rig3zrmd"] };

           this.dartHandler = this.dartHandler.bind(this);
           this.turnSwitcher = this.turnSwitcher.bind(this);
           this.roundHandler = this.roundHandler.bind(this);
           this.createGame = this.createGame.bind(this);
         }
         //TODO: Refactor gameplay and incorporate round scores and game winning/losing conditions

         turnSwitcher = async () => {
           try {
             const { endTurn, currentGame } = this.props;
             const newPlayerIndex = currentGame.currentPlayerIndex + 1;
             const newRound = newPlayerIndex === 0 ? currentGame.round + 1 : currentGame.round;
             await endTurn({
               variables: {
                 //TODO get player login worked out and remove this hard-code
                 round: newRound,
                 currentPlayerIndex: newPlayerIndex,
                 roundScore: 0,
                 currentDarts: []
               }
             });
           } catch (err) {
             console.log(err);
           }
         };

         roundHandler = async dart => {
           const { loading, resetCurrentGame, currentGame, updateCurrentGame } = this.props;
           let playerIdx = currentGame.currentPlayerIndex;
           let currentDarts = currentGame.currentDarts;
           let tempScore = currentGame.scores[playerIdx];
           let outScore = tempScore - currentGame.roundScore;
           if (outScore < 2) {
             if (outScore === 0 && dart.sectionHit === 2) {
               console.log("Game Over");
               Alert.alert(
                 "Game Over",
                 currentGame.players[playerIdx].firstName + " Wins!",
                 [
                   {
                     text: "View Match Report",
                     onPress: () => console.log("Ask me later pressed")
                   },
                   { text: "Done", onPress: () => resetCurrentGame() }
                 ]
               );
             } else {
               Alert.alert("Bust");
               this.turnSwitcher();
             }
           } else {
             if (currentDarts.length === 3) {
               let playerScore = currentGame.scores[currentGame.currentPlayerIndex];
               let newScore = playerScore - currentGame.roundScore;
               let scores = currentGame.scores.slice(0);
               scores[playerIdx] = newScore;
               let scoreHistory = currentGame.scoreHistory.slice(0);
               let playerScoreHistory = scoreHistory[playerIdx].slice(0);
               playerScoreHistory.push(playerScore);
               scoreHistory[playerIdx] = playerScoreHistory;

               console.log("newScore: " + newScore);
               console.log("scores: " + scores);
               try {
                 await updateCurrentGame({
                   variables: {
                     index: "scoreHistory",
                     value: scoreHistory
                   }
                 });
                 await updateCurrentGame({
                   variables: {
                     index: "scores",
                     value: scores
                   }
                 });
               } catch (err) {
                 console.log(err);
               }
               this.turnSwitcher();
               console.log(currentGame);
             }
           }
         };

         dartHandler = async dart => {
           const { createDart, currentGame, updateCurrentGame } = this.props;
           let player = currentGame.currentPlayerIndex;
           console.log(dart);
           //This calculates the score by multiplying any triples or doubles
           let dartscore = dart.sectionHit === null ? 0 : dart.numberHit * (dart.sectionHit === 0 ? 1 : dart.sectionHit);

           //Ths updates the current score and dart log
           let roundscore = currentGame.roundScore + dartscore;

           let currentDarts = currentGame.currentDarts.slice(0);
           currentDarts.push(dart);
           //This pushes the dart to the gql backend
           try {
             const newDart = await createDart({
               variables: {
                 //TODO get player login worked out and remove this hard-code
                 playerId: currentGame.players[player].id,
                 gameId: currentGame.id,
                 numberHit: parseInt(dart.numberHit),
                 sectionHit: dart.sectionHit
               }
             });
             await updateCurrentGame({
               variables: {
                 index: "roundScore",
                 value: roundscore
               }
             });
             await updateCurrentGame({
               variables: {
                 index: "currentDarts",
                 value: currentDarts
               }
             });
             console.log("roundscore:" + roundscore, "dartscore:" + dartscore);
             this.roundHandler(dart);
           } catch (err) {
             console.log(err);
           }
         };

         createGame = async () => {
           const { createGame, currentGame, loading } = this.props;
           let gameMarks = [];
           let marks = [[],[]];
           for (let i=20; i>14; i--){
             gameMarks.push(i)
           }
           gameMarks.push("Bull");
           for (let i = 0; i<gameMarks.length; i++){
             marks[0].push("0");
             marks[1].push("0");
           }
           try {
             const newGame = await createGame({
               variables: {
                 gameType: "Cricket",
                 playersIds: this.state.players
               }
             });
             console.log("gameID:" + newGame.data.createGame.id);
             const { updateCurrentGame } = this.props;
             //This is where I create the scorecard for Cricket Games it's not working
             await updateCurrentGame({
               variables: {
                 index: "id",
                 value: newGame.data.createGame.id
               }
             });
             await updateCurrentGame({
               variables: {
                 index: "gameMarks",
                 value: gameMarks
               }
             });
             await updateCurrentGame({
               variables: {
                 index: "marks",
                 value: marks
               }
             });

             // console.log("Game Marks " + currentGame.gameMarks)
           } catch (error) {
             console.log(error);
           }
           if(!loading){console.log(currentGame)}
         };

         render() {


           // let testSet1 = { 20: 3, 19: 2};
           // for (let i in testSet1){
           //   scoreCard[i] += testSet1[i]
           // }
           // const valTest = scoreCard[14];
           // const test = <Text>{valTest}</Text>;
           // //!testSet.hasOwnProperty('15') ? <Text>True</Text>: <Text>False</Text>
           const screen = !this.props.currentGame.id ? <NewGame onPress={this.createGame} /> : <DartEntry onPress={this.dartHandler} style={styles.dartentry} {...this.state} />;
           const scoreBoard = this.props.currentGame.id ? <Scoreboard {...this.props} /> : null;

           //TODO Create a running scoreboard with all necessary information and proper columns
           return <View style={styles.container}>
               {scoreBoard}
               {screen}
             </View>;
         }
       }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.scoreBoard,
        alignContent: "center",
    },

    scoreboard: {
        flex: 5,
        backgroundColor: Colors.scoreBoard,
    },
//TODO: Figure out how to properly scale my text sizes.

    dartentry: {
        flex: 3,
        flexDirection: 'row',
    },

});

export default compose(
    graphql(createDart, { name: 'createDart' }),
    graphql(createGame, {name: 'createGame'}),
    graphql(endTurn, {name: 'endTurn'}),
    graphql(getCurrentGame, {
      props: ({data: {currentGame, loading}}) => ({
        currentGame,
        loading
      })
    }),
    graphql(updateCurrentGame, {
      name: 'updateCurrentGame'
    }),
    graphql(resetCurrentGame, {
      name: 'resetCurrentGame'
    })
)(Game);
