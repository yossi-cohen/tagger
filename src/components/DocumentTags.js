import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';

const Countries = [
  'Thailand',
  'India',
  'Israel',
];

// Document add/edit page component
export class DocumentTags extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    
    this.state = {
      tags: [{ id: 1, text: "Thailand" }, { id: 2, text: "India" }],
      suggestions: Countries
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

  // render
  render() {
    const { tags, suggestions } = this.state;
    return (
      <div>
        <ReactTags tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag} />
      </div>
    )
  }
}

//lilo
// // export the connected class
// function mapStateToProps(state) {
//   const document = state.documents.find(x => Number(x.id) === Number(this.props.document.id)) || {};
//   return {
//     document: document,
//     initialValues: document,
//   };
// }

// export default connect(mapStateToProps)(DocumentTags);
export default connect()(DocumentTags);
