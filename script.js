const canvas = document.getElementById('textCanvas');
const ctx = canvas.getContext('2d');

let textLines = [];
let positionY = canvas.height;
let speed = 1.0;
let animationId;
let isPaused = false;
let color = 'black';
var mode = localStorage.getItem("mode");

if (mode === "dark") {
    set_dark_mode();
  } else {
    set_light_mode();
  }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '20px Arial';
    ctx.fillStyle = color;
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
const clearButton = document.getElementById('clearButton');
const pauseButton = document.getElementById('pauseButton');
const stopButton = document.getElementById('stopButton');

playButton.addEventListener('click', () => {
    textLines = document.getElementById('textInput').value.split('\n');
    positionY = canvas.height;
    cancelAnimationFrame(animationId);
    isPaused = false;
    draw();
    playButton.disabled = true
    clearButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
    
});

clearButton.addEventListener('click', () => {
    textLines = document.getElementById('textInput').value = '';
});



pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.innerHTML = isPaused ? '<i class="fas fa-play"></i> Resume' : '<i class="fas fa-pause"></i> Pause';
});


stopButton.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    isPaused = false;
    playButton.disabled = false;
    clearButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    
});

const darkModeButton = document.getElementById("darkModeButton");
const lightModeButton = document.getElementById("lightModeButton");

function set_dark_mode() {
    document.body.classList.add("dark-mode");
    document.getElementById("textInput").classList.add("dark-mode");
    document.getElementById("textCanvas").classList.add("dark-mode");
    color = 'white';
    localStorage.setItem("mode", "dark");
}

function set_light_mode() {
    document.body.classList.remove("dark-mode");
    document.getElementById("textInput").classList.remove("dark-mode");
    document.getElementById("textCanvas").classList.remove("dark-mode");
    color = 'black';
    localStorage.setItem("mode", "light");
}

darkModeButton.addEventListener("click", () => {
    set_dark_mode();
});

lightModeButton.addEventListener("click", () => {
    set_light_mode();
});

