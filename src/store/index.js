import Vue from 'vue';
import Vuex from 'vuex';
import state from '@src/store/state';
import mutations from '@src/store/mutations';
import actions from '@src/store/actions';
import getters from '@src/store/getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});
