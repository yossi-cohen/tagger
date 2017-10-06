import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { PageHeader } from "react-bootstrap";

// Label Relations component
export class LabelRelations extends React.Component {
  // constructor
  constructor(props) {
    super(props);
  }

  // render
  render() {
    const { document } = this.props;
    return (
      <div className="page-label-relations">
        <PageHeader>
        <small>
            {'Relations: ' + (document.name ? document.name : '(undefined)')}
            <br/>
            NOT YET IMPLEMENTED
          </small>
        </PageHeader>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state, own_props) {
  const document = state.documents.find(x => x.id == own_props.params.id) || {};
  return {
    document: document,
  };
}

export default connect(mapStateToProps)(LabelRelations);
