import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { PageHeader, Panel } from "react-bootstrap";

// Document add/edit page component
export class LabelEntities extends React.Component {
  // constructor
  constructor(props) {
    super(props);
  }

  // render
  render() {
    const {document, handleSubmit, error, invalid, submitting} = this.props;
    return (
      <div className="page-label-entities">
        <PageHeader>{'Entities: Document ' + (document.id ? document.id : '(doc-id undefined)')}</PageHeader>
        <Panel>
          {this.props.document.documentText}
        </Panel>

      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state, own_props) {
  const document = state.documents.find(x => Number(x.id) === Number(own_props.params.id)) || {};
  return {
    document: document,
    initialValues: document,
  };
}
export default connect(mapStateToProps)(LabelEntities);
