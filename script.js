
var playBtn = document.getElementById("play_btn"),
	pauseBtn = document.getElementById("pause_btn"),
	resetBtn = document.getElementById("reset_btn"),
	inputContainer = document.getElementById("main-input-timer"),
	hrsInput,
	minInput,
	secInput;

resetBtn.style.display = 'none';
pauseBtn.style.display = 'none';


let hoursElem = document.getElementById("hrs"),
	minutesElem = document.getElementById("min"),
	secondsElem = document.getElementById("sec"),
	timerInterval,
	countdownDate;

function zeroFormat(time) {
	return time < 10 ? `0${time}` : `${time}`;
}

function saveTimerState() {
    localStorage.setItem('countdownEndTime', countdownDate);
}

function loadTimerState() {
    const endTime = localStorage.getItem('countdownEndTime');
    if (endTime) {
        countdownDate = parseInt(endTime);
        startCountdown();
    }
}

function startCountdown() {
	const now = new Date().getTime(),
		difference = Math.ceil((countdownDate - now) / 1000);

	if (difference <= 0) { 
		pauseCountdown();
		inputContainer.style.display = 'block';
		resetBtn.style.display = 'none';
		playBtn.style.display = 'inline';
	}

	let hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
		minutes = Math.floor((difference % (60 * 60)) / 60),
		seconds = Math.floor(difference % 60);

	hoursElem.innerHTML = zeroFormat(hours);
	minutesElem.innerHTML = zeroFormat(minutes);
	secondsElem.innerHTML = zeroFormat(seconds);
	saveTimerState();
}

function pauseCountdown() {
	clearInterval(timerInterval)
}

playBtn.addEventListener("click", () => {
	hrsInput = Math.floor((document.querySelector("#input-hrs").value * 60) * 60); 
	minInput = Math.floor(document.querySelector("#input-min").value * 60);
	secInput = Math.floor(document.querySelector("#input-sec").value);

	if (hrsInput <= 0 && minInput <= 0 && secInput <= 0) { 
		pauseCountdown() 

	} else {
		inputContainer.style.display = 'none';
		resetBtn.style.display = 'inline';
		playBtn.style.display = 'none';
		countdownDate = new Date().setSeconds(new Date().getSeconds() + hrsInput + minInput + secInput);
		startCountdown();
		timerInterval = setInterval(startCountdown, 1000);
	}
})

pauseBtn.addEventListener("click", () => {
	playBtn.style.display = 'inline';
	pauseCountdown();
})

resetBtn.addEventListener("click", () => {
	inputContainer.style.display = 'block';
	playBtn.style.display = 'inline';
	resetBtn.style.display = 'none';
	pauseCountdown();
	hoursElem.innerHTML = zeroFormat(0);
	minutesElem.innerHTML = zeroFormat(0);
	secondsElem.innerHTML = zeroFormat(0);
})

loadTimerState();