import gql from 'graphql-tag'

export default gql`
    mutation updateGame($index: String!, $value: String!) {
        updateCurrentGame(index: $index, value: $value) @client {
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
