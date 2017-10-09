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

  // pre-render logic
  componentWillMount() {
    // the first time we load the document, 
    // we need to load also the document text
    const documentId = this.props.params.id;
    if (documentId)
      this.props.dispatch({ type: 'DOCUMENT_GET_TEXT', documentId: documentId });
  }

  // render
  render() {
    const { document, handleSubmit, error, invalid, submitting } = this.props;

    return (
      <div className="page-document-edit">
        <PageHeader><small>
          {(document.id ? 'Edit ' : 'Add ') + 'document'}
        </small></PageHeader>
        <Form horizontal onSubmit={handleSubmit(this.formSubmit)}>
          {/* name */}
          <Field component={FormField} name="name" label="Document Name" doValidate={true} />

          {/* text */}
          <Field component={FormField} name="text" label="Document Text" doValidate={false} componentClass="textarea" placeholder="paste text here..." />

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
          <FormSubmit error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="Saving..." buttonSave="Save" />
        </Form>
      </div>
    );
  }

  // submit the form
  formSubmit(values) {
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'DOCUMENT_ADD_EDIT',
        document: {
          id: values.id || 0,
          name: values.name,
          text: values.text,
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
    if (!values.name)
      errors.name = 'Document Name is required';
    return errors;
  },
})(DocumentEdit);

// export the connected class
function mapStateToProps(state, own_props) {
  const document = state.documents.find(x => x.id ===own_props.params.id) || {};
  return {
    initialValues: document,
    document: document,
  };
}

export default connect(mapStateToProps)(DocumentEditForm);
