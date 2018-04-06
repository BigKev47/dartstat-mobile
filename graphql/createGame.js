import gql from 'graphql-tag'

export default gql`
  mutation createGame(
    $gameType: String!
  ) {
    createGame(
      gameType: $gameType
    ) {
      id
      gameType
    }
  }
`
