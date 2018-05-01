import gql from 'graphql-tag'

export default gql`
    mutation updateCurrentGame($index: String!, $value: String!) {
        updateCurrentGame(index: $index, value: $value) @client {
            id
            darts
            currentDarts
            roundScore
            scores
            currentPlayerIndex
            round
            gameActive
        }
    }
`