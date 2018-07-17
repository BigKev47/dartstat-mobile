import gql from 'graphql-tag'

export default gql`
    query GameQuery ($id: ID!){
        Game (id: $id){
            id
            players{
                id
                firstName
                lastName
            }
        }
    }
`
