// listen to messages from the main thread
self.addEventListener(
    'message',
    function (e) {
        const payload = e.data;
        console.log('[Worker] block for ', payload, ' seconds');

        // completely block this thread for n seconds
        block(payload);

        // send message to main thread
        self.postMessage('[Worker] done');
    },
    false,
);

function block(n) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < n * 1000) {}
}
