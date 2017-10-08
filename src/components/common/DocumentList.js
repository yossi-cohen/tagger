import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import DocumentListElement from "./DocumentListElement";
import DocumentDeletePrompt from "./DocumentDeletePrompt";
import { Table, Pagination, ProgressBar } from "react-bootstrap";

// Document list component
export class DocumentList extends React.Component {
  // constructor
  constructor(props) {
    super(props);

    // default ui local state
    this.state = {
      pageSize: 10,
      sortBy: 'name',
      order: 'asc',
      delete_show: false,
      delete_document: {},
    };

    // bind <this> to the event method
    this.changePage = this.changePage.bind(this);
    this.showDelete = this.showDelete.bind(this);
    this.hideDelete = this.hideDelete.bind(this);
    this.documentDelete = this.documentDelete.bind(this);
  }

  // pre-render logic
  componentWillMount() {
    // the first time we load, we need that documents list
    this.fetchPage(this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.page != nextProps.page) {
      this.fetchPage(nextProps);
    }
  }

  fetchPage(props) {
    const { page, tags } = props;

    props.dispatch({
      type: 'DOCUMENTS_FETCH_LIST',
      page: page,
      pageSize: this.state.pageSize,
      sortBy: this.state.sortBy,
      order: this.state.order,
      tags: tags,
    });
  }

  // render
  render() {
    // pagination
    const { documents, page, paging } = this.props;
    const pages = Math.ceil(paging.total / this.state.pageSize);

    // show the loading state while we wait for the app to load
    if (!this.props.documents || !pages) {
      return (
        <ProgressBar active now={100} />
      );
    }
    
    // show the list of documents
    return (
      <div>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Document Name</th>
              <th>Entities</th>
              <th>Relations</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => {
              return (
                <DocumentListElement key={index} document={document} showDelete={this.showDelete} />
              );
            })}
          </tbody>
        </Table>

        <Pagination className="documents-pagination pull-right" bsSize="medium" maxButtons={10} first last next
          prev boundaryLinks items={pages} activePage={page} onSelect={this.changePage} />

        <DocumentDeletePrompt show={this.state.delete_show} document={this.state.delete_document}
          hideDelete={this.hideDelete} documentDelete={this.documentDelete} />
      </div>
    );
  }

  // change the document lists' current page
  changePage(page) {
    this.props.dispatch(push('/?page=' + page));
  }

  // show the delete document prompt
  showDelete(document) {
    // change the local ui state
    this.setState({
      delete_show: true,
      delete_document: document,
    });
  }

  // hide the delete document prompt
  hideDelete() {
    // change the local ui state
    this.setState({
      delete_show: false,
      delete_document: {},
    });
  }

  // delete the document
  documentDelete() {
    // delete the document
    this.props.dispatch({
      type: 'DOCUMENTS_DELETE',
      documentId: this.state.delete_document.id,
    });

    // hide the prompt
    this.hideDelete();
  }
}

// export the connected class
function mapStateToProps(state) {
  // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
  // react-router-redux wants you to get the url data by passing the props through a million components instead of
  // reading it directly from the state, which is basically why you store the url data in the state (to have access to it)
  const page = Number(state.routing.locationBeforeTransitions.query.page) || 1;

  return {
    documents: state.documents,
    tags: state.tags,
    paging: state.paging,
    page: page,
  };
}

export default connect(mapStateToProps)(DocumentList);
