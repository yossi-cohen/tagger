import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { PageHeader, Panel } from "react-bootstrap";

// import { documentsGetTokens } from "../../src/sagas/documents";

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
          <div className="entities">
          {/* {this.props.document.documentText} */}
          When <mark data-entity="person">Sebastian Thrun</mark> started working on self-driving cars at <mark data-entity="org">Google</mark> in <mark data-entity="date">2007</mark>, few people outside of the company took him seriously.<br/><br/>“I can tell you very senior CEOs of major American car companies would shake my hand and turn away because I wasn’t worth talking to,” said <mark data-entity="person">Thrun</mark>, now the co-founder and CEO of online higher education startup <mark data-entity="org">Udacity</mark>, in an interview with <mark data-entity="person">Recode</mark> <mark data-entity="date">earlier this week</mark>.<br/><br/>A little less than a decade later, dozens of self-driving startups have cropped up while automakers around the world clamor, wallet in hand, to secure their place in the fast-moving world of fully automated transportation.
          </div>
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
