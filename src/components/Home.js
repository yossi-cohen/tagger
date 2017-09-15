import React from "react";
import DocumentList from "./common/DocumentList";

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <DocumentList/>
      </div>
    );
  }
}