<template>
    <v-app id="inspire">
        <v-system-bar app>
            <v-spacer>Версия: {{ appVersion }}</v-spacer>
        </v-system-bar>
        <v-main>
            <v-container
                class="py-8 px-6"
                fluid
            >
                <v-row>
                    <v-col
                        v-for="card in cards"
                        :key="card"
                        cols="12"
                    >
                        <v-card>
                            <v-list two-line>
                                <template v-for="n in 6">
                                    <feed-item
                                        :id="n"
                                        :key="n"
                                    ></feed-item>
                                    <v-divider
                                        v-if="n !== 6"
                                        :key="`divider-${n}`"
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
        }),
        computed: {
            appVersion() {
                return this.$store.getters.APP_VERSION;
            },
        },
    };
</script>
