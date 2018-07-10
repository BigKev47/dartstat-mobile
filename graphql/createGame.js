import gql from 'graphql-tag'

export default gql`
    mutation createGame(
    $gameType: String!
    $homePlayerId: ID!
        $awayPlayerId: ID!
        $startingScore: Int
        $startingMarks: Json
    ) {
        createGame(
            gameType: $gameType
            playersIds:  [$homePlayerId, $awayPlayerId]
        
            scores: [{
                playerId: $homePlayerId
                score: $startingScore
                marks: $startingMarks
            }{
                playerId: $awayPlayerId
                score: $startingScore
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