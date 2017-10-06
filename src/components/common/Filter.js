import React from "react";
import { connect } from "react-redux";
import DocumentTags from './DocumentTags';

// Filter component
class Filter extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    this.handleAddition = this.handleAddition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

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
        placeholder="add tag filter..."
        handleAddition={this.handleAddition}
        handleDelete={this.handleDelete}
        tags={document.tags}
        suggestions={this.state.tagsSuggestions} />
    );
  }

  handleAddition(tags) {
    this.props.dispatch({ type: 'SET_TAGS_FILTER', tags: tags });
    this.props.dispatch({
      type: 'DOCUMENTS_FETCH_LIST',
      page: this.props.page,
      tags: tags,
    });
  }

  handleDelete(tags) {
    this.props.dispatch({ type: 'SET_TAGS_FILTER', tags: tags });
    this.props.dispatch({
      type: 'DOCUMENTS_FETCH_LIST',
      page: this.props.page,
      tags: tags,
    });
  }
}

// export the connected class
function mapStateToProps(state) {
  return {
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  };
}

export default connect(mapStateToProps)(Filter);
