import React, { Component } from "react";
import axios from "axios";
import Card from "./components/Card";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck: {},
      userHand: [],
      drawNumber: "",
    };
    this.handleHand = this.handleHand.bind(this);
    this.drawHand = this.drawHand.bind(this);
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
    console.log(this.state.deck);
  }

  async drawHand(event) {
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
    console.log(this.state.deck);
    this.setState({ drawNumber: 0 });
  }

  handleHand(event) {
    this.setState({ drawNumber: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Card Game</h1>
        <h2 className="description">
          Start by clicking get deck, then add a single card or choose a number
          to add.
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
            placeholder="# of cards"
            onChange={this.handleHand}
          ></input>
          <input type="submit"></input>
        </form>
        <div className="handArea">
          <Card hand={this.state.userHand} />
        </div>
      </div>
    );
  }
}

export default App;
