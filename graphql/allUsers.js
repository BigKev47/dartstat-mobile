import gql from 'graphql-tag'

export default gql`
    query allUsers {
        allUsers{
            id
            #            TODO: merge in player type
            #            firstName
            #            lastName
        }
        
    }
`
