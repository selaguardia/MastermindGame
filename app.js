const message = document.getElementById('messageBox');
const button = document.getElementById('checkButton');
const playerHistory = document.getElementById("playerHistory");
const playerInput = document.querySelectorAll('.playerInput');

let randomNums = [];
let playerGuesses = [];
let correctNums = 0;
let correctNumsAndPos = 0;
const attempts = 10;
// Game object
const game = {
  attempts,
  num: 4
}

// Adds dynamic text for button and  instructions
message.textContent = "Click the button below to start game!";
button.textContent = "Start Game";
playerHistory.innerHTML='';

// Button click handler
button.addEventListener('click', (e) => {
  if(button.textContent === 'Start Game') {
    // Reset game
    game.attempts = attempts;
    playerHistory.innerHTML='';
    randomNums=[];
    playerGuesses=[];
    button.textContent = "Unlock";
    message.textContent = "Guess the 4-digit combo to unlock the prize";
    startGame();
  } else if (button.textContent === 'Unlock') {
    getPlayerInput();
    compareCombos();
  }
});

const startGame = () => {
  console.log(`Game has begun...`)
  for (let i = 0; i < game.num; i++) {
    randomNums.push(Math.floor(Math.random() * 8)); // Random int 0-7
  }
  console.log(`4-digit code: ${randomNums}`);
}

const getPlayerInput = () => {
  console.log(`Getting player input....`);
  playerInput.forEach(guess => {
    let guessToInt = parseInt(guess.value);
    playerGuesses.push(guessToInt);
  });
  console.log(`The player guesses... ${playerGuesses}`);
}

const compareCombos = () => {
  const length = randomNums.length;

  if(game.attempts > 0) {
    // Check if the player guesses the correct number AND location(index)
    for (let i = 0; i < length; i++) {
      if(randomNums[i] == playerGuesses[i]){
        correctNumsAndPos++;
      }
    }
    console.log(`Total Number & Position Correct: ${correctNumsAndPos}`);
  
  } else {
    message.textContent = "Sorry, you ran out of attempts!";
    button.textContent = "Restart Game";
  }
}

