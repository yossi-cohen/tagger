import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import DocumentListElement from "../../src/components/common/DocumentListElement";

// unit tests for the DocumentListElement component
describe('DocumentListElement component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {document: {}, showDelete: ()=>{}};
      const wrapper = shallow(<DocumentListElement {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
