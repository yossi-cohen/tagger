import React, { PropTypes } from "react";
import { Link } from "react-router";
import { Button, Glyphicon } from "react-bootstrap";

// Document List Element component
export default class DocumentListElement extends React.Component {
  // render
  render() {
    const {document, showDelete} = this.props;
    return (
      <tr>
        <td>{document.id}</td>
        <td>{document.documentName}</td>
        <td>{document.job}</td>
        <td>
          <Link to={'document-edit/' + document.id}>
            <Button bsSize="xsmall">
              Edit <Glyphicon glyph="edit"/>
            </Button>
          </Link>
        </td>
        <td>
          <Button bsSize="xsmall" className="document-delete" onClick={() => showDelete(document)}>
            Delete <Glyphicon glyph="remove-circle"/>
          </Button>
        </td>
      </tr>
    );
  }
}

// prop checks
DocumentListElement.propTypes = {
  document: PropTypes.object.isRequired,
  showDelete: PropTypes.func.isRequired,
}
