'use strict';

var React = require('react/addons');
var TestUtils = require('react/lib/ReactTestUtils');
var History = require('components/History.js');
var AppState = require('components/mockAppState.js');
describe('History', () => {
  var element;
  beforeEach(() => {
    element = TestUtils.renderIntoDocument(<History {...AppState}/>);
  });

  it('renders', () => {
    expect(element).toBeTruthy();
  });

  it('displays list of provided pomodoros', () => {
    var items = TestUtils.scryRenderedDOMComponentsWithTag(element, 'li');
    expect(items.length).toEqual(AppState.history.length);
  });


});
