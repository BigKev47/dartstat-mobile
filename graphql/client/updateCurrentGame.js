import gql from 'graphql-tag'

export default gql`
    mutation updateCurrentGame($index: String!, $value: String!) {
        updateCurrentGame(index: $index, value: $value) @client {
            id
            darts
            playersIds
            currentPlayerIndex
            currentDarts
            roundScore
            scores
            marks
            tempMarks
            gameType
            gameMarks
            scoreHistory
            round
            gameCompleted
            gameActive

        }
    }
`
