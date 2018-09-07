import gql from "graphql-tag";

export default gql`
    query userQuery {
        user{
            id
            firstName
            lastName
        }
    }

`;
