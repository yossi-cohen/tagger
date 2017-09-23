import React from "react";
import DocumentTags from './DocumentTags';

// Filter component
export default class Filter extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    this.state = {
      tagsSuggestions: [] //lilo:TODO - read from backend
    };
  }

  // render
  render() {
    const tags = [];
    return (
      <DocumentTags
        ref="documentTags"
        placeholder="Type tag filter..."
        tags={document.tags}
        suggestions={this.state.tagsSuggestions} />
    );
  }
}
