import ApolloClient from "apollo-boost"
import fetch from "isomorphic-unfetch"

export const client = new ApolloClient({
  uri: 'http://192.241.255.182/graphql',
  fetch,
});
