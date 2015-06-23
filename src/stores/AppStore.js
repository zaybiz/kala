'use strict';

const Reflux = require('reflux');
const _ = require('lodash');
const Actions = require('../actions/App');
const howler = require('howler');
const initialState = require('components/mockAppState');

import dataStore from './Persistance';

var state = _.cloneDeep(initialState);

var AppStore = Reflux.createStore({
  listenables: Actions,
  devSounds: {
    start: "/audio/crank.wav",
    complete: "/audio/deskbell.wav",
    running: "/audio/tictac.wav"
  },
  electronSounds: {
    start: "audio/crank.wav",
    complete: "audio/deskbell.wav",
    running: "audio/tictac.wav"
  },
  notify(text) {

    //Check config
    if (!state.config.showNotifications) {
      return;
    }
    var notification;
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      // console.log("This browser does not support system notifications");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      notification = new Notification(text);
      setTimeout(notification.close.bind(notification), 4000);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          notification = new Notification(text);
          setTimeout(notification.close.bind(notification), 4000);
        }
      });
    }

  },
  init() {
    // console.log("electron version", process.versions.electron);
    // console.log(dataStore.getDefaultState())
    dataStore.getDefaultState()
      .then((state) => {
        console.log('state from db', state)
        state.loading = false;
        this.setState(state)
        this.onInitTimer();
      })
      .catch((err) => {
        console.log(err)
      })
    this.soundUrls = this.devSounds;
    if (process.versions.electron) {
      this.soundUrls = this.electronSounds;
    }

    let newTimer = this.createCurrentTimer(state.defaultTimerData);
    state.currentTimer = newTimer;
  },
  playStartSound(type) {
    if (!state.config.playStartSound) {
      return;
    }
    this.startSound = new howler.Howl({
      urls: [this.soundUrls.start]
    }).play();
  },
  playRunningSound(type) {
    if (!state.config.playRunningSound) {
      return;
    }
    this.runningSound = new howler.Howl({
      urls: [this.soundUrls.running],
      loop: true
    }).play();
  },
  playCompleteSound(type) {
    if (!state.config.playCompleteSound) {
      return;
    }
    this.startSound = new howler.Howl({
      urls: [this.soundUrls.complete]
    }).play();
  },
  stopRunningSound(type) {
    try {
      this.runningSound.stop();
    } catch (e) {
      // console.log("E", e);
    }
  },
  onStartTimer: function () {
    this.onStopTimer();
    let newTimer = {};
    newTimer.status = 'running';
    newTimer.dateStarted = new Date();
    state.interval = setInterval(this._tick, 1000);
    this.setState({
      currentTimer: newTimer
    });
    this.playStartSound();
    this.playRunningSound();
  },
  onRestartTimer: function () {
    this.onStopTimer();
    let newTimer = this.createCurrentTimer(state.currentTimer);
    newTimer.dateStarted = new Date();
    this.setState({
      currentTimer: newTimer
    });
    this.onStartTimer();

  },
  onCancelTimer: function () {

    let newTimer = this.createCurrentTimer(state.currentTimer);
    // newtimer
    this.setState({
      currentTimer: newTimer
    });
    this.onStopTimer();
  },
  onStopTimer: function () {
    this.removeInterval();
    this.setState({
      currentTimer: {
        status: 'stopped',
      },
    });
    // this.playCancelledSound();
    this.stopRunningSound();
  },
  onInitTimer() {
    this.onStopTimer();
    let newTimer = this.createCurrentTimer(state.newTimerData);
    this.setState({
      currentTimer: newTimer
    });

  },
  onInitAndStartTimer() {
    this.onStopTimer();
    this.onInitTimer();
    this.onStartTimer();

  },
  onCompleteTimer: function () {
    let sanitizedTimer = this.sanitizeTimer(state.currentTimer);
    state.history.push(sanitizedTimer);
    this.onStopTimer();

    this.setState({
      currentTimer: {
        status: 'complete',
      },
    });
    this.playCompleteSound();
    this.stopRunningSound();
    this.notify('Timer (' + state.currentTimer.typeName + ') complete');
  },
  onSetNewTimerData(timerData) {
    // console.log('newTimerDataSet', timerData);
    this.setState({
      newTimerData: timerData
    });
  },
  onSetCurrentTimerData(timerData) {
    // console.log('newTimerDataSet', timerData);
    this.onStopTimer();
    let newTimer = this.createCurrentTimer(timerData);
    this.setState({
      currentTimer: newTimer
    });
  },
  onUpdateConfig(config) {
    // console.log('newTimerDataSet', timerData);
    // this.onStopTimer();
    // let newTimer = this.createCurrentTimer(timerData);
    this.setState({
      config: config
    });
  },
  createCurrentTimer(timerData) {
    let timerType = state.timerTypes[timerData.typeName];
    timerData.status = 'init';
    timerData.timeRemaining = timerType.duration;
    return timerData;
  },
  startTimerWithData(timerData) {
    let timerType = state.timerTypes[timerData.typeName];
    timerData.status = 'init';
    timerData.timeRemaining = timerData.timeRemaining || timerType.duration;
    timerData.dateStarted = timerData.dateStarted || Date.now();
    return timerData;
  },
  sanitizeTimer(timer) {
    let sanitizedTimer = {
      title: timer.title,
      typeName: timer.typeName,
      dateStarted: timer.dateStarted,
    };

    return sanitizedTimer;
  },
  removeInterval() {
    clearInterval(state.interval);
    delete state.interval;
    this.setState(state);
  },
  _tick: function () {
    console.log('ticked');
    var currentTime = state.currentTimer.timeRemaining;
    if (currentTime === 0) {
      this.onCompleteTimer();
    } else {
      this.setState({
        currentTimer: {
          timeRemaining: state.currentTimer.timeRemaining - 1
        },
      });
      console.log(state.currentTimer.timeRemaining);
    }
  },
  getInitialState() {
    return {
      loading: true
    };
    // return state;
  },
  persistState() {
    dataStore.persist(state)
  },
  setState: function (newState) {
    _.merge(state, newState, {
      initialized: true
    });
    this.persistState();
    this.trigger(state);
  },
  getState: function () {
    return state;
  },
  resetState: function () {
    state = _.cloneDeep(initialState);
  }

});

module.exports = AppStore;
