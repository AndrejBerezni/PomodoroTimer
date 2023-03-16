const sessionLength = document.getElementById('session-length');
const breakLength = document.getElementById('break-length');
const incrementSession = document.getElementById('session-increment');
const decrementSession = document.getElementById('session-decrement');
const incrementBreak = document.getElementById('break-increment');
const decrementBreak = document.getElementById('break-decrement');
const timerDisplay = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');
const startStop = document.getElementById('start_stop');
const reset = document.getElementById('reset');
const beep = document.getElementById('beep');


// Initialize values:
let sessionValue = 25;
let breakValue = 5;

sessionLength.innerText = `${sessionValue}`;
breakLength.innerText = `${breakValue}`;
timerDisplay.innerText = `${sessionValue} : 00`

// Increment values:
incrementSession.addEventListener('click', () => {
    if (sessionValue < 60) {
        sessionValue++;
        sessionLength.innerText = `${sessionValue}`;
    }
});

decrementSession.addEventListener('click', () => {
    if (sessionValue > 1) {
        sessionValue--;
        sessionLength.innerText = `${sessionValue}`;
    }
});

incrementBreak.addEventListener('click', () => {
    if (breakValue < 60) {
        breakValue++;
        breakLength.innerText = `${breakValue}`;
    }
});

decrementBreak.addEventListener('click', () => {
    if (breakValue > 1) {
        breakValue--;
        breakLength.innerText = `${breakValue}`;
    }
});

// Reset session and break length to 25 and 5 on click:
sessionLength.addEventListener('click', () => {
    sessionValue = 25;
    sessionLength.innerText = `${sessionValue}`
});

breakLength.addEventListener('click', () => {
    breakValue = 5;
    breakLength.innerText = `${breakValue}`
});


//Timer:
let isBreak = false;
let isTimerRunning = false;
let remainingTime = 0;
let timerInterval = null;

function runTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerDisplay.textContent = `${minutes} : ${seconds}`;
        timer--;
        if (timer < 0 && isBreak === false) {
            timer = breakValue * 60;
            timerLabel.innerText = 'BREAK';
            isBreak = !isBreak;
            beep.currentTime = 0;
            beep.play();
        } else if (timer < 0 && isBreak === true) {
            timer = sessionValue * 60;
            timerLabel.innerText = 'SESSION';
            isBreak = !isBreak;
            beep.currentTime = 0;
            beep.play();
        }
    }, 1000);
}
startStop.addEventListener('click', () => {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        remainingTime = timer;
        timerInterval = null;
        startStop.innerText = 'START';
    } else {
        if (remainingTime > 0) {
            timer = remainingTime;
            remainingTime = 0;
        } else {
            timer = sessionValue * 60;
        }
        runTimer();
        startStop.innerText = 'STOP';
    }
});

//Reset button:

reset.addEventListener('click', () => {
    clearInterval(timerInterval);
    isBreak = false;
    isTimerRunning = false;
    remainingTime = 0;
    timerInterval = null;
    beep.currentTime = 0;
    startStop.innerText = 'START';
    timerLabel.innerText = 'SESSION';
    timerDisplay.textContent = `${sessionValue < 10 ? "0" + sessionValue : sessionValue} : 00`;
})