const deck = [];
const suits = ["♠", "♥", "♣", "♦"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const values = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": 11 };

let playerHand = [];
let dealerHand = [];
let wins = 0;
let losses = 0;

const dealerCards = document.getElementById('dealer-cards');
const playerCards = document.getElementById('player-cards');
const dealerScoreDisplay = document.getElementById('dealer-score');
const playerScoreDisplay = document.getElementById('player-score');
const messageDisplay = document.getElementById('message');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');

const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const restartButton = document.getElementById('restart-button');

const blackjackTable = document.getElementById('blackjack-table');

function createDeck() {
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank, value: values[rank] });
        });
    });
    deck.sort(() => Math.random() - 0.5);
}

function startGame() {
    createDeck();
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];

    updateDisplay();
    checkForBlackjack();
}

function drawCard() {
    return deck.pop();
}

function updateDisplay() {
    dealerCards.innerHTML = dealerHand.map((card, i) => {
        return `<div class="card">${i === 0 && !standButton.disabled ? '?' : `${card.rank}${card.suit}`}</div>`;
    }).join('');

    playerCards.innerHTML = playerHand.map(card => {
        return `<div class="card">${card.rank}${card.suit}</div>`;
    }).join('');

    dealerScoreDisplay.textContent = standButton.disabled ? calculateScore(dealerHand) : '?';
    playerScoreDisplay.textContent = calculateScore(playerHand);
}

function calculateScore(hand) {
    let score = hand.reduce((acc, card) => acc + card.value, 0);
    let aceCount = hand.filter(card => card.rank === 'A').length;
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function checkForBlackjack() {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore === 21 && dealerScore === 21) {
        messageDisplay.textContent = "It's a tie with Blackjack!";
        endGame();
    } else if (playerScore === 21) {
        messageDisplay.textContent = "Blackjack! You win!";
        blackjackTable.classList.add('win');
        wins++;
        updateStats();
        endGame();
    } else if (dealerScore === 21) {
        messageDisplay.textContent = "Dealer has Blackjack! You lose.";
        blackjackTable.classList.add('lose');
        losses++;
        updateStats();
        endGame();
    }
}

function playerHit() {
    playerHand.push(drawCard());
    updateDisplay();
    const playerScore = calculateScore(playerHand);
    if (playerScore > 21) {
        messageDisplay.textContent = "You bust! Dealer wins.";
        blackjackTable.classList.add('lose');
        losses++;
        updateStats();
        endGame();
    }
}

function dealerTurn() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(drawCard());
    }
    updateDisplay();
    const dealerScore = calculateScore(dealerHand);
    const playerScore = calculateScore(playerHand);
    if (dealerScore > 21) {
        messageDisplay.textContent = "Dealer busts! You win!";
        blackjackTable.classList.add('win');
        wins++;
        updateStats();
    } else if (dealerScore > playerScore) {
        messageDisplay.textContent = "Dealer wins.";
        blackjackTable.classList.add('lose');
        losses++;
        updateStats();
    } else if (dealerScore < playerScore) {
        messageDisplay.textContent = "You win!";
        blackjackTable.classList.add('win');
        wins++;
        updateStats();
    } else {
        messageDisplay.textContent = "It's a tie!";
    }
    endGame();
}

function endGame() {
    hitButton.disabled = true;
    standButton.disabled = true;
    restartButton.style.display = 'inline-block';
    updateDisplay();
}

function updateStats() {
    winsDisplay.textContent = `🏆 ${wins}`;
    lossesDisplay.textContent = `❌ ${losses}`;
}

function restartGame() {
    deck.length = 0;
    playerHand.length = 0;
    dealerHand.length = 0;
    messageDisplay.textContent = '';
    hitButton.disabled = false;
    standButton.disabled = false;
    restartButton.style.display = 'none';
    blackjackTable.classList.remove('win', 'lose');
    // Reset box shadow to default
    blackjackTable.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.7)';
    startGame();
}

hitButton.addEventListener('click', playerHit);
standButton.addEventListener('click', () => {
    standButton.disabled = true;
    dealerTurn();
});
restartButton.addEventListener('click', restartGame);

restartGame();