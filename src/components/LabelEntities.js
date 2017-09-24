import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { PageHeader, Panel, DropdownButton, MenuItem, Button } from "react-bootstrap";
import LabelSelector from './LabelSelector';
import config from '../config/config';

// Label Entities component
export class LabelEntities extends React.Component {
  // constructor
  constructor(props) {
    super(props);
  }

  // pre-render logic
  componentWillMount() {
    // the first time we load the document, we need that tokens list
    if (!this.props.document.tokens)
      this.props.dispatch({ type: 'DOCUMENT_GET_TOKENS', document: this.props.document });
  }

  // render
  render() {
    const { document, handleSubmit, error, invalid, submitting } = this.props;
    const tokens = document.tokens ? document.tokens : [];
    const labels = config.labels;

    return (
      <div className="page-label-entities">
        <PageHeader>
          <small>
            {'Entities: ' + (document.documentName ? document.documentName : '(undefined)')}
          </small>
          <div>
            <LabelSelector ref="labelSelector" labels={labels} selected='person' />
            &nbsp;
            <Button disabled>Download Labels</Button>
          </div>
        </PageHeader>

        <Panel>
          <div className="entities">
            {
              tokens.map((token, index) => {
                return (
                  <mark
                    key={index}
                    data-entity={token.label && token.label != 'NA' ? token.label : undefined}>
                    <span onClick={(e) => this.handleTokenClick(e, index)}>{token.token} </span>
                  </mark>);
              })
            }
          </div>
        </Panel>

      </div>
    );
  }

  handleTokenClick(e, index) {
    if (e.ctrlKey) {

      let label = this.refs.labelSelector.getLabel();
      let token = this.props.document.tokens[index];

      // clear label?
      if (token.label == label)
        label = 'NA'; // remove last label
      // else - modify to new label

      this.props.dispatch({
        type: 'DOCUMENT_SET_TOKEN_LABEL',
        token: token,
        label: label
      });
    }
  }
}

// export the connected class
function mapStateToProps(state, own_props) {
  const document = state.documents.find(x => Number(x.id) === Number(own_props.params.id)) || {};
  return {
    document: document,
  };
}

export default connect(mapStateToProps)(LabelEntities);
