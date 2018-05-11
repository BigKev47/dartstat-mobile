import gql from 'graphql-tag'

export default gql`
  mutation {
    resetCurrentGame @client {
        id
        players {
            id
            firstName
            lastName
        }
        scores
        scoreHistory
        currentPlayerIndex
        darts
        currentDarts
        roundScore
        round
        gameActive
    }
  }
`
