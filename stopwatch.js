//* Logic for the Stopwatch

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".stopwatch-display");
let int = null;
var playBtnStopwatch = document.getElementById("stopwatch-play-btn"),
	pauseBtnStopwatch = document.getElementById("stopwatch-pause-btn"),
	resetBtnStopwatch = document.getElementById("stopwatch-reset-btn");

//resetting some buttons that are not vital at the initial load of the timer.
resetBtnStopwatch.style.display = 'none';
pauseBtnStopwatch.style.display = 'none';

document.getElementById("stopwatch-play-btn").addEventListener("click", () => {
	if(int !== null) {
		clearInterval(int);
	}
	int = setInterval(displayTimer, 10);
	playBtnStopwatch.style.display = 'none';
	resetBtnStopwatch.style.display = 'inline';
	pauseBtnStopwatch.style.display = 'inline';
});

document.getElementById("stopwatch-pause-btn").addEventListener("click", () => {
	clearInterval(int);
	playBtnStopwatch.style.display = 'inline';
});

document.getElementById("stopwatch-reset-btn").addEventListener("click", () => {
		clearInterval(int);
		[milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
		timeRef.innerHTML = "00 : 00 : 00 : 000 ";
		playBtnStopwatch.style.display = 'inline';
		resetBtnStopwatch.style.display = 'none';
		pauseBtnStopwatch.style.display = 'none';
});

function displayTimer() {
	milliseconds += 10;
	if (milliseconds == 1000) {
		milliseconds = 0;
		seconds++;
		if (seconds == 60) {
			seconds = 0;
			minutes++;
			if (minutes == 60) {
				minutes = 0;
				hours++;
			}
		} 
	} 

	let h = hours < 10 ? "0" + hours : hours;
	let m = minutes < 10 ? "0" + hours : hours;
	let s = seconds < 10 ? "0" + seconds : seconds;
	let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

	timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}