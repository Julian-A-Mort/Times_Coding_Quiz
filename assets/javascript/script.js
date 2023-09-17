var timerEl = document.getElementById('timer');
var startEl = document.getElementById('startQuizButton');

var currentQuestion = 1
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

// Start the timer and the quiz //
startEl.addEventListener("click", function(event) {
    event.preventDefault();
    clearInterval(timeInterval);
    startCountdown();
    displayQuestion();
    startEl.style.display = "none";
    document.getElementById('question').style.display = "block";
    document.getElementById('options').style.display = "block";
});

// Quiz Questions and answers as an array //
var questions = [
    {
        question: "What is a variable?",
        options: ["someone who is very able at coding", "containers for storing data", "one of many things that could go wrong"],
        correctAnswer: "b"
    },
    {
        question: "What is a string?",
        options: ["a line of commands that must be followed", "your cats best friend", "for the storing and manipulating of text"],
        correctAnswer: "c"
    },
    {
        question: "What does 'else if' used to specify?",
        options: ["a new condition to test, if the first condition is false", "an offer that you can't refuse", "an inability to choose between two pizza toppings"],
        correctAnswer: "a"
    },
]

function displayQuestion() {
    var questionData = questions[currentQuestion - 1];
    document.getElementById('question').innerHTML = "Question " + currentQuestion + ": " + questionData.question;
    var optionsHtml = '';

    questionData.options.forEach(function (option, index) {
        optionsHtml += '<label><input type="radio" name="q' + currentQuestion + '" value="' + String.fromCharCode(97 + index) + '"> ' + option + '</label>';
    });

    document.getElementById('options').innerHTML = optionsHtml;
}