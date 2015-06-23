'use strict';

var React = require('react/addons');
var TestUtils = require('react/lib/ReactTestUtils');
var Settings = require('components/Settings.js');
var AppState = require('components/mockAppState.js');
describe('Settings', () => {
  var element;
  beforeEach(() => {
    element = TestUtils.renderIntoDocument(<Settings {...AppState}/>);
  });

  it('renders', () => {
    expect(element).toBeTruthy();
  });

});
