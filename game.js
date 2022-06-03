const message = document.getElementById("messageBox");
const button = document.getElementById("checkButton");
const playerHistory = document.getElementById("playerHistory");
const attemptsRemaining = document.getElementById("attemptRemaining");
const playerInput = document.querySelectorAll(".playerInput");
const hints = document.getElementById("hintsCheckbox");

let randomNums = [];
let playerGuesses = [];
let correctNums = 0;
let correctNumsAndPos = 0;

// Game object
const game = { 
  attempts: 10, 
  num: 4 ,
  hints: false
};

// Button click handler
button.addEventListener("click", (e) => {
  if (
    button.textContent === "Start Game" ||
    button.textContent === "Restart Game"
  ) {
    startGame();
  } else if (button.textContent === "Unlock") {
    getPlayerInput();
    compareCombos();
  }
});
console.log('hints', hints.checked)

hints.addEventListener('click', (e) => {
  if(hints.checked) {
    game.hints = true;
  }
})

const startGame = () => {
  // get computer answers
  generateRandomNumsApi();
  // Reset game
  resetGame();
};

const resetGame = () => {
  randomNums = [];
  playerGuesses = [];
  message.textContent = "Guess the 4-digit combo to unlock the prize";
  button.textContent = "Unlock";
  attemptsRemaining.textContent = `Attempts Remaining: ${game.attempts}`;
  for (let i = 0; i < 4; i++) {
    playerInput[i].classList.remove('bg-danger')
    playerInput[i].classList.remove('bg-warning')
    playerInput[i].classList.remove('bg-success')
    playerInput[i].classList.remove('text-white')
    playerInput[i].value = '';
  }
  removeHistory();
};

const removeHistory = () => {
  playerHistory.innerHTML = "";
}

const generateRandomNumsApi = async () => {
  // Fetch random num API returns string
  const numsReceived = await fetch("http://localhost:4000/")
    .then((res) => res.json())
    .then((data) => data);

  for (let index = 0; index < game.num; index++) {
    randomNums.push(parseInt(numsReceived[index]));
  }
  console.log(`API 4-digit code: ${randomNums}`);

  // Backup Random number generator
  if (randomNums.length !== game.num) {
    backupRandomNums();
  }
};

const backupRandomNums = () => {
  randomNums = [];
  for (let i = 0; i < game.num; i++) {
    randomNums.push(Math.floor(Math.random() * 8)); // Random int 0-7
  }
  console.log(`Backup 4-digit code: ${randomNums}`);
};

const getPlayerInput = () => {
  decreaseAttempts();
  attemptsRemaining.textContent = `Attempts Remaining: ${game.attempts}`;
  playerHistory.innerHTML = "Your Previous Choices:";
  playerInput.forEach((guess) => {
    console.log(`player guess ${guess.value} type ${typeof guess.value} with lenght ${guess.value.length}`)

    playerGuesses.push(parseInt(guess.value));
  });
  console.log(`The player guesses... ${playerGuesses}`);
  // Adds player hints
  for (let i = 0; i < playerGuesses.length; i++) {
    if(randomNums[i] === playerGuesses[i]) {
      playerInput[i].classList.remove('bg-danger')
      playerInput[i].classList.remove('bg-warning')
      playerInput[i].classList.add('bg-success')
      playerInput[i].classList.add('text-white')
    } else if(randomNums[i] > playerGuesses[i]){
      playerInput[i].classList.remove('bg-success')
      playerInput[i].classList.remove('bg-warning')
      playerInput[i].classList.add('bg-danger')
      playerInput[i].classList.add('text-white')
    } else {
      playerInput[i].classList.remove('bg-danger')
      playerInput[i].classList.remove('bg-success')
      playerInput[i].classList.add('bg-warning')
      playerInput[i].classList.add('text-white')
    }
   }
};

const decreaseAttempts = () => {
  // Decrements attempts
  game.attempts--;
  console.log(`Attempts: ${game.attempts}`);
}

const compareCombos = () => {

  if (game.attempts > 0) {

    for (let i = 0; i < playerGuesses.length; i++) {
      if(randomNums[i] === playerGuesses[i]) {
        correctNums++;
        correctNumsAndPos++;
      } else if (playerGuesses.includes(randomNums[i])){
        correctNums++;
      }
     }
    

    console.log(`Total Number & Position Correct: ${correctNumsAndPos}`);
    console.log(`Total Number Correct: ${correctNums}`);
    message.textContent = `You guessed ${correctNums} of ${game.num} the numbers and have ${correctNumsAndPos} number(s) in the correct location.`;

    // Checks if the player guessed the entire combination lock
    if (correctNumsAndPos === game.num) {
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
