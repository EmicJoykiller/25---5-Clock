let breakLength = 5;
let sessionLength = 25;
let timerRunning = false;
let isSession = true;
let timeLeft = sessionLength * 60;
let timerInterval;
const beep = document.getElementById('beep');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('time-left').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
  } else {
    timerInterval = setInterval(function() {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        beep.play();
        if (isSession) {
          isSession = false;
          document.getElementById('timer-label').textContent = "Break";
          timeLeft = breakLength * 60;
        } else {
          isSession = true;
          document.getElementById('timer-label').textContent = "Session";
          timeLeft = sessionLength * 60;
        }
      }
    }, 1000);
  }
  timerRunning = !timerRunning;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  isSession = true;
  breakLength = 5;
  sessionLength = 25;
  timeLeft = sessionLength * 60;
  document.getElementById('break-length').textContent = breakLength;
  document.getElementById('session-length').textContent = sessionLength;
  document.getElementById('time-left').textContent = "25:00";
  document.getElementById('timer-label').textContent = "Session";
  beep.pause();
  beep.currentTime = 0;
}

document.getElementById('start_stop').addEventListener('click', startStopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

document.getElementById('break-increment').addEventListener('click', function() {
  if (breakLength < 60) {
    breakLength++;
    document.getElementById('break-length').textContent = breakLength;
  }
});

document.getElementById('break-decrement').addEventListener('click', function() {
  if (breakLength > 1) {
    breakLength--;
    document.getElementById('break-length').textContent = breakLength;
  }
});

document.getElementById('session-increment').addEventListener('click', function() {
  if (sessionLength < 60) {
    sessionLength++;
    document.getElementById('session-length').textContent = sessionLength;
    if (isSession) {
      timeLeft = sessionLength * 60;
      updateDisplay();
    }
  }
});

document.getElementById('session-decrement').addEventListener('click', function() {
  if (sessionLength > 1) {
    sessionLength--;
    document.getElementById('session-length').textContent = sessionLength;
    if (isSession) {
      timeLeft = sessionLength * 60;
      updateDisplay();
    }
  }
});
