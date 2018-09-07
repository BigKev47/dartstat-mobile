import { defaultState, resolvers } from "./index";
import { ApolloClient } from "apollo-client/index";
import { HttpLink } from "apollo-link-http/lib/index";
import { InMemoryCache } from "apollo-cache-inmemory/lib/index";
import { withClientState } from "apollo-link-state/lib/index";
import { ApolloLink } from "apollo-link/lib/index";
import { setContext } from "apollo-link-context";
import { getToken } from "../loginUtils";


const cache = new InMemoryCache();

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();
  console.log(token);
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: resolvers
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    stateLink,
    new HttpLink({
      uri: 'https://api.graph.cool/simple/v1/cjf65iozh1xj701410jqbrlf2'
    })
  ]),
  cache
});

export default client