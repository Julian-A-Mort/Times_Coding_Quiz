var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');


// Set Countdown Timer //
function countdown() {
    var timeLeft = 30;
    var timeInterval = setInterval(function () {
        if (timeLeft >= 1) {
          timerEl.textContent = timeLeft + " seconds left! QUICKER!";
          timeLeft--
        } else {
          timerEl.textContent = "Times up!";
          clearInterval(timeInterval);
        }
        
        }, 1000);
      }

      countdown();