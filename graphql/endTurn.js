import gql from 'graphql-tag'

export default gql`
    mutation endTurn($index: String!, $value: String!) {
        updateCurrentGame(index: $index, value: $value) @client {
            currentDarts
            roundScore
            scores
            currentPlayerIndex
            round
            gameActive
        }
    }
`
