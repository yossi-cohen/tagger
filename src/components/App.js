import React from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import Menu from "./common/Menu";
import "../stylesheets/main.scss";

// App component
export class App extends React.Component {
  // pre-render logic
  componentWillMount() {
    // the first time we load the app, we need that documents list
    this.props.dispatch({
      type: 'DOCUMENTS_FETCH_LIST',
      page: this.props.page,
      tags: this.props.tags,
    });
  }

  // render
  render() {
    // show the loading state while we wait for the app to load
    const { documents, children } = this.props;
    if (!documents) { // lilo: find better way to test if loading
      return (
        <ProgressBar active now={100} />
      );
    }

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

// export the connected class
function mapStateToProps(state) {
  return {
    documents: state.documents || [],
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
    tags: state.tags,
  };
}

export default connect(mapStateToProps)(App);
