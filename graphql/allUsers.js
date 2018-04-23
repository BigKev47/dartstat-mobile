import gql from 'graphql-tag'

export default gql`
    query allUsers {
        allUsers{
            id
            firstName
            lastName
        }
        
    }
`
