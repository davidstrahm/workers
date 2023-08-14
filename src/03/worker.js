// listen to messages from the main thread
self.addEventListener(
    'message',
    function (e) {
        const payload = e.data;
        const workerId = `[Worker #${payload}]`;
        console.log(`${workerId} start`);

        // completely block this thread for 10 seconds
        const nSeconds = 5;
        block(nSeconds);

        // send message to main thread
        console.log(`${workerId} blocked for ${nSeconds} seconds`);
        self.postMessage(`${workerId} done`);
    },
    false,
);

function block(n) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < n * 1000) {}
}
