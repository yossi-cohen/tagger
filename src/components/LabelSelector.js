import React from "react";
import { connect } from "react-redux";
import { DropdownButton, MenuItem } from "react-bootstrap";

// Document add/edit page component
export default class LabelSelector extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    this.state = {
      labels: props.labels,
      label: props.selected
    }
  };

  // render
  render() {
    return (
      <DropdownButton id="labels" title={this.state.label}> {
        this.state.labels.map((label) => {
          return (<MenuItem
            key={label}
            eventKey={label}
            active={this.state.label == label}
            onSelect={(key, e) => this.handleSelectLabel(key, e)}>
            {label}
          </MenuItem>);
        })}
      </DropdownButton>
    );
  }

  handleSelectLabel(key, e) {
    this.setState({ label: key });
  }

  getLabel() {
    return this.state.label;
  }
}

