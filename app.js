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
  }
});

const startGame = () => {
  console.log(`Game has started`);
}

