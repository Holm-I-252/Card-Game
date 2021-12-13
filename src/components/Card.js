import React, { Component } from "react";

class Card extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getCards() {}

  componentDidUpdate() {
    this.getCards();
  }

  render() {
    let handList = this.props.hand.map((d) => (
      <li className="card">
        <img src={d[1]} alt={d[2]} className="cardPic"></img>
      </li>
    ));
    return (
      <div className="cards">
        <ul className="cardList">{handList}</ul>
      </div>
    );
  }
}

export default Card;
