import gql from 'graphql-tag'

export default gql`
    mutation createGame(
    $gameType: String!
    $homePlayerId: ID!
        $awayPlayerId: ID!
        $startingPoints: Int
        $startingMarks: Json
    ) {
        createGame(
            gameType: $gameType
            playersIds:  [$homePlayerId, $awayPlayerId]
        
            scores: [{
                playerId: $homePlayerId
                points: $startingPoints
                marks: $startingMarks
            }{
                playerId: $awayPlayerId
                points: $startingPoints
                marks: $startingMarks
            }]
        ) {
            id
            gameType
            players{
                id
            }
            scores{
                id
            }
            }
        }
    
`