import gql from 'graphql-tag'

//Not currently used, will eventually be used to batch cloud sync.
export default gql`
  mutation updateGame($index: String!, $value: String!) {
    updateCurrentGame(index: $index, value: $value) @client {
        __typename
        darts
        
    }
  }
`
