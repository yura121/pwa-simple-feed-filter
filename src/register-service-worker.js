import { Workbox } from 'workbox-window';

let wb = null;
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    wb = new Workbox('/service-worker.js');
    wb.addEventListener('controlling', () => {
        window.location.reload();
    });
    wb.register()
        .then(() => { console.log('ServiceWorker registered'); });
}

export default {
    wb,
};
