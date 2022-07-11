<template>
    <v-list-item :id="data.id">
        <v-list-item-content>
            <swiper
                :initial-slide="1"
                :slides-per-view="1"
                :space-between="50"
                @slideChange="onSlideChange"
            >
                <swiper-slide class="read">
                    <v-list-item-title>{{ data.title }}</v-list-item-title>
                </swiper-slide>
                <swiper-slide>
                    <v-list-item-title>{{ data.title }}</v-list-item-title>
                </swiper-slide>
                <swiper-slide class="trash">
                    <v-list-item-title>{{ data.title }}</v-list-item-title>
                </swiper-slide>
            </swiper>
        </v-list-item-content>
    </v-list-item>
</template>

<style scoped>
    .trash {
        color: red;
    }
    .read {
        color: green;
    }
</style>

<script>
    import { Swiper, SwiperSlide } from 'swiper-vue2';

    export default {
        props: ['data'],
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            function onSlideChange() {
                console.log('slide change');
            }

            return {
                onSlideChange,
            };
        },
    };
</script>
