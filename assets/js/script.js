//10 question with answers
var questions = [
  {
    title: "HTML stands for __________",
    choices: ["HyperText Markup Language", "HyperText Machine Language", "HyperText Marking Language", "HighText Marking Language"],
    answer: "HyperText Markup Language"
  },
  {
    title: "In which part of the HTML metadata is contained?",
    choices: [
      "head tag",
      "title tag",
      "html tag",
      "body tag"
    ],
    answer: "head tag"
  },
  {
    title: "The full form of CSS is",
    choices: ["Cascade style sheets", "Color and style sheets", "Cascading style sheets", "None of the above"],
    answer: "Cascading style sheets"
  },
  {
    title: "The CSS property used to make the text bold is:",
    choices: [
      "font-weight : bold",
      "weight: bold",
      "font: bold",
      "style: bold"
    ],
    answer: "font-weight : bold"
  },
  {
    title:
      "Which one of these is not among the three different types of errors in JavaScript?",
    choices: [
      "Animation time errors",
      "Load time errors",
      "Run time errors",
      "Logical Errors"
    ],
    answer: "Animation time errors"
  },
  {
    title: "What is the data type of variables in JavaScript?",
    choices: [
      "Object data types",
      "Function data type",
      "None of the above",
      "All of the above"
    ],
    answer: "Object data types"
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
  },
];


//Query selector to select html elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

//Questions time
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// sound for correct and incorrect options
const audioCorrect = new Audio("./assets/sfx/correct.wav");
const audioIncorrect = new Audio("./assets/sfx/incorrect.wav");

function startQuiz() {
  
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  
  questionsEl.removeAttribute("class");

 
  timerId = setInterval(clockTick, 1000);

 
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
 
  var currentQuestion = questions[currentQuestionIndex];

 
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

 
  choicesEl.innerHTML = "";


  currentQuestion.choices.forEach(function(choice, i) {
    
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

   
    choiceNode.onclick = questionClick;

    
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
 
  if (this.value !== questions[currentQuestionIndex].answer) {
    
    time -= 10;

    if (time < 0) {
      time = 0;
    }

  
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "200%";

   
    audioIncorrect.play();
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "200%";

   
    audioCorrect.play();
  }

 
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  
  currentQuestionIndex++;

  
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
 
  clearInterval(timerId);

 
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

 
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
 
  time--;
  timerEl.textContent = time;

  
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
 
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

   
    var newScore = {
      score: time,
      initials: initials
    };

    
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
 
  if (event.key === "Enter") {
    saveHighscore();
  }
}


submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
