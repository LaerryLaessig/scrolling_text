const canvas = document.getElementById('textCanvas');
const ctx = canvas.getContext('2d');

let textLines = [];
let positionY = canvas.height;
let speed = 1.0;
let animationId;
let isPaused = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    for (let i = 0; i < textLines.length; i++) {
        ctx.fillText(textLines[i], 10, positionY + i * 30);
    }

    if (!isPaused) {
        positionY -= speed;
    }

    if (positionY < -30 * textLines.length) {
        positionY = canvas.height;
    }

    animationId = requestAnimationFrame(draw);
}

const speedSlider = document.getElementById('speedSlider');
speedSlider.addEventListener('input', () => {
    speed = parseFloat(speedSlider.value) / 20 * 1.9 + 0.1;
});

const playButton = document.getElementById('playButton');
playButton.addEventListener('click', () => {
    textLines = document.getElementById('textInput').value.split('\n');
    positionY = canvas.height;
    cancelAnimationFrame(animationId);
    isPaused = false;
    draw();
    playButton.disabled = true

    pauseButton.disabled = false;
    stopButton.disabled = false;
});

const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.innerHTML = isPaused ? '<i class="fas fa-play"></i> Resume' : '<i class="fas fa-pause"></i> Pause';
});

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    isPaused = false;
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
});