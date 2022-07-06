export default {
    SIDEBAR_STATE: (state) => {
        const { sidebar } = state;
        return sidebar;
    },
    APP_VERSION: (state) => state.appVersion,
};
