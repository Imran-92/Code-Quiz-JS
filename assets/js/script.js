//Added questions array - 10 question with answers
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
      "Which type of JavaScript language is ___",
    choices: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level"
    ],
    answer: "Object-Based"
  },
  {
    title: "Which one of the following also known as Conditional Expression:",
    choices: [
      "Alternative to if-else",
      "Switch statement",
      "If-then-else statement",
      "immediate if"
    ],
    answer: "immediate if"
  },
  {
    title: "The function and var are known as",
    choices: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
    answer: "Declaration statements"
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
      "In the JavaScript, which one of the following is not considered as an error:",
    choices: ["Syntax error", "Missing of semicolons", "Division by zero", "Missing of Bracket"],
    answer: "Division by zero"
  },
  {
    title:
      "Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters?",
    choices: ["slice()", "split()", "substr()", "search()"],
    answer: "substr()"
  },
];


//Web API DOM selector to slect id of html tags
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

//Time set up for each question
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// sound effect for correct and incorrect options
const soundCorrect = new Audio("./assets/sfx/correct.wav");
const soundIncorrect = new Audio("./assets/sfx/incorrect.wav");

//Created function to hide start screen and show question and start the timer
function startQuiz() {
  
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  
  questionsEl.removeAttribute("class");

 
  timerId = setInterval(clockTick, 1000);

 
  timerEl.textContent = time;

  getQuestion();
}


/*function to show current question and show new question once answer is submitted
for the question*/

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

/* If statements to check if use chose right or wrong option and 
if wrong option is selected deduct 10 seconds from timer and generate sound effect 
and view new time counter*/

function questionClick() {
 
  if (this.value !== questions[currentQuestionIndex].answer) {
    
    time -= 10;

    if (time < 0) {
      time = 0;
    }

  
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "100%";

   
    soundIncorrect.play();
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "100%";

   
    soundCorrect.play();
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

/* function to stop the timer and show score and disply text input 
for user to add their name*/

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

//function to save scores 

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
