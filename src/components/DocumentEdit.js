import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Field, SubmissionError, reduxForm } from "redux-form";
import FormField from "./common/FormField";
import FormSubmit from "./common/FormSubmit";
import DocumentTags from './common/DocumentTags';
import {
  PageHeader,
  Form,
  FormGroup,
  FormControl,
  HelpBlock,
  Row,
  Col
} from "react-bootstrap";

// Document add/edit page component
export class DocumentEdit extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    this.state = {
      tagsSuggestions: [] //lilo:TODO - read from backend
    };

    // bind <this> to the event method
    this.formSubmit = this.formSubmit.bind(this);
  }

  // render
  render() {
    const { document, handleSubmit, error, invalid, submitting } = this.props;
    return (
      <div className="page-document-edit">
        <PageHeader><small>
          {'Document ' + (document.id ? 'edit' : 'add')}
        </small></PageHeader>
        <Form horizontal onSubmit={handleSubmit(this.formSubmit)}>
          {/* name */}
          <Field component={FormField} name="documentName" label="Document Name" doValidate={true} />

          {/* text */}
          <Field component={FormField} name="documentText" label="Document Text" doValidate={false} componentClass="textarea" placeholder="paste text here..." />

          {/* tags */}
          <FormGroup>
            <Row>
              <Col sm={3}>{'Document Tags'}</Col>
              <Col sm={9}>
                <DocumentTags 
                  ref="documentTags"
                  tags={document.tags} 
                  suggestions={this.state.tagsSuggestions} />
              </Col>
            </Row>
          </FormGroup>

          {/* submit */}
          <FormSubmit error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="Saving..." buttonSave="Save Document" />
        </Form>
      </div>
    );
  }

  // submit the form
  formSubmit(values) {
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'DOCUMENTS_ADD_EDIT',
        document: {
          id: values.id || 0,
          documentName: values.documentName,
          documentText: values.documentText,
          tags: this.refs.documentTags.tags(),
        },
        callbackError: (error) => {
          reject(new SubmissionError({ _error: error }));
        },
        callbackSuccess: () => {
          dispatch(push('/'));
          resolve();
        }
      });
    });
  }
}

// decorate the form component
const DocumentEditForm = reduxForm({
  form: 'document_edit',
  validate: function (values) {
    const errors = {};
    if (!values.documentName) {
      errors.documentName = 'Document Name is required';
    }
    return errors;
  },
})(DocumentEdit);

// export the connected class
function mapStateToProps(state, own_props) {
  const document = state.documents.find(x => Number(x.id) === Number(own_props.params.id)) || {};
  return {
    document: document,
    initialValues: document,
  };
}
export default connect(mapStateToProps)(DocumentEditForm);
