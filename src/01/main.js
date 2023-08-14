window.onload = function () {
    let cube = document.getElementById('box-container');
    let btn = document.getElementById('btn');
    btn.addEventListener(
        'click',
        function () {
            block(5);
        },
        false,
    );

    let position = 0;

    function animateCube() {
        position += 0.2;
        let rotateX = 'rotateX(' + position + 'deg)';
        let rotateY = 'rotateY(' + position + 'deg)';
        cube.style.transform = rotateX + ' ' + rotateY;
        requestAnimationFrame(animateCube);
    }

    function block(n) {
        console.log('[main.js] block for ', n, ' seconds');
        const start = new Date().getTime();
        while (new Date().getTime() - start < n * 1000) {}
        console.log('[main.js] done ');
    }

    requestAnimationFrame(animateCube);
};
