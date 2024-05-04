//* Logic for the Timer

//some variables to get the buttons, and the time the user wants to set.
var playBtnTimer = document.getElementById("timer-play-btn"),
	pauseBtnTimer = document.getElementById("timer-pause-btn"),
	resetBtnTimer = document.getElementById("timer-reset-btn"),
	inputTimerContainer = document.getElementById("main-input-timer");

//resetting some buttons that are not vital at the initial load of the timer.
resetBtnTimer.style.display = 'none';
pauseBtnTimer.style.display = 'none';

//some variables to get the hrs, min and sec to be displayed and some others for the timer functionality.
let hrsOutputElem = document.getElementById("output-hrs"),
	minOutputElem = document.getElementById("output-min"),
	secOutputElem = document.getElementById("output-sec"),
	hrsInputElem = document.querySelector("#input-hrs"),
	minInputElem = document.querySelector("#input-min"),
	secInputElem = document.querySelector("#input-sec"),
	timerInterval,
	countdownDate;

function saveInputState() {
	localStorage.setItem('hrsInputLocalStoraged', zeroFormat(Math.floor(hrsInputElem.value)));
	localStorage.setItem('minInputLocalStoraged', zeroFormat(Math.floor(minInputElem.value)));
	localStorage.setItem('secInputLocalStoraged', zeroFormat(Math.floor     (secInputElem.value)));
}

function saveOutputState() {
	localStorage.setItem('hrsOutputLocalStoraged', hrsOutputElem.textContent);
	localStorage.setItem('minOutputLocalStoraged', minOutputElem.textContent);
	localStorage.setItem('secOutputLocalStoraged', secOutputElem.textContent);
}

//this function saves the future time in which the timer will end in the local storage. 
function saveTimerState() {
	localStorage.setItem('countdownEndTime', countdownDate);
}

//this function adds a "0" from 0-9 in order to maintain the two digit display.
function zeroFormat(time) {
	return time < 10 ? `0${time}` : `${time}`;
}

function deleteAllTimerState() {
	localStorage.setItem('hrsOutputLocalStoraged', zeroFormat(0));
	localStorage.setItem('minOutputLocalStoraged', zeroFormat(0));
	localStorage.setItem('secOutputLocalStoraged', zeroFormat(0));
	localStorage.setItem('hrsInputLocalStoraged', zeroFormat(0));
	localStorage.setItem('minInputLocalStoraged', zeroFormat(0));
	localStorage.setItem('secInputLocalStoraged', zeroFormat(0));

	hrsOutputElem.innerHTML = zeroFormat(0);
	minOutputElem.innerHTML = zeroFormat(0);
	secOutputElem.innerHTML = zeroFormat(0);
	hrsInputElem.value = 0;
	minInputElem.value = 0;
	secInputElem.value = 0;
}

//this function loads the last state of the timer before it was close and continue working as usual.
function loadTimerState() {
	const endTime = parseInt(localStorage.getItem("countdownEndTime"));;
	countdownDate = endTime;
	if (endTime) {
		if (countdownDate > new Date().getTime()) {
			inputTimerContainer.style.display = "none";
			resetBtnTimer.style.display = "inline";
			playBtnTimer.style.display = "none";
			pauseBtnTimer.style.display = "inline";
			hrsInputElem.value = localStorage.getItem('hrsInputLocalStoraged');
			minInputElem.value = localStorage.getItem('minInputLocalStoraged');
			secInputElem.value = localStorage.getItem('secInputLocalStoraged');
			startCountdown();
			timerInterval = setInterval(startCountdown, 1000);
		}
	} else {
		const checkPausehrs = parseInt(localStorage.getItem("hrsOutputLocalStoraged")), 
			checkPausemin = parseInt(localStorage.getItem("minOutputLocalStoraged")), 
			checkPausesec = parseInt(localStorage.getItem("secOutputLocalStoraged"));
		if (checkPausehrs === 0 && checkPausemin === 0 && checkPausesec === 0) {
			inputTimerContainer.style.display = 'block';
			playBtnTimer.style.display = 'inline';
			resetBtnTimer.style.display = 'none';
			pauseBtnTimer.style.display = 'none';
		} else {
			inputTimerContainer.style.display = "none";
			playBtnTimer.style.display = "inline";
			resetBtnTimer.style.display = "inline";
			hrsInputElem.value = localStorage.getItem('hrsInputLocalStoraged');
			minInputElem.value = localStorage.getItem('minInputLocalStoraged');
			secInputElem.value = localStorage.getItem('secInputLocalStoraged');
			hrsOutputElem.innerHTML = zeroFormat(checkPausehrs);
			minOutputElem.innerHTML = zeroFormat(checkPausemin);
			secOutputElem.innerHTML = zeroFormat(checkPausesec);
		}
	}
}

