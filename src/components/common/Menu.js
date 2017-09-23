import React from "react";
import { Nav, NavItem, Glyphicon } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import Filter from './Filter';
import Search from './Search';

// Menu component
export default class Menu extends React.Component {
  // render
  render() {
    return (
      <Nav bsStyle="pills">
        <IndexLinkContainer to="/">
          <NavItem>
            Home
            </NavItem>
        </IndexLinkContainer>
        <LinkContainer to="/document-edit">
          <NavItem>
            Add Document <Glyphicon glyph="plus-sign" />
          </NavItem>
        </LinkContainer>
        <NavItem>
          <Filter />
        </NavItem>
        <NavItem>
          <Search autoFocus={true} />
        </NavItem>
      </Nav>
    );
  }
}
