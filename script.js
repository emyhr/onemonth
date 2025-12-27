const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let snowflakes = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height; // Start above screen
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }
}

function initSnow() {
    snowflakes = [];
    const snowflakeCount = Math.floor(width / 5); // Responsive count
    for (let i = 0; i < snowflakeCount; i++) {
        const flake = new Snowflake();
        // Scatter initially so they don't all start at top
        flake.y = Math.random() * -height;
        snowflakes.push(flake);
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    snowflakes.forEach(flake => {
        flake.update();
        flake.draw();
    });

    requestAnimationFrame(animate);
}

setTimeout(() => {
    isSnowing = true;
    initSnow();
}, 3000);
animate();
