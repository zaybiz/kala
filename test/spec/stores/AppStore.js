'use strict';
var TestUtils = require('react/lib/ReactTestUtils');

describe('AppStore', () => {
  var store;

  beforeEach(() => {
    store = require('stores/AppStore.js');
  });

  afterEach(() => {
    store = require('stores/AppStore.js');
    store.resetState();
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });


  describe('Timer', () => {
    it('.onSetNewTimerData() should update `newTimerData`', () => {
      let initNewTimerData = {
        title: "An important task",
        typeName: "pomodoro"
      };
      store.onSetNewTimerData(initNewTimerData);
      let updatedNewTimerData = store.getState().newTimerData;
      let expectedData = {
        title: initNewTimerData.title,
        typeName: initNewTimerData.typeName,
      };
      expect(updatedNewTimerData).toEqual(expectedData);
    });

    it('.sanitizeTimer() should only return relevant timer data', () => {
      let originalTimer = store.getState().currentTimer;
      let sanitizedTimer = store.sanitizeTimer(originalTimer);
      let expectedData = {
        title: store.getState().currentTimer.title,
        typeName: store.getState().currentTimer.typeName,
        dateStarted: store.getState().currentTimer.dateStarted,
      };
      expect(sanitizedTimer).toEqual(expectedData);
    });

    it('.createCurrentTimer() should return a properly formed `currentTimer`', () => {
      let timerTypeName = 'pomodoro';
      let timerType = store.getState().timerTypes[timerTypeName];

      let title = 'test title';
      let timerData = {
        title: title,
        typeName: timerTypeName
      };
      let newCurrentTimer = store.createCurrentTimer(timerData);
      let dateStarted = Date.now();
      let expectedData = {
        status: 'init',
        timeRemaining: timerType.duration,
        title: title,
        typeName: timerTypeName,
        dateStarted: dateStarted
      };
      expect(newCurrentTimer.status).toEqual(expectedData.status);
      expect(newCurrentTimer.timeRemaining).toEqual(expectedData.timeRemaining);
      expect(newCurrentTimer.typeName).toEqual(expectedData.typeName);
      expect(newCurrentTimer.title).toEqual(expectedData.title);
    });

    it('can initiate a new timer', () => {
      let newTimerData = store.getState().newTimerData;
      store.onInitTimer();
      expect(store.getState().currentTimer.status).toEqual('init');
      expect(store.getState().currentTimer.title).toEqual(newTimerData.title);
      expect(store.getState().interval).toBeUndefined();
    // store.getState();
    });

    it('is initiated with no interval and a status of init', () => {
      expect(store.getState().currentTimer.status).toEqual('init');
      expect(store.getState().interval).toBeUndefined();
    });

    it('can start the current timer', () => {
      let timerData = {
        title: "test",
        timeRemaining: 23,
        type: 'pomo'

      };
      store.onStartTimer(timerData);
      expect(store.getState().currentTimer.status).toEqual('running');
      expect(store.getState().interval).toBeDefined();
    });

    describe('a running timer', () => {
      var store;

      beforeEach(() => {
        store = require('stores/AppStore.js');
        let timerData = {
          title: "test",
          timeRemaining: 23,
          type: 'pomo'

        };
        store.onStartTimer(timerData);

      });

      afterEach(() => {
        store = require('stores/AppStore.js');
        store.resetState();
      });

      it('can be stopped', () => {
        expect(store.getState().currentTimer.status).toEqual('running');
        expect(store.getState().interval).toBeDefined();
        store.onStopTimer();
        expect(store.getState().interval).toBeUndefined();
        expect(store.getState().currentTimer.status).toEqual('stopped');
      });

      it('can be completed', () => {
        expect(store.getState().currentTimer.status).toEqual('running');
        expect(store.getState().interval).toBeDefined();
        store.onCompleteTimer();
        expect(store.getState().interval).toBeUndefined();
        expect(store.getState().currentTimer.status).toEqual('complete');
      });

      it('adds current timer to history when completed', () => {
        expect(store.getState().history.length).toEqual(2);
        expect(store.getState().currentTimer.status).toEqual('running');
        expect(store.getState().interval).toBeDefined();
        store.onCompleteTimer();
        expect(store.getState().interval).toBeUndefined();
        expect(store.getState().currentTimer.status).toEqual('complete');
        expect(store.getState().history.length).toEqual(3);
      });


    });
  });
});
