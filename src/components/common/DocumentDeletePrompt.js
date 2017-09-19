import React from "react";
import { PropTypes } from 'prop-types';
import { Modal, Button } from "react-bootstrap";

// Document delete component
export default class DocumentDeletePrompt extends React.Component {
  // render
  render() {
    const {show, document, hideDelete, documentDelete} = this.props;
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            Are you sure you want to delete <strong>{document.documentName}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={hideDelete}>No</Button>
          <Button bsStyle="primary" onClick={documentDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// prop checks
DocumentDeletePrompt.propTypes = {
  show: PropTypes.bool.isRequired,
  document: PropTypes.object.isRequired,
  hideDelete: PropTypes.func.isRequired,
  documentDelete: PropTypes.func.isRequired,
}
