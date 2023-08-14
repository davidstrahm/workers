window.onload = function () {
    let cube = document.getElementById('box-container');
    let btn = document.getElementById('btn');
    btn.addEventListener('click', sendMessageToWorker, false);

    let position = 0;
    let w;

    // initialize web worker and listen to messages
    if (typeof Worker !== 'undefined') {
        if (typeof w == 'undefined') {
            w = new Worker('worker.js');
        }
        w.onmessage = function (event) {
            console.log('[main.js] received: ', event.data);
        };
    } else {
        console.error('WebWorker not supported.');
    }

    function animateCube() {
        position += 0.2;
        let rotateX = 'rotateX(' + position + 'deg)';
        let rotateY = 'rotateY(' + position + 'deg)';
        cube.style.transform = rotateX + ' ' + rotateY;
        requestAnimationFrame(animateCube);
    }
    requestAnimationFrame(animateCube);

    function sendMessageToWorker() {
        // send message to worker, payload is number of seconds to sleep
        w.postMessage(5);
    }
};
