import gql from 'graphql-tag'

export default gql`
    mutation endTurn(
    $currentPlayerIndex: Int!, 
    $round: Int!, 
    $roundScore: Int!
    ) @client{
        endTurn(
            currentPlayerIndex: $currentPlayerIndex
            round: $round
            roundScore: $roundScore
        )
    }
`
