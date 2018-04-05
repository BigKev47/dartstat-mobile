import gql from 'graphql-tag'

export default gql`
    query AllUsers {
        allUsers{
            id
            firstName
            lastName
        }
        
    }
`
