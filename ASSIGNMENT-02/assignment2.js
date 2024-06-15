let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.querySelector('.display');
const lapsContainer = document.querySelector('.laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (!running) {
        start();
    } else {
        stop();
    }
}

function start() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 10);
    running = true;
    startStopBtn.textContent = 'Stop';
    startStopBtn.style.backgroundColor = '#dc3545';
}

function stop() {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    startTime = null;
    updatedTime = null;
    difference = null;
    display.textContent = '00:00:00.00';
    lapsContainer.innerHTML = '';
    lapCounter = 0;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, size = 2) {
    let s = '000' + number;
    return s.substr(s.length - size);
}
