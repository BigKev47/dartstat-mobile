import { Alert } from "react-native";

export const roundHandler = async (props) => {
  const { endTurn, currentGame } = props;
  if (currentGame.currentDarts.length === 3) {
    try {

      const newPlayerIndex = currentGame.currentPlayerIndex + 1;
      const newRound =
        newPlayerIndex === 0 ? currentGame.round + 1 : currentGame.round;
      await endTurn({
        variables: {
          //TODO get player login worked out and remove this hard-code
          round: newRound,
          currentPlayerIndex: newPlayerIndex,
          roundScore: 0,
          currentDarts: [],
          marks: currentGame.tempMarks
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  ;
}