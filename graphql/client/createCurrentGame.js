import gql from 'graphql-tag'

export default gql`
    mutation createCurrentGame(
    $id: ID!,
        $gameType: String!,
       $playersIds: [ID!],
        $scores: [Int!],
        $scoreHistory: [[Int]],
        $marks: [[Int]],
        $gameMarks: [String]
    $tempMarks: [Int]
    ) {
        createCurrentGame(
            id: $id,
            gameType: $gameType,
            playersIds: $playersIds,
            scores: $scores,
            marks: $marks,
            tempMarks: $tempMarks,
            scoreHistory: $scoreHistory,
            gameMarks: $gameMarks
        ) @client {
            id
        }
        }
  
  `