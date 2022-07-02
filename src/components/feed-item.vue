<template>
    <v-list-item :id="id">
        <v-list-item-content>
            <swiper
                :initial-slide="1"
                :slides-per-view="1"
                :space-between="50"
                @slideChange="onSlideChange"
            >
                <swiper-slide class="read"><v-list-item-title>Статья {{ id }}</v-list-item-title></swiper-slide>
                <swiper-slide><v-list-item-title>Статья {{ id }}</v-list-item-title></swiper-slide>
                <swiper-slide class="trash"><v-list-item-title>Статья {{ id }}</v-list-item-title></swiper-slide>
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
        props: ['id'],
        components: {
            Swiper,
            SwiperSlide,
        },
        methods: {
            onSlideChange() {
                console.log('slide change');
            },
        },
    };
</script>
