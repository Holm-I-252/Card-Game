import React, { Component } from "react";
import axios from "axios";
import Card from "./components/Card";
import blank from "./pics/blank.png";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck: {},
      userHand: [],
      compHand: [],
      drawNumber: "",
      stack: [[0, blank, 0]],
    };
    this.handleHand = this.handleHand.bind(this);
    this.drawHand = this.drawHand.bind(this);
    this.setStack = this.setStack.bind(this);
  }
  async getDeck() {
    let res = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    this.setState({
      deck: { deckId: res.data.deck_id, remaining: res.data.remaining },
    });
    console.log(this.state.deck);
  }

  async drawCompCard() {
    let res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deck.deckId}/draw/?count=1`
    );
    this.setState({
      deck: { deckId: res.data.deck_id, remaining: res.data.remaining },
    });
    this.setState({
      compHand: [
        ...this.state.compHand,
        [
          res.data.cards[0].value,
          res.data.cards[0].image,
          res.data.cards[0].code,
        ],
      ],
    });
  }

  async drawCard() {
    let res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deck.deckId}/draw/?count=1`
    );
    this.setState({
      deck: { deckId: res.data.deck_id, remaining: res.data.remaining },
    });
    this.setState({
      userHand: [
        ...this.state.userHand,
        [
          res.data.cards[0].value,
          res.data.cards[0].image,
          res.data.cards[0].code,
        ],
      ],
    });
    this.drawCompCard();
    console.log(this.state.deck);
  }

  async compDrawHand() {
    let res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deck.deckId}/draw/?count=${this.state.drawNumber}`
    );
    this.setState({
      deck: { deckId: res.data.deck_id, remaining: res.data.remaining },
    });
    res.data.cards.forEach((element) => {
      this.setState({
        compHand: [
          ...this.state.compHand,
          [element.value, element.image, element.code],
        ],
      });
    });
  }

  async drawHand(event) {
    if (this.state.drawNumber <= 26) {
      event.preventDefault();
      let res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck.deckId}/draw/?count=${this.state.drawNumber}`
      );
      this.setState({
        deck: { deckId: res.data.deck_id, remaining: res.data.remaining },
      });
      res.data.cards.forEach((element) => {
        this.setState({
          userHand: [
            ...this.state.userHand,
            [element.value, element.image, element.code],
          ],
        });
      });

      this.compDrawHand();

      console.log(this.state.deck);
      this.setState({ drawNumber: 0 });
    } else {
      alert("Number of cards drawn should be less than or equal to 26.");
    }
  }

  handleHand(event) {
    this.setState({ drawNumber: event.target.value });
  }

  setStack(data) {
    this.setState({ stack: [data, ...this.state.stack] });
    console.log(this.state.stack);

    let arr = this.state.userHand;
    let index = arr.indexOf(data);
    if (index > -1) {
      arr.splice(index, 1);
    }
    this.setState({ userHand: arr });
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Card Game (Work In Progress)</h1>
        <h2 className="description">
          Start by clicking get deck, then add a single card or choose a number
          to draw. Drawign a card will add one to your opponent's hand.
        </h2>
        <button onClick={(e) => this.getDeck(e)}>Get Deck</button>
        <button onClick={(e) => this.drawCard(e)}>Draw Card</button>
        <form
          className="handNumber"
          onSubmit={(e) => {
            this.drawHand(e);
          }}
        >
          <input
            type="text"
            placeholder="# of cards (# is <= 26)"
            onChange={this.handleHand}
          ></input>
          <input type="submit"></input>
        </form>
        <h3 className="cardsLeft">
          Cards Remaining: {this.state.deck.remaining}
        </h3>
        <p>Opponent's cards left: {this.state.compHand.length}</p>
        <div className="playArea">
          {/* <p>Cards In Stack:{this.state.stack[0]}</p> */}
          <img
            src={this.state.stack[0][1]}
            alt={this.state.stack[0][2]}
            className="playedCard"
          ></img>
        </div>
        <h3 className="handTitle">Your Hand:</h3>
        <div className="handArea">
          <Card hand={this.state.userHand} setStack={(e) => this.setStack(e)} />
        </div>
      </div>
    );
  }
}

export default App;
