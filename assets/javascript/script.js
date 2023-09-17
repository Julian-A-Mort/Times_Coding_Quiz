//d efine elements to manipulate //
var timerEl = document.getElementById('timer');
var startEl = document.getElementById('startQuizButton');
var optionsList = document.getElementById('options');
var resultText = document.getElementById('result');

// define variables //
var currentQuestion = 0;
var timeInterval;
var questions;
var timerLeft;
var yourScore = 0;

timerEl.textContent = "Click the Start Quiz button to begin!";

// Set Countdown Timer //
function startCountdown() {
    timeLeft = 30;
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
    currentQuestion = 0; 
    displayQuestion();
    startEl.style.display = "none";
    document.getElementById('question').style.display = "block";
    document.getElementById('options').style.display = "block";
    resultText.textContent = "";
});

// Quiz functionality //
document.getElementById('options').addEventListener("click", function (event) {
        if (event.target.tagName === 'INPUT') {
        var selectedValue = event.target.value;
        var correctAnswer = questions[currentQuestion].correctAnswer;

        if (selectedValue === correctAnswer) {
            document.getElementById('result').style.display = "block";
            resultText.textContent = "Correct!";
            resultText.style.color = "green";
            yourScore++;

            setTimeout(function () {
                resultText.textContent = "";
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayQuestion();
                } else {
                    resultText.textContent = "QUIZ OVER!";
                    showModal(yourScore);
                }
            }, 1000); 

        } else {
            document.getElementById('result').style.display = "block";
            resultText.textContent = "Wrong!";
            resultText.style.color = "red";
            timeLeft -= 5;

            if (timeLeft <= 0) {
                timerEl.textContent = "Times up!";
                clearInterval(timeInterval);
            } else {
                timerEl.textContent = timeLeft + " seconds left!";
            }
        }
    }
});


// Quiz Questions and answers as an array //
questions = [
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
        question: "What is 'else if' used to specify?",
        options: ["a new condition to test, if the first condition is false", "an offer that you can't refuse", "an inability to choose between two pizza toppings"],
        correctAnswer: "a"
    },
]

// question functionaility //
function displayQuestion() {
    var questionData = questions[currentQuestion];
    document.getElementById('question').innerHTML = "Question " + (currentQuestion +1) + ": " + questionData.question;
    var optionsHtml = '';

    questionData.options.forEach(function (option, index) {
        optionsHtml += '<label><input type="radio" name="q' + currentQuestion + '" value="' + String.fromCharCode(97 + index) + '"> ' + option + '</label>';
    });

    document.getElementById('options').innerHTML = optionsHtml;
}

// Save Score Modal Function //
function showModal(score) {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';

    // style and function the close element, add the "x" button
    // Add text and display the score
    // Create input field for initials and placeholder text
    // save the score function

    var modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
      <span class="close" onclick="closeModal()">&times;</span>
      <h2>Save Your Score</h2>
      <p>Your score: ${score}</p>
      <p>Enter your initials:</p>
      <input type="text" id="initials" placeholder="Your Initials Here!">
      <button id="saveScore" onclick="saveScore()">Save</button>
    `;
  }
  
  function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  
  function saveScore() {
    var initialsInput = document.getElementById('initials');
    var initials = initialsInput.value;
    var score = yourScore;
  
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ initials: initials, score: score });
    localStorage.setItem('scores', JSON.stringify(scores));
    initialsInput.value = '';

    closeModal();
  }
  
// Modal Function for High Scores //
function savedScores() {
    var modal = document.getElementById('savedScores');
    modal.style.display = 'block';

    var savedScoreList = document.getElementById('savedScoresList');
    savedScoresList.innerHTML = '';

    var scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.forEach(function (score) {
        var listItem = document.createElement('li');
        listItem.textContent = score.initials + ': ' + score.score;
        savedScoresList.appendChild(listItem);
      });
    }
  
  function closeScoresModal() {
    var modal = document.getElementById('savedScores');
    modal.style.display = 'none';
  }