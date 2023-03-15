// Check how to implement this function:
// function changeValue(targetText, operation, targetValue) {
//     if (operation == 'decrement' && targetValue > 0) {
//         targetValue--;
//         targetText.innerText = `${targetValue}`;
//     } else if (operation == 'increment' && targetValue < 60) {
//         targetValue++;
//         targetText.innerText = `${targetValue}`;
//         console.log(targetValue)
//     }
// }

// incrementSession.addEventListener('click', () => changeValue(sessionLength, 'increment', sessionValue))

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
// const minutesDisplay = document.getElementById('minutes');
// const secondsDisplay = document.getElementById('seconds');

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

function runTimer() {
    let timer = sessionValue * 60;
    setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerDisplay.textContent = `${minutes} : ${seconds}`;
        timer --;
        if (timer < 0 && isBreak == false) {
            timer = breakValue * 60;
            timerLabel.innerText = 'BREAK';
            isBreak = !isBreak;
        } else if (timer < 0 && isBreak == true) {
            timer = sessionValue * 60;
            timerLabel.innerText = 'SESSION';
            isBreak = !isBreak;
        }
    }, 1000);
}

let isBreak = false;
let isTimerRunning = false;

startStop.addEventListener('click', () => {
    if (isTimerRunning == false) {
        isTimerRunning = !isTimerRunning;
        runTimer();
        startStop.innerText = 'STOP';
        
    } else if (isTimerRunning == true) {
        startStop.innerText = 'START';
    }
})
