import gql from 'graphql-tag'

export default gql`
  query {
    currentGame @client {
        id
        darts
        players
        currentPlayerIndex
        currentDarts
        roundScore
        scores
        round
        gameActive
    }
  }
`
