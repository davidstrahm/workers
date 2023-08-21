window.onload = function () {
    let cube = document.getElementById('box-container');
    let btn = document.getElementById('btn');
    btn.addEventListener('click', startWorkers, false);

    let position = 0;

    let workers = [];

    function animateCube() {
        position += 0.2;
        let rotateX = 'rotateX(' + position + 'deg)';
        let rotateY = 'rotateY(' + position + 'deg)';
        cube.style.transform = rotateX + ' ' + rotateY;
        requestAnimationFrame(animateCube);
    }
    requestAnimationFrame(animateCube);

    function startWorkers() {
        const nWorkers = 31;

        for (let i = 0; i < nWorkers; i++) {
            let w = new Worker('worker.js');
            w.onmessage = event => {
                console.log('[main.js] received: ', event.data);
            };
            workers.push(w);
            w.postMessage(i);
        }
    }
};
