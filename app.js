// variables
const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const restartBtn = document.querySelector('.btn-restart');
const pauseBtn = document.querySelector('.btn-pause');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;
let isPaused = false;
let remainingSeconds;

// functions
const appTimer = () => {
    if (isPaused) {
        alert('The timer is paused. Please press pause again to resume or reset.');
        return;
    }

    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        remainingSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            // code 
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            remainingSeconds--;

            let minutesLeft = Math.floor(remainingSeconds/60);
            let secondsLeft = remainingSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
}

startBtn.addEventListener('click', appTimer);

const restartTimer = () => {
    if (!state) {
        clearInterval(myInterval);
        state = true;

        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');
        minuteDiv.textContent = '25';
        secondDiv.textContent = '00';
    } else {
        alert('Already reset')
    }
}

restartBtn.addEventListener('click', restartTimer);


const pauseTimer = () => {
    if (!state) {
        clearInterval(myInterval);
        state = true
        isPaused = true;
    } else {
        state = false; // set state t false to indicate timer is running
        isPaused = false;
        const updateSeconds = () => {
            // code 
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            remainingSeconds--;

            let minutesLeft = Math.floor(remainingSeconds/60);
            let secondsLeft = remainingSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
    }
}

pauseBtn.addEventListener('click', pauseTimer);
