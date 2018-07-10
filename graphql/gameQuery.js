import gql from 'graphql-tag'

export default gql`
    query GameQuery ($id: ID!){
        Game {
            id
            gameType
            players{
                id
                firstName
                lastName
            }
            scores{
                player{
                    id
                }
                score
                marks
            }
    }
`
