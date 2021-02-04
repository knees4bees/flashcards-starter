const Turn = require('./Turn');

class Round {
  constructor(deck) {
    this.deck = deck.cards;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.deck[0];
  }

  takeTurn(guess) {
    const card = this.returnCurrentCard();
    const turn = new Turn(guess, card);

    this.turns++;
    this.deck.shift();

    if (!turn.evaluateGuess()) {
      this.incorrectGuesses.push(card.id);
    }

    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    const numCorrect = this.turns - this.incorrectGuesses.length;

    if (this.turns > 0) {
      return Math.round((numCorrect / this.turns) * 100);
    } else {
      return 0;
    }
  }
}

module.exports = Round;