//this function starts the timer and update it constantly in the display container.
function startCountdown() {
	const now = new Date().getTime(),
		difference = Math.ceil((countdownDate - now) / 1000);

	if (difference <= 0) {
		inputTimerContainer.style.display = 'block';
		resetBtnTimer.style.display = 'none';
		playBtnTimer.style.display = 'inline';
		pauseBtnTimer.style.display = 'none';
		pauseCountdown();
		deleteAllTimerState();
		localStorage.removeItem('countdownEndTime');
		return notify();
	}

	let hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
		minutes = Math.floor((difference % (60 * 60)) / 60),
		seconds = Math.floor(difference % 60);

	hrsOutputElem.innerHTML = zeroFormat(hours);
	minOutputElem.innerHTML = zeroFormat(minutes);
	secOutputElem.innerHTML = zeroFormat(seconds);
	saveTimerState();
}

//this function pauses the timer and reset it to 0.
function pauseCountdown() {
	clearInterval(timerInterval);
}

//this event is the one that starts the timer after the user hits the "play" button, also has the logic to get the total time in seconds.
playBtnTimer.addEventListener("click", () => {
	saveInputState();
	var hrsInputLocal = (parseInt(localStorage.getItem('hrsInputLocalStoraged')) * 60) * 60;
		minInputLocal = parseInt(localStorage.getItem('minInputLocalStoraged')) * 60,
		secInputLocal =  parseInt(localStorage.getItem('secInputLocalStoraged')),
		hrsOutputLocal = (parseInt(localStorage.getItem('hrsOutputLocalStoraged')) * 60) * 60,
		minOutputLocal = parseInt(localStorage.getItem('minOutputLocalStoraged')) * 60,
		secOutputLocal = parseInt(localStorage.getItem('secOutputLocalStoraged'));

	if (hrsInputLocal <= 0 && minInputLocal <= 0 && secInputLocal <= 0) { 
		pauseCountdown();
	} else {
		if (hrsOutputLocal  > 0 || minOutputLocal  > 0 || secOutputLocal  > 0) {
			inputTimerContainer.style.display = 'none';
			resetBtnTimer.style.display = 'inline';
			pauseBtnTimer.style.display = 'inline';
			playBtnTimer.style.display = 'none';
			countdownDate = new Date().setSeconds(new Date().getSeconds() + hrsOutputLocal + minOutputLocal + secOutputLocal);
			startCountdown();
			timerInterval = setInterval(startCountdown, 1000);
		} else {
			inputTimerContainer.style.display = 'none';
			resetBtnTimer.style.display = 'inline';
			pauseBtnTimer.style.display = 'inline';
			playBtnTimer.style.display = 'none';
			countdownDate = new Date().setSeconds(new Date().getSeconds() + hrsInputLocal + minInputLocal + secInputLocal);
			startCountdown();
			timerInterval = setInterval(startCountdown, 1000);
		}
	}
})

//Envent to pause the timer enablig the resume button to continue wit the timer.
pauseBtnTimer.addEventListener("click", () => {
	playBtnTimer.style.display = 'inline';
	pauseBtnTimer.style.display = 'none';
	saveOutputState();
	localStorage.removeItem('countdownEndTime');
	pauseCountdown();
})

//Event to enable the reset button in order to cancel any state of the timer and leave it as default.
resetBtnTimer.addEventListener("click", () => {
	inputTimerContainer.style.display = 'block';
	playBtnTimer.style.display = 'inline';
	resetBtnTimer.style.display = 'none';
	pauseBtnTimer.style.display = 'none';
	deleteAllTimerState();
	pauseCountdown();
	localStorage.removeItem('countdownEndTime');
})

//Creating the Service Worker which handles some functionality even if the application is closed.
const registerSW = async () => {
	const registration = await navigator.serviceWorker.register('sw.js');
	return registration;
}
registerSW();

//calling the loadTimerState function in order to continue the remaining time if there's any.
loadTimerState();
