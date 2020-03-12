// list of all questions, choices, and answers
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

// quiz variables
var questionIndex = 0;
var time = questions.length * 15;
var timerId;

//var dom elements
var timerEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var chociesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");
var nameEl = document.getElementById("name");
var rightWrong = document.getElementById("correct-incorrect");


function startQuiz() {
    // start quiz and hide start screen
    var beginQuizEl = document.getElementById("beginQuiz");
    beginQuizEl.setAttribute("class", "d-none");
    // show questions section 
    questionsEl.removeAttribute("class");

    // start time
    timerId = setInterval(clockTick, 1000);

    //show start time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion () {
    // get current question
    var currentQuestion = questions[questionIndex];

    // update question
    var questionSection = document.getElementById("question-section");
    questionSection.textContent = currentQuestion.title;

    // clear old question / choice
    chociesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
        // create new button for each choice
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice btn btn-dark");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;

        // on click event to each choice
        choiceBtn.onclick = questionClick;

        // display on page
        chociesEl.appendChild(choiceBtn);
    });
}

function questionClick() {
    // check if wrong answer
    if (this.value !== questions[questionIndex].answer) {
        time -= 15;
        // penalize time
        if (time < 0) {
            time = 0;
        }

        // display new time
        timerEl.textContent = time;

        rightWrong.textContent = "Wrong!";
    } else {
        rightWrong.textContent = "Correct!";    
    }


    // flash right/wrong 
    rightWrong.setAttribute("class", "correct-incorrect text-center ");
    setTimeout(function() {
        rightWrong.setAttribute("class", "correct-incorrect d-none");
    }, 1000);

    // next question
    questionIndex++;

    // check if we've run out of questions
    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}


function endQuiz() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var finishEl = document.getElementById("finish-screen");
    finishEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "d-none");
}

function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }

function saveHighscore() {
    // get value of input box

    var name = nameEl.value.trim();

    // check if value isnt empty
    if (name !== "") {
        // get scores from localstorage or set to empty array if no scores
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // create new user score
        var newScore = {
            score: time,
            name: name
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // go to highscores page
        window.location.href = "highscores.html";
    }
}


function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  // user clicks button to submit name
  submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  
  nameEl.onkeyup = checkForEnter;


  
