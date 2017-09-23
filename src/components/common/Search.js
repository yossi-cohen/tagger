import React from "react";
import {
  Form,
  FormGroup,
  FormControl,
  HelpBlock,
  FieldGroup
} from "react-bootstrap";

// Search component
export default class Search extends React.Component {
  // constructor
  constructor(props) {
    super(props);
  }

  // render
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId='formControlsText'>
          <FormControl type="text" placeholder="search" />
        </FormGroup>
      </Form>
    );
  }
}
