import { defaultState, resolvers } from "./index";
import { ApolloClient } from "apollo-client/index";
import { HttpLink } from "apollo-link-http/lib/index";
import { InMemoryCache } from "apollo-cache-inmemory/lib/index";
import { withClientState } from "apollo-link-state/lib/index";
import { ApolloLink } from "apollo-link/lib/index";


const cache = new InMemoryCache();




const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: resolvers
});

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: 'https://api.graph.cool/simple/v1/cjf65iozh1xj701410jqbrlf2'
    })
  ]),
  cache
});

export default client