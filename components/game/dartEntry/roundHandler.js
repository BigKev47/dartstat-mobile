import { Alert } from "react-native";

export const roundHandler = async (props) => {
  const { endTurn, currentGame: { currentDarts, currentPlayerIndex, scores, scoreHistory, round, roundScore, gameType } } = props;
  if (currentDarts.length === 3) {
    try {
      const newPlayerIndex = (currentPlayerIndex + 1) % 2;
      let _marks = [];
      let _tempMarks = [];
      const _round =
        newPlayerIndex === 0 ? round + 1 : round;
      let _scoreHistory = scoreHistory.slice(0);
      let playerScoreHistory = _scoreHistory[currentPlayerIndex].slice(0);
      let playerScore = scores[currentPlayerIndex];
      let _scores = scores.slice();
      _scoreHistory[currentPlayerIndex] = playerScoreHistory;

      //Scoring procedure for Cricket
      if (gameType === "Cricket") {
        const { marks, tempMarks } = props;
        if (playerScore !== roundScore) {
          playerScoreHistory.push(playerScore);
          _scores[currentPlayerIndex] = roundScore;
        }
        _marks = marks.slice();
        _marks[currentPlayerIndex] = tempMarks;
        _tempMarks = marks[newPlayerIndex];
        //Scoring procedure for 501
      } else if (gameType === "501") {
        console.log("playerScore:" + playerScore);
        _scores[currentPlayerIndex] = playerScore - roundScore;
      }
      await endTurn({
        variables: {
          //TODO get player login worked out and remove this hard-code
          round: _round,
          currentPlayerIndex: newPlayerIndex,
          roundScore: 0,
          currentDarts: [],
          marks: _marks,
          tempMarks: _tempMarks,
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