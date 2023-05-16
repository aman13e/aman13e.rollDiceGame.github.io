'use strict';
//selectiong elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const curentScore0EL = document.getElementById('current--0');
const curentScore1EL = document.getElementById('current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const diceEL = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//starting condions
let currentScore, activePlayer, playing, scores;
const restart = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  curentScore0EL.textContent = 0;
  curentScore1EL.textContent = 0;
  diceEL.classList.add('hidden');

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
restart();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//Rolling dice functionalitya;
rollBtn.addEventListener('click', function () {
  if (playing) {
    //1,generate randmom dice roll number

    const dice = Math.trunc(Math.random() * 6) + 1;
    //2,Display Dice
    diceEL.classList.remove('hidden');
    diceEL.src = `images/dice-${dice}.png`;
    //check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //switch to next player
    else {
      switchPlayer();
    }
  }
});
holdBtn.addEventListener('click', function () {
  if (playing) {
    //add currentScore to active player score
    scores[activePlayer] += currentScore;
    //scores[1]=scores[1]+currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2check if currentPlayer score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //finsh the game
    else {
      //switch to next player
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', restart);
