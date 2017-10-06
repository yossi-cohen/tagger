import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import LabelSelector from './LabelSelector';
import config from '../config/config';
import {
  PageHeader,
  Panel,
  DropdownButton,
  MenuItem,
  Button,
  OverlayTrigger,
  Tooltip,
  ProgressBar
} from "react-bootstrap";

// Label Entities component
export class LabelEntities extends React.Component {
  // constructor
  constructor(props) {
    super(props);
  }

  // pre-render logic
  componentWillMount() {
    // the first time we load the document, we need that tokens list
    this.props.dispatch({ type: 'DOCUMENT_GET_TOKENS', documentId: this.props.params.id });
  }

  // render
  render() {
    const { document } = this.props;
    const tokens = document.tokens ? document.tokens : [];
    const labels = config.labels;

    // show the loading state while we wait for the tokens to load
    if (!tokens.length) {
      return (
        <ProgressBar active now={100} />
      );
    }

    const tooltip = (
      <Tooltip id="tooltip">
        ctrl-click on a tokens to <strong>set</strong> label.
        <br />
        ctrl-click again to <strong>delete</strong> label.
      </Tooltip>
    );

    return (
      <div className="page-label-entities">
        <PageHeader>
          <small>
            {'Entities: ' + (document.name ? document.name : '(undefined)')}
          </small>
          <div>
            <LabelSelector ref="labelSelector" labels={labels} selected='person' />
            &nbsp;
            <Button disabled>Download Labels</Button>
          </div>
        </PageHeader>
        <OverlayTrigger overlay={tooltip} placement='top'>
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
        </OverlayTrigger>

      </div>
    );
  }

  handleTokenClick(e, index) {
    if (e.ctrlKey) {

      let label = this.refs.labelSelector.getLabel();
      let token = this.props.document.tokens[index];

      // clear label?
      if (token.label === label)
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
  const document = state.documents.find(x => x.id == own_props.params.id) || {};
  return {
    document: document,
  };
}

export default connect(mapStateToProps)(LabelEntities);
