import React, { Component } from "react";

class Card extends Component {
  constructor() {
    super();
    this.state = {};
  }

  readHand = (e) => {
    console.log(e);
    this.props.setStack(e);
  };

  render() {
    let handList = this.props.hand.map((d) => (
      <li className="card">
        <img
          src={d[1]}
          alt={d[2]}
          className="cardPic"
          onClick={(e) => {
            this.readHand(d);
            e.preventDefault();
          }}
        ></img>
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
