'use strict';

var React = require('react/addons');
var FontAwesome = require('react-fontawesome');
var AppActions = require('../actions/App');
var Select = require('react-select');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var _ = require('lodash');

var CircularTimer = require('./CircularTimer');


var Timer = React.createClass({
  handleTypeNameChange(e) {
    var typeName = e.target.value;
    console.log("Selected: " + typeName);
    let data = {
      typeName: typeName,
    };
    AppActions.setNewTimerData(data);
  },
  getFormattedTimeRemaining() {
    return this.formatTime(this.props.currentTimer.timeRemaining);
  },
  formatTime(time) {
    let secs = Math.round(time);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    var sec = obj.s, hr,
      min = obj.m;
    if (obj.s < 10) {
      sec = '0' + obj.s;
    }
    if (obj.m < 10) {
      min = '0' + obj.m;
    }

    let formattedTimeRemaining = min + ':' + sec;
    // let formattedTimeRemaining = obj.h + ':' + min + ':' + sec;
    return formattedTimeRemaining;
  },
  handleTitleChange(e) {
    console.log("handleTitleChange", e);
    let data = {
      title: e.target.value,
    };
    AppActions.setNewTimerData(data);
  },
  timerTypeStartButtons() {
    let btns = _.map(this.props.timerTypes, (type, i) => {
      return {
        value: type.typeName,
        label: type.title
      };
    });
    return btns;
  },
  timerTypeOptions() {
    let options = _.map(this.props.timerTypes, (type, i) => {
      return {
        value: type.typeName,
        label: type.title
      };
    });
    return options;
  },
  render: function() {
    var startButton = (this.props.currentTimer.status === 'init') ? <Button bsStyle='primary' onClick={AppActions.startTimer} className="timer-start btn-">
                                                                      <FontAwesome name='play' /> {' '} Start
                                                                    </Button> : "";
    var restartButton = (this.props.currentTimer.status === 'complete' || this.props.currentTimer.status === 'stopped') ? <Button bsStyle='success' onClick={AppActions.restartTimer} className="timer-restart">
                                                                                                                            <FontAwesome name='repeat' /> {' '} Do Again
                                                                                                                          </Button> : "";
    var cancelButton = (this.props.currentTimer.status === 'running') ? <Button bsStyle='danger' onClick={AppActions.cancelTimer} className="timer-cancel">
                                                                          <FontAwesome name='close' /> {' '} Cancel
                                                                        </Button> : "";

    var pauseButton;
    // pauseButton = (this.props.currentTimer.status === 'running' && this.props.allowPause) ? <Button onClick={AppActions.pauseTimer} className="timer-pause">Pause</Button> : "";
    var title = this.props.currentTimer.title || "No title";

    var options = _.map(this.timerTypeOptions(), (option) => {
      return <option key={option.value} value={option.value}>{option.label} </option>;
    });

    var typeNameSelect = <Input onChange={this.handleTypeNameChange} type='select' label='Timer Type'> {options}
                         </Input>;
    return (
      <div className="timer section">
        <div className="timer-current">
          <div className="timer-circular-display">
            <div className="details">
              <div> <small>Title </small> <em className="timer-title">{title}</em></div>
            </div>
            <small className="timer-total">
                                                                                                                                                                                                                                                    /{this.formatTime(this.props.timerTypes[this.props.currentTimer.typeName].duration)} (<em className="timer-type">{this.props.currentTimer.typeName}</em>)
                                                                                                                                                                                                                                                  </small>
            <CircularTimer text={this.getFormattedTimeRemaining()} percentage={(this.props.currentTimer.timeRemaining/this.props.timerTypes[this.props.currentTimer.typeName].duration)*100} />
            <div className="timer-buttons">
              {startButton} {restartButton} {cancelButton} {pauseButton}
              <div> <small>Status </small> <em className="timer-status">{this.props.currentTimer.status}</em></div>
            </div>
          </div>
          <div className="stats">
            <Input addonBefore={typeNameSelect} addonAfter={<Button bsStyle='primary' ref="newTimerDataStartBtn" onClick={AppActions.initAndStartTimer} className="timer-start">Start</Button>} placeholder="Task Title" ref="newTimerDataTitle" onChange={this.handleTitleChange} type="text" value={this.props.newTimerData.title} label="Start New Task..." className="task-title" />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Timer;
