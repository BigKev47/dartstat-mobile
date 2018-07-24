import { Alert } from "react-native";

export const roundHandler = async (props) => {
  const { endTurn, currentGame } = props;
  if (currentGame.currentDarts.length === 3) {
    try {

      const newPlayerIndex = (currentGame.currentPlayerIndex + 1) % 2;
      const newRound =
        newPlayerIndex === 0 ? currentGame.round + 1 : currentGame.round;
      let newScoreHistory = currentGame.scoreHistory.slice(0);
      let playerScoreHistory = newScoreHistory[currentGame.currentPlayerIndex].slice(0);
      let playerScore = currentGame.scores[currentGame.currentPlayerIndex];
      playerScoreHistory.push(playerScore);
      newScoreHistory[currentGame.currentPlayerIndex] = playerScoreHistory;

      await endTurn({
        variables: {
          //TODO get player login worked out and remove this hard-code
          round: newRound,
          currentPlayerIndex: newPlayerIndex,
          roundScore: 0,
          currentDarts: [],
          marks: currentGame.tempMarks,
          scoreHistory: newScoreHistory

        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  ;
}