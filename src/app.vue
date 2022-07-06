<template>
    <v-app id="inspire">
        <v-system-bar app>
            <v-spacer>Версия: {{ appVersion }}</v-spacer>
        </v-system-bar>
        <v-main>
            <v-container class="py-8 px-6" fluid>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-list two-line>
                                <template v-for="(feedItem, index) in feedItemList">
                                    <feed-item
                                        :data="feedItem"
                                        :key="feedItem.id"
                                    ></feed-item>
                                    <v-divider
                                        v-if="index !== (listCount - 1)"
                                        :key="`divider-${feedItem.id}`"
                                    ></v-divider>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <update-notify v-model="prompt" @update-app="update()" @skip-update-app="skipUpdate()"></update-notify>
    </v-app>
</template>

<script>
    import FeedItem from '@src/components/feed-item';
    import UpdateNotify from '@src/components/update-notify';
    import UpdateApp from '@src/mixins/update-app';
    import { GET_ALL_FEED_ITEMS_QUERY } from '@src/graphql/queries/feedQuery';

    export default {
        components: {
            FeedItem,
            UpdateNotify,
        },
        mixins: [UpdateApp],
        data: () => ({
            cards: ['Today'],
            drawer: null,
            links: [
                ['mdi-inbox-arrow-down', 'Inbox'],
                ['mdi-send', 'Send'],
                ['mdi-delete', 'Trash'],
                ['mdi-alert-octagon', 'Spam'],
            ],
            feedItemList: [],
        }),
        computed: {
            appVersion() {
                return this.$store.getters.APP_VERSION;
            },
            listCount() {
                return this.feedItemList.length;
            },
        },
        async mounted() {
            const { data } = await this.$apollo.query({ query: GET_ALL_FEED_ITEMS_QUERY });
            const { feedItems } = data.feedItemList;
            this.feedItemList = feedItems;
        },
    };
</script>
