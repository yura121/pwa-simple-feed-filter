import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
    uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

provideApolloClient(apolloClient);
