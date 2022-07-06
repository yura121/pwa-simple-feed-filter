import gql from 'graphql-tag';

export const GET_ALL_FEED_ITEMS_QUERY = gql`
    query feedItemList {
        feedItemList(limit: 2) {
            feedItems {
                id
                title
            }
        }
    }
`;
