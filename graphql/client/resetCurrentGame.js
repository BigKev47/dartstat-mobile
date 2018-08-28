import gql from 'graphql-tag'

export default gql`
  mutation {
    resetCurrentGame @client {
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
