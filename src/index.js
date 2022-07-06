import Vue from 'vue';
import vuetify from '@src/plugins/__vuetify__';

import App from '@src/app';
import store from '@src/store';
import swRegister from '@src/register-service-worker';
import { apolloProvider } from '@src/graphql/apollo';

Vue.config.productionTip = false;

Vue.prototype.$workbox = swRegister.wb;

new Vue({
    vuetify,
    store,
    apolloProvider,
    render: (h) => h(App),
}).$mount('#app');
