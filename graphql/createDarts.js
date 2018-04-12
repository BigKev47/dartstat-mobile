import gql from 'graphql-tag'

export default gql`
    mutation createDarts(
    $numberHit: Int!
    $sectionHit: Int!
    $playerId: ID!
    $gameId: ID!
    ){
        createDart(
            numberHit: $numberHit
            gameId: $gameId
            sectionHit: $sectionHit
            playerId: $playerId
        ) {
            numberHit
            sectionHit
            game{
                id
            }
            player{
                id
            }
        }
    }
`
