import React from "react";
import {
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";

// Search component
export default class Search extends React.Component {
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
