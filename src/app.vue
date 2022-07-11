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
                                        v-if="index !== (feedItemList.length - 1)"
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
    import { computed } from '@vue/composition-api';
    import { useStore } from '@vueblocks/vue-use-vuex';
    import { useQuery } from '@vue/apollo-composable';

    export default {
        components: {
            FeedItem,
            UpdateNotify,
        },
        mixins: [UpdateApp],
        setup() {
            const store = useStore();

            const appVersion = computed(() => store.getters.APP_VERSION);
            const { result } = useQuery(GET_ALL_FEED_ITEMS_QUERY);

            const feedItemList = computed(() => {
                if (result.value) {
                    const { feedItems } = result.value.feedItemList;
                    return feedItems;
                }
                return [];
            });

            return {
                result,
                feedItemList,
                appVersion,
            };
        },
    };
</script>
