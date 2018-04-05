import gql from 'graphql-tag'

export default gql`
  mutation createGame(
    $gameType: String!
    $playersIds: [ID!]!
  ) {
    createGame(
      gameType: $gameType
      playersIds: $playersIds
    ) {
      id
      gameType
    }
  }
`
