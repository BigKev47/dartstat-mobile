import gql from 'graphql-tag'

export default gql`
    mutation updateCurrentGame($index: String!, $value: String!) {
        updateCurrentGame(index: $index, value: $value) @client {
            id
            darts
            players{
                id
                firstName
                lastName
            }
            currentDarts
            roundScore
            scores
            currentPlayerIndex
            round
            gameActive
        }
    }
`
