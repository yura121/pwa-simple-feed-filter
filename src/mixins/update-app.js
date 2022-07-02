export default {
    data() {
        return {
            prompt: false,
        };
    },
    methods: {
        async update() {
            this.prompt = false;
            await this.$workbox.messageSkipWaiting();
        },
        skipUpdate() {
            this.prompt = false;
        },
    },
    created() {
        if (this.$workbox) {
            this.$workbox.addEventListener('waiting', () => {
                this.prompt = true;
            });
        }
    },
};
