import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

const APP_GRAPHQL_ENDPOINT = process.env.APP_GRAPHQL_ENDPOINT || 'https://127.0.0.1:8000/graphql/';

const httpLink = new HttpLink({
    uri: APP_GRAPHQL_ENDPOINT,
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});
