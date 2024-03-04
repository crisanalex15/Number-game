'use strict';

// Selecting elements
const Player0El = document.querySelector('.player--0');
const Player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting condition
score0El.textContent = score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = false;
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
function init() {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
}
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : 0;
  Player0El.classList.toggle('player--active');
  Player1El.classList.toggle('player--active');
}

// Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    console.log('s-a apasat');
    // Generate dice
    const dice = Math.trunc(Math.random() * 6 + 1);
    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // add curent score to player
  if (playing) {
    score[activePlayer] += currentScore;
    //score[1] = score[1] + current0El
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check if score >= 100
    if (score[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    // Switch player
    else switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.querySelector('#score--0').textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  init();
});
