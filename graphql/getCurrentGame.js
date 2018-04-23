import gql from 'graphql-tag'

export default gql`
  query {
    currentGame @client {
        id
        darts
        currentDarts
        roundScore
        homeScore
        awayScore
        round
        homeTurn
        gameActive
    }
  }
`
