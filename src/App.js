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
    };
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
    console.log(res.data.cards[0].value);
    this.setState({
      userHand: [
        ...this.state.userHand,
        {
          value: res.data.cards[0].value,
          image: res.data.cards[0].image,
          code: res.data.cards[0].code,
        },
      ],
    });
    console.log(this.state.userHand);
  }
  render() {
    return (
      <div className="App">
        <button onClick={(e) => this.getDeck(e)}>Get Deck</button>
        <button onClick={(e) => this.drawCard(e)}>Draw Card</button>
        <div className="handArea">
          <Card hand={this.state.userHand} />
        </div>
      </div>
    );
  }
}

export default App;
