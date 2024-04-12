//some variables to get the buttons, and the time the user wants to set.
var playBtn = document.getElementById("play_btn"),
	pauseBtn = document.getElementById("pause_btn"),
	resetBtn = document.getElementById("reset_btn"),
	inputContainer = document.getElementById("main-input-timer"),
	hrsInput,
	minInput,
	secInput;

//resetting some buttons that are not vital at the initial load of the timer.
resetBtn.style.display = 'none';
pauseBtn.style.display = 'none';


//some variables to get the hrs, min and sec to be displayed and some others for the timer functionality.
let hoursElem = document.getElementById("hrs"),
	minutesElem = document.getElementById("min"),
	secondsElem = document.getElementById("sec"),
	timerInterval,
	countdownDate;

//this function adds a "0" from 0-9 in order to maintain the two digit display.
function zeroFormat(time) {
	return time < 10 ? `0${time}` : `${time}`;
}

//this function saves the future time in which the timer will end in the local storage. 
function saveTimerState() {
    localStorage.setItem('countdownEndTime', countdownDate);
}

//this function loads the last state of the timer before it was close and continue working as usual.
function loadTimerState() {
    const endTime = localStorage.getItem('countdownEndTime');
    if (endTime) {
        countdownDate = parseInt(endTime);
		inputContainer.style.display = 'none';
		resetBtn.style.display = 'inline';
		playBtn.style.display = 'none';
        if (countdownDate > new Date().getTime()) {
            startCountdown();
            timerInterval = setInterval(startCountdown, 1000);
        } else {
			inputContainer.style.display = 'block';
			resetBtn.style.display = 'none';
			playBtn.style.display = 'inline';
            pauseCountdown();
        }
    }
}

//this function starts the timer and update it constantly in the display container.
function startCountdown() {
	const now = new Date().getTime(),
		difference = Math.ceil((countdownDate - now) / 1000);

	if (difference <= 0) {
        pauseCountdown();
        inputContainer.style.display = 'block';
        resetBtn.style.display = 'none';
        playBtn.style.display = 'inline';
		return notify();
	}

	let hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
		minutes = Math.floor((difference % (60 * 60)) / 60),
		seconds = Math.floor(difference % 60);

	hoursElem.innerHTML = zeroFormat(hours);
	minutesElem.innerHTML = zeroFormat(minutes);
	secondsElem.innerHTML = zeroFormat(seconds);
	saveTimerState();
}

//this function pauses the timer and reset it to 0.
function pauseCountdown() {
	clearInterval(timerInterval)
	hoursElem.innerHTML = zeroFormat(0);
	minutesElem.innerHTML = zeroFormat(0);
	secondsElem.innerHTML = zeroFormat(0);
}

//this event is the one that starts the timer after the user hits the "play" button, also has the logic to get the total time in seconds.
playBtn.addEventListener("click", () => {
	hrsInput = Math.floor((document.querySelector("#input-hrs").value * 60) * 60); 
	minInput = Math.floor(document.querySelector("#input-min").value * 60);
	secInput = Math.floor(document.querySelector("#input-sec").value);

	if (hrsInput <= 0 && minInput <= 0 && secInput <= 0) { 
		pauseCountdown();
	} else {
		inputContainer.style.display = 'none';
		resetBtn.style.display = 'inline';
		playBtn.style.display = 'none';
		countdownDate = new Date().setSeconds(new Date().getSeconds() + hrsInput + minInput + secInput);
		startCountdown();
		timerInterval = setInterval(startCountdown, 1000);
	}
})

//this event pauses the timer enablig the resume button to continue wit the timer.
pauseBtn.addEventListener("click", () => {
	playBtn.style.display = 'inline';
	pauseCountdown();
})

//this event enable the reset button in order to cancel any state of the timer and leave it as default.
resetBtn.addEventListener("click", () => {
	inputContainer.style.display = 'block';
	playBtn.style.display = 'inline';
	resetBtn.style.display = 'none';
	pauseCountdown();
})

//calling the loadTimerState function in order to continue the remaining time if there's any.
loadTimerState();