document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const nextBtn = document.getElementById("next-btn");
  const quesContainer = document.getElementById("question-container");
  const quesTxt = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const rsltContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "Which country is known as the Land of the Rising Sun?",
      choices: ["China", "Japan", "South Korea", "Vietnam"],
      answer: "Japan",
    },
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Who was the first Asian winner of the Nobel Prize?",
      choices: [
        "Rabindranath Tagore",
        "C. V. Raman",
        "Kawabata Yasunari",
        "Tsung-Dao Lee",
      ],
      answer: "Rabindranath Tagore",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];
  let currentQuesIndex = 0;
  let score = 0;
  let lastSelectedChoice = null;
  let lastSelectedLi = null;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", showNextQuestion);

  restartBtn.addEventListener("click", restartQuiz);

  function startQuiz() {
    quesContainer.classList.remove("hidden");
    startBtn.classList.add("hidden");

    showQuestion();
  }
  function restartQuiz() {
    score = 0;
    currentQuesIndex = 0;
    rsltContainer.classList.add("hidden");
    startQuiz();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    choicesList.innerHTML = ""; //clear prev choices
    lastSelectedChoice = null;
    lastSelectedLi = null;
    quesTxt.textContent = questions[currentQuesIndex].question;
    questions[currentQuesIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice; 
      li.addEventListener("click", () => {
        console.log(lastSelectedChoice, lastSelectedLi);
        if (lastSelectedLi) lastSelectedLi.classList.remove("selected");
        li.classList.add("selected"); //current li selected
        lastSelectedLi = li;
        lastSelectedChoice = choice;
        nextBtn.classList.remove("hidden");
      });
      choicesList.appendChild(li);
    });
  }
  function showNextQuestion() {
    console.log("show", lastSelectedChoice, lastSelectedLi);
    if (lastSelectedChoice === questions[currentQuesIndex].answer) score++;
    currentQuesIndex++;
    setTimeout(() => {
      if (currentQuesIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 300);
  }

  function showResult() {
    quesContainer.classList.add("hidden");
    rsltContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
