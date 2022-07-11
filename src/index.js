import '@src/plugins/__composition-api__';
import Vue from 'vue';
import vuetify from '@src/plugins/__vuetify__';

import App from '@src/app';
import store from '@src/store';
import swRegister from '@src/register-service-worker';
import '@src/graphql/apollo';

Vue.config.productionTip = false;

Vue.prototype.$workbox = swRegister.wb;

new Vue({
    vuetify,
    store,
    render: (h) => h(App),
}).$mount('#app');
