import ApolloClient from "apollo-boost"
import fetch from "isomorphic-unfetch"

import { getAuthToken, isTokenExpired, refreshAuthToken } from './auth'

export const client = new ApolloClient({
  uri: 'https://absolutesds.meghanmace.com/graphql',
  fetch,
  request: async operation => {
    let token = getAuthToken();

    if (token && isTokenExpired(token)) {
      token = await refreshAuthToken();
    }

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    });
   }
});
