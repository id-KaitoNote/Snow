"use strict";

window.onload = function () {


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //generate the snowflakes and apply attributes
    const mf = 100; //max flakes
    const flakes = [];

    //loop through the empty flakes and apply attributes
    for (let i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 5 + 2, //min of 2px and max of 7px
            d: Math.random() + 1, //density of the flake
        })
    }

    //draw flakes onto canvas
    function drawFlakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#DFEBF2';
        ctx.beginPath();

        for (let i = 0; i < mf; i++) {

            const f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);

        }
        ctx.fill();
        moveFlakes();
    }

    //animate the flakes
    let angle = 0;

    function moveFlakes() {

        angle += 0.01;
        for (let i = 0; i < mf; i++) {

            //store current flake
            const f = flakes[i];

            //update X and Y coordinates of each snowflake
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;

            //if the snowflake reaches the bottom, send a nenw one to the top

            if (f.y > canvas.height) {
                flakes[i] = { x: Math.random() * canvas.width, y: 0, r: f.r, d: f.d };
            }


        }

    }

    setInterval(drawFlakes, 25);



}