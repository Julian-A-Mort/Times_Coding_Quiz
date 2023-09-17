var timerEl = document.getElementById('timer');
var startEl = document.getElementById('startQuizButton');

var timeInterval

timerEl.textContent = "Click the Start Quiz button to begin!";

// Set Countdown Timer //
function startCountdown() {
    var timeLeft = 30;
    timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
          timerEl.textContent = timeLeft + " seconds left! QUICKER!";
          timeLeft--
        } else {
          timerEl.textContent = "Times up!";
          clearInterval(timeInterval);
        }
        
        }, 1000);
      }

// Start the timer //
startEl.addEventListener("click", function(event) {
    event.preventDefault();
    clearInterval(timeInterval);
    startCountdown();
});