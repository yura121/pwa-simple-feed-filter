<template>
    <v-snackbar bottom center :value="value" :timeout="-1" color="primary">
        Доступно обновление. Обновить?
        <v-btn text @click="$emit('update-app')">
            Да
        </v-btn>
        <v-btn text @click="$emit('skip-update-app')">
            Нет
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: 'update-notify',
        props: ['value'],
        data() {
            return {
                prompt: this.value,
            };
        },
    };
</script>
