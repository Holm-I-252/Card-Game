import React, { Component } from "react";

class Card extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="cards">
        <p>{this.props.hand}</p>
      </div>
    );
  }
}

export default Card;
