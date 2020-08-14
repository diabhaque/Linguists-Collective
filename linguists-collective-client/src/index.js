import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';
import getClient from './utils/getClient'

const defaultUser={
  token: undefined,
  userId: ""
}

const user=(JSON.parse(localStorage.getItem('user'))||defaultUser)

ReactDOM.render(
  <ApolloProvider client={getClient(user.token)}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
