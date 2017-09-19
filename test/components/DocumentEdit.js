import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import { DocumentEdit } from "../../src/components/DocumentEdit";

// unit tests for the DocumentEdit component
describe('DocumentEdit component', () => {
  describe('render()', () => {
    it('should render the add document form', () => {
      const props = {document: {}, handleSubmit: ()=>{}};
      const wrapper = shallow(<DocumentEdit {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
