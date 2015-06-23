'use strict';

var React = require('react/addons');
var TestUtils = require('react/lib/ReactTestUtils');
var Timer = require('components/Timer.js');
var mockAppState = require('components/mockAppState');
describe('Timer', () => {
  var element;
  beforeEach(() => {
    element = TestUtils.renderIntoDocument(<Timer {...mockAppState} />);
  // element = TestUtils.renderIntoDocument(<Timer {...mockAppState.currentTimer} newTimerData={mockAppState.newTimerData} timerTypes={mockAppState.timerTypes} />);
  });

  it('renders', () => {
    expect(element).toBeTruthy();
  });

  describe('Current timer section', () => {

    it('displays the title', () => {
      var title = TestUtils.findRenderedDOMComponentWithClass(element, 'timer-title');
      expect(title.getDOMNode().textContent).toEqual(mockAppState.currentTimer.title.toString());
    });

    it('displays the type', () => {
      var title = TestUtils.findRenderedDOMComponentWithClass(element, 'timer-type');
      expect(title.getDOMNode().textContent).toEqual(mockAppState.currentTimer.typeName.toString());
    });

    it('displays the status', () => {
      var title = TestUtils.findRenderedDOMComponentWithClass(element, 'timer-status');
      expect(title.getDOMNode().textContent).toEqual(mockAppState.currentTimer.status.toString());
    });
  });

  xdescribe('New timer section', () => {
    it('displays a list of timer types', () => {
      var timeRemaining = TestUtils.findRenderedDOMComponentWithClass(element, 'timer-timeRemaining');
      expect(timeRemaining.getDOMNode().textContent).toEqual(mockAppState.currentTimer.timeRemaining.toString());
    });


  });
});
