import gql from "graphql-tag";

export default gql`
  mutation endTurn($currentPlayerIndex: Int!, $round: Int!, $roundScore: Int!, $currentDarts: Array!, $marks: Array!) {
    endTurn(
      currentPlayerIndex: $currentPlayerIndex
      round: $round
      roundScore: $roundScore
      currentDarts: $currentDarts
      scoreHistory: $scoreHistory
      marks: $marks
    ) @client {
      currentPlayerIndex
      round
      roundScore
      currentDarts
      marks
      scoreHistory
    }
  }
`;
