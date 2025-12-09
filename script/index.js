// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

//Initializing word
let randomWord;

//Initializing score
let score = 0;

//Initializing time
let time = 10;

//get difficulty from local storage or default to medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

//Focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);





// Put a new random word on screen
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}


//Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}




//Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }

}









//Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = "flex";
}




//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value.trim();

    // Correct word
     if (insertedText === randomWord) {

      updateScore();
      addWordToDOM();


    // Add time based on difficulty
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }


    timeEl.innerHTML = time;

    // Clear input
    e.target.value = "";
  }
});


  settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
  });


//Settings difficulty change

  difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
  });

addWordToDOM();



   