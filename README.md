Welcome to the Blackjack Game repository! This project is a simple web-based implementation of the classic card game Blackjack. 
The game allows you to play against a virtual dealer, with functionality to hit, stand, and restart the game. 
It keeps track of your wins and losses as well.



Play Blackjack against a virtual dealer
Interactive controls for hitting, standing, and restarting the game
Displays player and dealer cards and scores
Keeps track of wins and losses
Responsive design for optimal gameplay experience
Installation

To run this game locally, follow these steps:

Clone the repository:
bash
Copy code
git clone https://github.com/tkarusala001/blackjack.git
Navigate to the project directory:
bash
Copy code
cd blackjack
Open index.html in your web browser.
Simply double-click the index.html file, or open it with your preferred browser.
Usage

Start the Game:
The game starts automatically when you open the index.html file in your browser.
Game Controls:
Hit: Draws a new card for the player.
Stand: Ends the player's turn and lets the dealer play.
Restart: Starts a new game after the current game ends.
Game Play:
The player is initially dealt two cards, as is the dealer.
The player can choose to "hit" to get additional cards or "stand" to keep their current hand.
The dealer will continue drawing cards until their score is 17 or higher.
The game ends when either the player busts (score over 21), the dealer busts, or a win/loss/tie condition is met based on the scores.
How It Works

File Structure
index.html: The main HTML file that sets up the game layout.
styles.css: Contains the CSS for styling the game.
script.js: JavaScript file containing the game logic.
Key Components
Deck Creation: A standard 52-card deck is created and shuffled.
Game Initialization: Deals two cards to both the player and the dealer at the start.
Gameplay Functions: Handles player actions (hit/stand) and dealer's turn.
Scoring: Calculates scores and checks for win/loss conditions.
Restart Functionality: Allows the player to start a new game after one ends.
Contributing

If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes.
Push your branch to your fork.
Open a pull request with a description of your changes.
License

This project is licensed under the MIT License - see the LICENSE file for details.

