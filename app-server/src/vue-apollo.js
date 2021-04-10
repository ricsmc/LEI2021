import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_URL || "http://localhost:1337/graphql",
  headers:{
    authorization:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsInN1YiI6IlRyYWJhbGhvIGRlIExFSTIwMjEiLCJpYXQiOjE2MTgwNjc2NDR9.Uq_Vg7fwVLY8nAwQzEHkw8GfvkBjFozzLTIdANCvXf-nqZdwUvyYJT6oI_gMdsi_b5NyswBVeSrH9NmS45jeao4wnbKbhKEoMHuaEqgWmtitinj8T3e0-f8e7jtB9umT-HNadLIlrCYDM-H599EuC9YGjzOjgMZLYUvasVdxjRDaA71e0ycMHQfS_-bSe6o96C1Htn93cFU9D1CJBDRgVU6KhsG7BvgjunySx87KCYSEh-MUfKk8mYR-6Eeyjymgrmb1xkIVzoeErb_omjyO9yvUIV_U1wTUCbsEtHi3PQV8320hN_e_HdXfhXuFggARcA0SmDJ3l3pUHfFuBsa7NWprTLki4fAIBzz83Xi0g_JPqzVJDG8e9pKvZ5lv-4zrSupos44x4Mbn5rgb4u770IJ5zG3JhHos1J58aC2OoZFmNNB3MWJD6oC74hoHBpt_fRUU-vnLEaOg7L4d06m1311mEaLHO22KFtIhHoL0_NmygGC-PEFwabLRIx_66qdjgQ_x-ZOPQbW0SJ3yKQjxHOk10oqNxRwCK0-AqyGQz8N3-aRTXm9obVOHJfkWPL_jbmCmqGsl8Bt76JCrmZkl9vk35puwP4GrUz-IAP0mkloPog1SRh9buxZFFgp5bST3Im_kHQfcDKyy-Q82COVXygYXR1lRvqX6FEIhGLdaPRA",
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