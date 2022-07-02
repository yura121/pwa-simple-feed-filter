import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: '#6fca75',
                secondary: '#b0bec5',
                accent: '#ffe7db',
                error: '#b71c1c',
            },
        },
    },
};

export default new Vuetify(opts);
