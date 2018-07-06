import gql from 'graphql-tag'

export default gql`
  query {
    currentGame @client {
        id
        darts
        players{
            id
            firstName
            lastName
        }
        currentPlayerIndex
        currentDarts
        roundScore
        scores
        marks
        gameType
        gameMarks
        scoreHistory
        round
        gameActive
    }
  }
`