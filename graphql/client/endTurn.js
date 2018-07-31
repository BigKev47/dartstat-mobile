import gql from "graphql-tag";

export default gql`
    mutation endTurn($currentPlayerIndex: Int!, $round: Int!, $roundScore: Int!, $currentDarts: Array!, $marks: Array! $scoreHistory: Arrray!, $tempMarks: Array!, $scores: Array!) {
    endTurn(
      currentPlayerIndex: $currentPlayerIndex
      round: $round
      roundScore: $roundScore
      currentDarts: $currentDarts
      scoreHistory: $scoreHistory
      marks: $marks
        tempMarks: $tempMarks
        scores: $scores
    ) @client {
      currentPlayerIndex
      round
      roundScore
      currentDarts
      marks
        tempMarks
        scores
      scoreHistory
    }
  }
`;
