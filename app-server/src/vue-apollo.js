import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_URL || "http://localhost:1337/graphql",
  headers:{
    authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsInN1YiI6IlRyYWJhbGhvIGRlIExFSTIwMjEiLCJpYXQiOjE2MTU2NjExNDh9.bU2-eayhOmIKSr4w4paqnEREg_YRAA64PSr8ZPp-w7M",
  }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

export default apolloClient;