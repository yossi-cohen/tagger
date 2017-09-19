import React from "react";

// Document add/edit page component
export default class TokenSpan extends React.Component {
  // constructor
  constructor(props) {
    super(props);
  }

  // render
  render() {
    return (
      <span className="token">{this.props.token}</span>
    );
  }
}

