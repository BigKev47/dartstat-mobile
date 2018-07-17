import gql from 'graphql-tag'

export default gql`
  query {
      currentGame @client {
          id
          playersIds
          scores 
          scoreHistory
          marks
          gameMarks
          currentPlayerIndex
          darts
          currentDarts
          roundScore
          round
          gameType
          gameActive
      }
  }
`
