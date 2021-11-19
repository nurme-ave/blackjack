let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let player = {
  title: "Your score",
  chips: 0
}

const startGameBtn = document.querySelector("#startGameBtn");
const newCardBtn = document.querySelector("#newCardBtn");
const messageEl = document.querySelector("#message-el");
const newGameMsgEl = document.querySelector("#new-game-msg-el");
const sumEl = document.querySelector("#sum-el");
const cardsEl = document.querySelector("#cards-el");
const playerEl = document.querySelector("#player-el");

startGameBtn.addEventListener("click", startGame);
newCardBtn.addEventListener("click", newCard);

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  return (randomNumber > 10 ? 10 : randomNumber);
}

function startGame() {
  newGameMsgEl.style.visibility = 'hidden';
  isAlive = true;
  hasBlackJack = false;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    messageEl.textContent = "Do you want to draw a new card?";
  } else if (sum === 21) {
    messageEl.innerHTML = 
    `<p class="blinkingText">
      You've got Blackjack!
    </p>`;
    newGameMsgEl.style.visibility = 'visible';
    player.chips += 100;
    hasBlackJack = true;
  } else if (sum > 21) {
    messageEl.textContent = "You're out of the game!";
    newGameMsgEl.style.visibility = 'visible';
    player.chips -= 25;
    isAlive = false;
  }
  playerEl.style.visibility = 'visible';
  playerEl.textContent = `${player.title}: € ${player.chips}`
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}
