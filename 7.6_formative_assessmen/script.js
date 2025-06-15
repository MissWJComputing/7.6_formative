const questions = [
  {
    question: "What block sets a variable to a value?",
    answers: ["set", "set variable", "set score to"],
    concept: "variables",
    image: "images/q1.png"
  },
  {
    question: "What block do you use to check a condition?",
    answers: ["if", "if then"],
    concept: "selection",
    image: "images/q2.png"
  },
  {
    question: "What is the name of a subprogram in Scratch?",
    answers: ["my block", "custom block", "my blocks"],
    concept: "subprograms",
    image: "images/q3.png"
  },
  {
    question: "Which loop repeats a set number of times?",
    answers: ["repeat", "repeat loop", "repeat 10", "count-controlled", "count controlled"],
    concept: "count-controlled",
    image: "images/q4.png"
  },
  {
    question: "Which loop repeats until a condition becomes true?",
    answers: ["repeat until", "repeat until touching","condition-controlled","condition controlled"],
    concept: "condition-controlled",
    image: "images/q5.png"
  },
  {
    question: "What does the sprite say if score = 5?",
    answers: ["win", "you win", "you win!"],
    concept: "selection",
    image: "images/q6.png"
  },
  {
    question: "Is HighScore snake case or camel case?",
    answers: ["camel", "camel case"],
    concept: "variables",
    image: "images/q7.png"
  },
  {
    question: "How many times will the block run?",
    answers: ["10","ten","ten times","10 times"],
    concept: "count-controlled",
    image: "images/q8.png"
  },
  {
    question: "When will this loop end?",
    answers: ["when it touches the enemy", "touching enemy", "touches enemy", "if it touches the enemy"],
    concept: "condition-controlled",
    image: "images/q9.png"
  },
  {
    question: "What colour are variable blocks?",
    answers: ["orange"],
    concept: "variables",
    image: "images/q10.png"
  }
];

const conceptWWW = {
  variables: "You understand how to use and name variables in Scratch.",
  selection: "You know how to use if and if-else to make decisions.",
  subprograms: "You can create and use custom blocks (My Blocks) effectively.",
  "count-controlled": "You understand how to use the repeat block to repeat actions.",
  "condition-controlled": "You know how to loop until a condition is met using repeat until or forever if.",
  syntax: "You understand how to build scripts with the correct blocks in the right order."
};

const conceptEBI = {
  variables: "Revisit how to create variables and use 'set' or 'change' blocks.",
  selection: "Practise using 'if' and 'if-else' to control what your sprite does.",
  subprograms: "Review how to make custom blocks using 'My Blocks' to tidy your code.",
  "count-controlled": "Check how many times a repeat loop will run and how it works.",
  "condition-controlled": "Review 'repeat until' and how it depends on the condition.",
  syntax: "Look at your script – is anything missing, or in the wrong place?"
};

const challengeTasks = {
  variables: "CHALLENGE: Make a game with a score that increases when a sprite is clicked.",
  selection: "CHALLENGE: Use if-else to check if a variable is above a certain value.",
  subprograms: "CHALLENGE: Create a custom block that makes your sprite do a dance.",
  "count-controlled": "CHALLENGE: Use 'repeat 10' to create a flashing effect with your sprite.",
  "condition-controlled": "CHALLENGE: Make a sprite keep moving until it touches the edge.",
  syntax: "CHALLENGE: Debug a script where a sprite isn’t working correctly due to a missing block."
};

let currentQuestion = 0;
let score = 0;
let correctConcepts = [];
let incorrectConcepts = [];

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const questionImage = document.getElementById("question-image");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const wwwList = document.getElementById("www-list");
const ebiList = document.getElementById("ebi-list");
const challengeList = document.getElementById("challenge-list");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}: ${q.question}`;
  answerInput.value = "";
  feedback.textContent = "";
  questionImage.src = q.image || "";
}

submitBtn.addEventListener("click", () => {
  const q = questions[currentQuestion];
  const userAnswer = answerInput.value.trim().toLowerCase();

  if (q.answers.some(ans => userAnswer === ans.toLowerCase())) {
    feedback.textContent = "Correct!";
    score++;
    if (!correctConcepts.includes(q.concept)) correctConcepts.push(q.concept);
  } else {
    feedback.textContent = `Incorrect. The correct answer was: ${q.answers[0]}`;
    if (!incorrectConcepts.includes(q.concept)) incorrectConcepts.push(q.concept);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(() => loadQuestion(), 1000);
  } else {
    setTimeout(() => showResults(), 1000);
  }
});

function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreDisplay.textContent = `You got ${score} out of ${questions.length}.`;

  (correctConcepts.length > 0 ? correctConcepts.slice(0, 3) : ["none"]).forEach(concept => {
    const li = document.createElement("li");
    li.textContent = conceptWWW[concept] || "You gave it a go! Keep practising all the topics.";
    wwwList.appendChild(li);
  });

  (incorrectConcepts.length > 0 ? incorrectConcepts.slice(0, 3) : ["none"]).forEach(concept => {
    const li = document.createElement("li");
    li.textContent = conceptEBI[concept] || "Excellent work – you got everything right!";
    ebiList.appendChild(li);
  });

  if (incorrectConcepts.length > 0) {
    incorrectConcepts.slice(0, 2).forEach(concept => {
      const li = document.createElement("li");
      li.textContent = challengeTasks[concept];
      challengeList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "You got full marks – try creating your own quiz!";
    challengeList.appendChild(li);
  }
}

loadQuestion();
