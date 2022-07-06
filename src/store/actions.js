export default {
    setSidebarState({ commit }, params) {
        const { state } = params;
        commit('SIDEBAR_STATE', state);
    },
};
