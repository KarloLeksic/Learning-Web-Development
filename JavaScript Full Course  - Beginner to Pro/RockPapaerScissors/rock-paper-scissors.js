// Object for storing and tracking score
// Read the score from the localStorage
let score = JSON.parse(localStorage.getItem('score'));

// Check if the score is empty
if (score === null) {
  // Set default values
  score = {
    wins: 0,
    loses: 0,
    ties: 0
  }
}

// Print score on the page
updateScoreElement();

// Mozemo i krace tako da koristimo default operator
// let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, loses: 0, ties: 0};
// Dakle, ako je prvo true onda ni nejde dalje, a ako je false onda ce se izvrsiti ovo dalje
// Bice false ako objekt ne postoji (ako ne postoji zapis u memoriji - ako nismo igrali, prvi put igramo), bice null, al to je isto netocno pa ce se ici dalje

// Get random move from computer
function pickComputerMove() {
  const randomNumber = Math.random(); // 0 - 1

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

// Flag za automatsku igru
let isAutoPlaying = false;

// Set interval vraca ID i on nam treba da bi ga zaustavili
let intervalID;

function autoPlay() {
  // Get autoplay button
  const autoPlayButton = document.querySelector('.js-auto-play-btn');

  if (!isAutoPlaying) {
    // Play svake sekunde
    intervalID = setInterval(function () {
      // Vec imamo za generiranje pokreta
      const playerMove = pickComputerMove();

      // Isto tako imamo funkciju za igranje
      playGame(playerMove);
    }, 1000);

    // Postaviti flag da se zna da se igra
    isAutoPlaying = true;

    autoPlayButton.innerText = 'Stop Auto Play';
  } else {
    // Stop the game
    clearInterval(intervalID);
    isAutoPlaying = false;

    autoPlayButton.innerText = 'Auto Play';
  }
}

// Play the game
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  // Game rules
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  // Update the score
  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.loses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  // Store the score in the local storage
  localStorage.setItem('score', JSON.stringify(score)); // It only supports strings!

  // Update result, move and score fields
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
          You
          <img src="images/${playerMove}-emoji.png" class="move-icon">
          <img src="images/${computerMove}-emoji.png" class="move-icon">
          Computer`;
}

// Function for reset score
function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;

  // Remove the score from local storage
  localStorage.removeItem('score');

  updateScoreElement();
}

// Print score on the screen
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}
