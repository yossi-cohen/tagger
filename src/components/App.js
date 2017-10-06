import React from "react";
import { ProgressBar } from "react-bootstrap";
import Menu from "./common/Menu";
import "../stylesheets/main.scss";

// App component
export default class App extends React.Component {
  // render
  render() {
    const { children } = this.props;
    
    // render
    return (
      <div className="container">
        <div>
          <Menu />
        </div>
        <div>
          {children}
        </div>
        <div className="footer">
          <img src="/media/logo.svg" />
          <span>Entity tagger built with react</span>
          <br />
          <a target="_blank" href="https://github.com/yossi-cohen/tagger">GitHub</a>
        </div>
      </div>
    );
  }
}

