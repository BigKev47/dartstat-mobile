import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';

import { NumberGrid } from '../components/NumberGrid.js';
import {createDart, allUsers, createGame, endTurn, updateCurrentGame, getCurrentGame} from "../graphql";
import {graphql, compose} from "@expo/react-apollo";
import {Scoreboard} from "../components/Game/Scoreboard";
import {DartEntry} from "../components/Game/DartEntry";
import NewGame from "../components/Game/NewGame";
import Colors from "../constants/Colors";
import {GameOver} from "../components/Game/GameOver";





export class Game extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            players: ["cjf673owt4whi0104fng14osm", "cjf677xt84xp50104rig3zrmd"],
            currentnum: "",
            issection: false,
            roundscore: 0,
            darts: [[],[]],
            homeScore: 501,
            awayScore: 501,
            round: 1,
            homeTurn: true,
            gameCompleted: false,
            currentDarts: [],
            gameId: ""
        };

        // this.switchEntryScreen = this.switchEntryScreen.bind(this);
        this.dartHandler = this.dartHandler.bind(this);
        this.turnSwitcher = this.turnSwitcher.bind(this);
        this.roundHandler = this.roundHandler.bind(this);
        this.createGame = this.createGame.bind(this);

    };
//TODO: Refactor gameplay and incorporate round scores and game winning/losing conditions

    turnSwitcher = async () => {
      try{
        const { endTurn, currentGame } = this.props;
        this.setState({currentDarts: []});
        const newPlayerIndex = currentGame.currentPlayerIndex + 1;
        const newRound = newPlayerIndex === 0 ? currentGame.round + 1:currentGame.round;
        await endTurn({
          variables: {
            //TODO get player login worked out and remove this hard-code
            round: newRound,
            currentPlayerIndex: newPlayerIndex,
            roundScore: 0
          }});
        }catch(err){console.log(err)}


      };
        // if (this.state.players.length > 1){
        //     this.setState(
        //         {homeTurn: !this.state.homeTurn,
        //         roundscore: 0,
        //         currentDarts: []}
        // )}else{
        //     this.setState({roundscore: 0,
        //                     currentDarts: []})
        // }
        // if (!this.state.homeTurn) {
        //     this.state.round++
        // }


    roundHandler = async (dart) => {
        const { loading, endTurn, currentGame, updateCurrentGame } = this.props;
        let playerIdx = currentGame.currentPlayerIndex;
        let tempScore = (!this.state.homeTurn) ? this.state.awayScore : this.state.homeScore;
        let outScore = tempScore - this.state.roundscore;
        if (outScore < 2) {
            if (outScore === 0 && dart.sectionHit === 2) {
                console.log("Game Over");
                this.setState((!this.state.homeTurn) ?
                    {awayScore: 0, gameCompleted: true} :
                    {homeScore: 0, gameCompleted: true} );
            } else {
                console.log("Bust");
                this.turnSwitcher()
            }
        }else {
          if (this.state.currentDarts.length === 3) {
            let playerScore = currentGame.scores[currentGame.currentPlayerIndex];
            console.log("playerScore:" + playerScore);
            let newScore = playerScore - currentGame.roundScore;
            let scores = currentGame.scores.slice(0);
            scores[playerIdx] = newScore;
            console.log("newScore: " + newScore);
            console.log("scores: " + scores);
            try {
              await updateCurrentGame({
                variables: {
                  index: "scores",
                  value: scores
                }
              });
            }catch(err){console.log(err)}
            this.turnSwitcher();
            console.log(currentGame);


          }
        }
    };

    dartHandler = async (dart) => {
      const {createDart, currentGame, updateCurrentGame} = this.props;
      let player = currentGame.currentPlayerIndex;
      console.log(currentGame)
      //This calculates the score by multiplying any triples or doubles
      let dartscore;
      !(dart.sectionHit) ? dartscore = 0 :
          dartscore = dart.numberHit * (dart.sectionHit > 1 ? dart.sectionHit : 1);

      //Ths updates the current score and dart log
      let roundscore = currentGame.roundScore + dartscore;

      let currentDarts = this.state.currentDarts;
      currentDarts.push(dart);
      this.setState({currentDarts: currentDarts});
      //This pushes the dart to the gql backend
      try {
        // await createDart({
        //   variables: {
        //       //TODO get player login worked out and remove this hard-code
        //       playerId: this.state.players[player],
        //       gameId: this.state.gameId,
        //       numberHit: parseInt(dart.numberHit),
        //       sectionHit: dart.sectionHit
        //     }
        // });
        await updateCurrentGame({
          variables: {
            index: "roundScore",
            value: roundscore
          }
        });
        console.log("roundscore:" + roundscore, "dartscore:" + dartscore);
        this.roundHandler(dart)
      }
      catch (err) {
        console.log(err)
      }


      // TODO get DArts to update
      //   const { currentGame, updateCurrentGame } = this.props;
      //   const darts =  currentGame.darts.push(dart);
      //   updateCurrentGame({
      //     variables: {
      //       index: 'darts',
      //       value: darts}
      // });

      // this.setState({roundscore: roundscore},


    };

    createGame = async () => {
        const { loading, createGame } = this.props;
        try {
            const newGame = await createGame({
                variables: {
                    gameType: "501",
                    playersIds: this.state.players
                }
            });
            console.log("gameID:"+ newGame.data.createGame.id);
            const { updateCurrentGame } = this.props;
            updateCurrentGame({
              variables: {
                index: 'id',
                value: newGame.data.createGame.id}
          });
            this.setState({gameId: newGame.data.createGame.id});

        }
        catch (error) {
            console.log(error);
        }
    };

    render()
{
  const screen = !this.state.gameId ?
      <NewGame onPress={this.createGame}/> :
      !this.state.gameCompleted ?

          <DartEntry onPress={this.dartHandler}
                     style={styles.dartentry}{...this.state} />
          :
          <GameOver/>;
  const scoreBoard = this.state.gameId && !this.state.gameCompleted ? <Scoreboard style={styles.scoreboard}
                                                                                  {...this.state} /> : null;

//TODO Create a running scoreboard with all necessary information and proper columns
  return <View style={styles.container}>
    {scoreBoard}
    {screen}
  </View>



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
    })
)(Game);
