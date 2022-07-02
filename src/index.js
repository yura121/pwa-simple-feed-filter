import Vue from 'vue';
import vuetify from '@src/plugins/__vuetify__';

import App from '@src/app';
import swRegister from '@src/register-service-worker';

Vue.config.productionTip = false;

Vue.prototype.$workbox = swRegister.wb;

new Vue({
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
