import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import { App } from "../../src/components/App";

// unit tests for the App component
describe('App component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {dispatch: ()=>{}, documents: []};
      const wrapper = shallow(<App {...props}/>);
      assert.equal(wrapper.length, 1);
    });
  });
});
