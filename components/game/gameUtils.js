import * as Alert from "react-native";
import {createDart, endTurn, getCurrentGame, resetCurrentGame, updateCurrentGame} from "../../graphql";
import {compose, graphql} from "@expo/react-apollo/index";
import {Game} from "../../screens/Game";


const turnSwitcher = async () => {
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

export const roundHandler = async (dart) => {
  const { loading, resetCurrentGame, currentGame, updateCurrentGame } = this.props;
  let playerIdx = currentGame.currentPlayerIndex;
  let tempScore = currentGame.scores[playerIdx];
  let outScore = tempScore - currentGame.roundScore;
  if (outScore < 2) {
    if (outScore === 0 && dart.sectionHit === 2) {
      Alert.alert(
          'game Over',
          currentGame.players[playerIdx].firstName + ' Wins!',
          [{text: 'View Match Report', onPress: () => console.log('Ask me later pressed')},
            {text: 'Done', onPress: () => resetCurrentGame()},
          ])
    } else {
      Alert.alert(
          "Bust"
      );
      this.turnSwitcher()
    }
  }else {
    if (this.state.currentDarts.length === 3) {
      let playerScore = currentGame.scores[currentGame.currentPlayerIndex];
      console.log("playerScore:" + playerScore);
      let newScore = playerScore - currentGame.roundScore;
      let scores = currentGame.scores.slice(0);
      scores[playerIdx] = newScore;
      let scoreHistory = currentGame.scoreHistory.slice(0);
      let playerScoreHistory = scoreHistory[playerIdx].slice(0);
      playerScoreHistory.push(playerScore);
      scoreHistory[playerIdx] = playerScoreHistory

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
      }catch(err){console.log(err)}
      this.turnSwitcher();
      console.log(currentGame);


    }
  }
};

export const dartHandler = async () => {
  const { dart } = this.props;
  const {createDart, currentGame, updateCurrentGame} = this.props;
  let player = currentGame.currentPlayerIndex;
  console.log(dart)
  //This calculates the score by multiplying any triples or doubles
  let dartscore=
      dart.sectionHit === null ? 0 :
          dart.numberHit * (dart.sectionHit === 0 ? 1 : dart.sectionHit);

  //Ths updates the current score and dartEntry log
  let roundscore = currentGame.roundScore + dartscore;

  let currentDarts = this.state.currentDarts;
  currentDarts.push(dart);
  this.setState({currentDarts: currentDarts});
  //This pushes the dartEntry to the gql backend
  try {
    await createDart({
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
    console.log("roundscore:" + roundscore, "dartscore:" + dartscore);
    this.roundHandler(dart)
  }
  catch (err) {
    console.log(err)
  }
};

export const newGame = async () => {
  const { createGame } = this.props;
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

  }
  catch (error) {
    console.log(error);
  }
};

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
)(gameUtils);