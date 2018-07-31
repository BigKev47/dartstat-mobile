import { Alert } from "react-native";

export const roundHandler = async (props) => {
  const { endTurn, currentGame: { currentDarts, currentPlayerIndex, scores, scoreHistory, round, marks, tempMarks, roundScore } } = props;
  if (currentDarts.length === 3) {
    try {

      const newPlayerIndex = (currentPlayerIndex + 1) % 2;
      const _round =
        newPlayerIndex === 0 ? round + 1 : round;
      let _scoreHistory = scoreHistory.slice(0);
      let playerScoreHistory = _scoreHistory[currentPlayerIndex].slice(0);
      let playerScore = scores[currentPlayerIndex];
      let _scores = scores.slice();
      if (playerScore !== roundScore) {
        playerScoreHistory.push(playerScore);
        _scores[currentPlayerIndex] = roundScore;
      }
      _scoreHistory[currentPlayerIndex] = playerScoreHistory;

      let _marks = marks.slice();
      _marks[currentPlayerIndex] = tempMarks;

      await endTurn({
        variables: {
          //TODO get player login worked out and remove this hard-code
          round: _round,
          currentPlayerIndex: newPlayerIndex,
          roundScore: 0,
          currentDarts: [],
          marks: _marks,
          tempMarks: marks[newPlayerIndex],
          scoreHistory: _scoreHistory,
          scores: _scores

        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  ;
}