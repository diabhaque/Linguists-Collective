import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';

const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:4000',
      credentials: 'include'
    }),
    cache: new InMemoryCache()
});

export default client