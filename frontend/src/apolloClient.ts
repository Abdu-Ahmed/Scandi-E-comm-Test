import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  fetchOptions: {
    mode: 'cors'
  }
});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  }
});

export default client;