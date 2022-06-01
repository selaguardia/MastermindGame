const message = document.getElementById("messageBox");
const button = document.getElementById("checkButton");
const playerHistory = document.getElementById("playerHistory");
const attemptsRemaining = document.getElementById("attemptRemaining");
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

// Button click handler
button.addEventListener("click", (e) => {
  if (button.textContent === "Start Game" || button.textContent === "Restart Game") {
    startGame();
  } else if (button.textContent === "Unlock") {
    getPlayerInput();
    compareCombos();
  };
});

const startGame = async () => {
  // Fetch rasndom num api
  const numsReceived = await fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(data => data);
  numsReceived.pop();
  for (let index = 0; index < numsReceived.length; index++) {
    randomNums.push(parseInt(numsReceived[index]));
  }
  console.log(`4-digit code: ${randomNums}`)
  // Reset game
  game.attempts = attempts;
  randomNums = [];
  playerGuesses = [];
  message.textContent = "Guess the 4-digit combo to unlock the prize";
  button.textContent = "Unlock";
  attemptsRemaining.textContent = `Attempts Remaining: ${game.attempts}`;
  
  // temp Random number 
  // for (let i = 0; i < game.num; i++) {
  //   randomNums.push(Math.floor(Math.random() * 8)); // Random int 0-7
  // }
  // console.log(`4-digit code: ${randomNums}`);
};

const getPlayerInput = () => {
  // Decrements attempts
  game.attempts--;
  // console.log(`Attempts: ${game.attempts}`)
  attemptsRemaining.textContent = `Attempts Remaining: ${game.attempts}`;
  playerHistory.innerHTML = "Your Previous Choices:";
  playerInput.forEach((guess) => {
    // let guessToInt = parseInt(guess.value);
    playerGuesses.push(parseInt(guess.value));
  });
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
      button.textContent = "Restart Game";
    }

    // adds player history
    handleHistory();
  } else {
    message.textContent = "Sorry, you ran out of attempts!";
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
    <strong>Player Guessed:</strong> ${guessHistory}<br>
    <strong>Number Correct:</strong> ${correctNumsHistory}<br>
    <strong>Number & Position Correct:</strong> ${correctNumsAndPosHistory}
  </li>`;
  playerHistory.insertAdjacentHTML("afterend", html);
};
