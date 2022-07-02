import Vue from 'vue';
import vuetify from '@src/plugins/__vuetify__';

import App from '@src/app';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
