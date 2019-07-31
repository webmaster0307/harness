import ApolloClient from "apollo-boost"
import fetch from "isomorphic-unfetch"

export const client = new ApolloClient({
  uri: 'https://6251430c.ngrok.io/graphql',
  fetch,
});
