import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import DocumentDeletePrompt from "../../src/components/common/DocumentDeletePrompt";

// unit tests for the DocumentDeletePrompt component
describe('DocumentDeletePrompt component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {show: true, document: {}, hideDelete: ()=>{}, documentDelete: ()=>{}};
      const wrapper = shallow(<DocumentDeletePrompt {...props}/>);
      assert.equal(wrapper.length, 1);
    });
  });
});
