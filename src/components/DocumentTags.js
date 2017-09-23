import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';

// Document add/edit page component
export default class DocumentTags extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    // map from string array to object array
    let id = 0;
    const tags = props.tags ? props.tags.map(tag => {
      return { id: ++id, text: tag }
    }) : [];

    this.state = {
      tags: tags,
      suggestions: props.suggestions || []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
  }

  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({ tags: tags });
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array 
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render 
    this.setState({ tags: tags });
  }

  tags() {
    // map from object array to string array
    return this.state.tags.map(tag => tag.text);
  }

  // render
  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags tags={tags}
          suggestions={suggestions}
          placeholder='Add new tag'
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag} />
      </div>
    )
  }
}
