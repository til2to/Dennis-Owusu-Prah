import React from "react";
import App from "./App";
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import { createRoot } from 'react-dom/client';


const client = new ApolloClient({
  uri: 'http://localhost:4000/gql',
  cache: new InMemoryCache()
})

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();