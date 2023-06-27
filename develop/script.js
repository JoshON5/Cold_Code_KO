let timeEl = document.querySelector("#timer");
let seconds = 75;
let intro = document.querySelector(".intro");
let quiz = document.querySelector(".quiz");
let questions = document.querySelector(".questions");
let questionCount = 0;
let finalScreen = document.querySelector(".quiz-final-screen");
let userInitialsEl = document.querySelector(".initials");
let rankScreen = document.querySelector(".final-rank");
let rank = document.querySelector(".highscores");
let answerCheck = document.querySelector("#validation");
let score = document.querySelector("#score");
let leaderBoard = document.querySelector(".board");


const leaders = document.querySelector("#view-board");
const quizBtn = document.querySelector("#start");
const choices = document.querySelectorAll(".choices");
const btn0 = document.querySelector("#answer-0");
const btn1 = document.querySelector("#answer-1");
const btn2 = document.querySelector("#answer-2");
const btn3 = document.querySelector("#answer-3");
const subBtn = document.querySelector("#submit");
const playAgain = document.querySelector("#play-again");
const clearScores = document.querySelector("#erase-leaders");

const codeQuest = [
  {
    question: "Which one of these is NOT a data type present in JavaScript?",
    answers: ["A. Booleans", "B. Numbers", "C. Null", "D. Queries"],
    correctAnswer: "3",
  },
  {
    question: "When creating an array with objects, the code is enclosed in?",
    answers: [
      "A. Curly Brackets",
      "B. Brackets",
      "C. Quotes",
      "D. Parentheses",
    ],
    correctAnswer: "1",
  },
  {
    question:
      "To link your JavaScript external file to your HTML, you put it where? ",
    answers: ["A. Head", "B. Div", "C. End of Body", "D. Start of Body"],
    correctAnswer: "2",
  },
  {
    question:
      "In Chrome Dev Tools, where can you log variables, functions, typeof etc.?",
    answers: ["A. Console", "B. Elements", "C. VSCode", "D. YouTube"],
    correctAnswer: "0",
  },
  {
    question: "The (++) operator increases in increments of?",
    answers: ["A. 1", "B. 5", "C. 3", "D. 4"],
    correctAnswer: "0",
  },
];

function countdown() {
  let timeInterval = setInterval(function () {
    seconds--;
    timeEl.textContent = seconds + "s";

    if (seconds === 0 || questionCount === codeQuest.length) {
      clearInterval(timeInterval);
      quiz.style.display = "none";
      finalScreen.style.display = "block";
      score.textContent = seconds;
      localStorage.setItem("score", seconds);
    }
  }, 1000);
}

function playQuiz() {
  intro.style.display = "none";
  quiz.style.display = "inline";
  questionCount = 0;

  countdown();
  setQuestion(questionCount);
}

function setQuestion(id) {
  if (id < codeQuest.length) {
    questions.textContent = codeQuest[id].question;
    btn0.textContent = codeQuest[id].answers[0];
    btn1.textContent = codeQuest[id].answers[1];
    btn2.textContent = codeQuest[id].answers[2];
    btn3.textContent = codeQuest[id].answers[3];
  }
}

function displayMessage(m) {
  let checkMsg = document.createElement("hr");
  let checkEl = document.createElement("div");
  checkEl.textContent = m;
  document.querySelector(".card").appendChild(checkMsg);
  document.querySelector(".card").appendChild(checkEl);
  setTimeout(function () {
    checkMsg.remove();
    checkEl.remove();
  }, 1000);
}

function checkAnswer(event) {
  event.preventDefault();

  setTimeout(function () {}, 1000);
  if (codeQuest[questionCount].correctAnswer === event.target.value) {
    displayMessage("Right Jab!");
  } else {
    seconds = seconds - 10;
    displayMessage("BOO! Get back up . . .");
  }
  if (questionCount < codeQuest.length) {
    questionCount++;
  }
  setQuestion(questionCount);
}
console.log(leaderBoard);
function renderLeaderboard() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  for (var i = 0;i < highscores.length; i++) {
    var leaderList = document.createElement("li");
    leaderList.textContent = highscores[i].userInitials + " - " + highscores[i].userScore;

    leaderBoard.appendChild(leaderList);
  }

  rankScreen.style.display = "block";
  finalScreen.style.display = "none";
}

subBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let initials = userInitialsEl.value.trim();
    if (initials !== "") {
      var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

      var newScore = {
        userScore: seconds,
        userInitials: initials,
      }; 
      highscores.push(newScore)
      localStorage.setItem("highscores", JSON.stringify(highscores))

      renderLeaderboard()
    };
    //userInitials.value = "";
});

quizBtn.addEventListener("click", playQuiz);

choices.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});
