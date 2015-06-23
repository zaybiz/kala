'use strict';

var Reflux = require('reflux');

var AppActionCreators = Reflux.createActions([
  'initAndStartTimer',
  'startTimer',
  'restartTimer',
  'cancelTimer',
  'pauseTimer',
  'stopTimer',
  'updateConfig',
  'setNewTimerData'
]);


module.exports = AppActionCreators;
