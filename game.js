const message = document.getElementById("messageBox");
const button = document.getElementById("checkButton");
const playerHistory = document.getElementById("playerHistory");
const attemptsRemaining = document.getElementById("attemptRemaining");
const playerInput = document.querySelectorAll(".playerInput");
const playerPoints = document.getElementById('playerPoints')
let randomNums = [];
let playerGuesses = [];
let correctNums = 0;
let correctNumsAndPos = 0;

// Game object
const game = { 
  attempts: 10, 
  num: 4 ,
  points:0,
};

// Button click handler
button.addEventListener("click", (e) => {
  if (
    button.textContent === "Start Game" ||
    button.textContent === "Restart Game"
  ) {
    startGame();
  } else if (button.textContent === "Unlock" && playerInput[0].value !== '' && playerInput[1].value !== '' && playerInput[2].value !== '' && playerInput[3].value !== '' ) {
    getPlayerInput();
    compareCombos();
  }
});

const startGame = () => {
  // get computer answers
  generateRandomNumsApi();
  // Reset game
  resetGame();
  playerPoints.textContent = game.points;
};

const resetGame = () => {
  randomNums = [];
  playerGuesses = [];
  game.attempts = 10;
  message.textContent = "Guess the 4-digit combo to unlock the prize";
  button.textContent = "Unlock";
  attemptsRemaining.textContent = `Attempts Remaining: ${game.attempts} `;
  for (let i = 0; i < 4; i++) {
    playerInput[i].classList.remove('bg-danger')
    playerInput[i].classList.remove('bg-warning')
    playerInput[i].classList.remove('bg-success')
    playerInput[i].classList.remove('text-white')
    playerInput[i].value = '';
  }
};


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
    playerGuesses.push(parseInt(guess.value));
  });
  addPlayerHints();
};

const addPlayerHints = () => {
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
}
const increasePoints = () => {
  game.points += 10;
  playerPoints.textContent = game.points;
}

const decreasePoints = () => {
  if(game.points >= 10) {
    game.points -= 10;
    playerPoints.textContent = game.points;
  }
}
const decreaseAttempts = () => {
  // Decrements attempts
  game.attempts--;
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
    message.textContent = `You guessed ${correctNums} of ${game.num} the numbers and have ${correctNumsAndPos} number(s) in the correct location.`;

    // Checks if the player guessed the entire combination lock
    if (correctNumsAndPos === game.num) {
      console.log(`Started with ${game.points} points!`)
      increasePoints();
      console.log(`You now have ${game.points} points!`)
      message.textContent = `Congrats! You unlocked the prize!`;
      button.textContent = "Restart Game";
    }

    // adds player history
    handleHistory();
  } else {
    console.log(`Started with ${game.points} points!`)
    decreasePoints();
    console.log(`You now have ${game.points} points!`)
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
