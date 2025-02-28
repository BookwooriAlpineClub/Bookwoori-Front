function registerServiceWorker() {
  if (typeof window !== 'undefined') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
        .then((registration) => {
          console.log('Service Worker Registered');
          console.dir(registration);
        });
    }
  }
}
registerServiceWorker();
