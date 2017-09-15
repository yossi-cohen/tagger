import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import { DocumentList } from "../../src_documents/components/common/DocumentList";

// unit tests for the DocumentList component
describe('DocumentList component', () => {
  describe('render()', () => {
    it('should render the progressbar', () => {
      const props = {documents: []};
      const wrapper = shallow(<DocumentList {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
