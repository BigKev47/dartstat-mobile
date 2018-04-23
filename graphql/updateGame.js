import gql from 'graphql-tag'

export default gql`
  mutation updateGame($index: String!, $value: String!) {
    updateCurrentGame(index: $index, value: $value) @client {
        __typename
        darts
        
    }
  }
`
