const message = document.getElementById("messageBox");
const button = document.getElementById("checkButton");
const playerHistory = document.getElementById("playerHistory");
const attemptsRemaining = document.getElementById('attemptRemaining');
const playerInput = document.querySelectorAll(".playerInput");

let randomNums = [];
let playerGuesses = [];
let correctNums = 0;
let correctNumsAndPos = 0;
const attempts = 10;
// Game object
const game = {
  attempts,
  num: 4,
};

// Adds dynamic text for button and  instructions
message.textContent = "Click the button below to start game!";
button.textContent = "Start Game";

// Button click handler
button.addEventListener("click", (e) => {
  if (button.textContent === "Start Game") {
    // Reset game
    game.attempts = attempts;
    playerHistory.innerHTML = "";
    randomNums = [];
    playerGuesses = [];
    message.textContent = "Guess the 4-digit combo to unlock the prize";
    button.textContent = "Unlock";
    startGame();
  } else if (button.textContent === "Unlock") {
    playerHistory.innerHTML = "Your Previous Choices:";
    getPlayerInput();
    compareCombos();
  }
});

const startGame = () => {
  console.log(`Game has begun...`);
  for (let i = 0; i < game.num; i++) {
    randomNums.push(Math.floor(Math.random() * 8)); // Random int 0-7
  }
  console.log(`4-digit code: ${randomNums}`);
  attemptsRemaining.textContent = `Attempts Remaining: ${game.attempts}`;
};

const getPlayerInput = () => {
  console.log(`Getting player input....`);
  playerInput.forEach((guess) => {
    let guessToInt = parseInt(guess.value);
    playerGuesses.push(guessToInt);
  });
  // Decrements attempts
  game.attempts--;
  console.log(`Attempts Left: ${game.attempts}`);
  attemptsRemaining.textContent = `Attempts Remaining: ${game.attempts}`;
  console.log(`The player guesses... ${playerGuesses}`);
};

const compareCombos = () => {
  const length = randomNums.length;

  if (game.attempts > 0) {
    // Checks if the player guessed a correct number AND location(index).
    for (let i = 0; i < length; i++) {
      if (randomNums[i] == playerGuesses[i]) {
        correctNumsAndPos++;
      }
    }
    console.log(`Total Number & Position Correct: ${correctNumsAndPos}`);

    // Checks if the player guessed a correct number
    for (let j = 0; j < length; j++) {
      if (randomNums.includes(playerGuesses[j])) {
        correctNums++;
      }
    }
    console.log(`Total Number Correct: ${correctNums}`);

    // Checks if the player guessed the entire combination lock
    if (correctNumsAndPos === 4) {
      message.textContent = `Congrats! You unlocked the prize!`;
      button.textContent = "UNLOCKED";
    }



    // adds player history
    handleHistory();
  } else {
    message.textContent = "Sorry, you ran out of attempts!";
    attemptsRemaining.textContent = `Attempts Remaining: 0`;
    button.textContent = "Restart Game";
  }
};

const handleHistory = () => {
  let guessHistory = playerGuesses;
  let correctNumsHistory = correctNums;
  let correctNumsAndPosHistory = correctNumsAndPos;
  // Clears these values so it's not added after every attempt
  playerGuesses = [];
  correctNums = 0;
  correctNumsAndPos = 0;

  let html = `
  <li class="list-group-item"><hr>
  Player Guessed:[${guessHistory}]<br>
  Number Correct: ${correctNumsHistory}<br>
  Number & Position Correct: ${correctNumsAndPosHistory}
  </li>`;
  playerHistory.insertAdjacentHTML("afterend", html);
};
