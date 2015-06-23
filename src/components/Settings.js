'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Input = require('react-bootstrap').Input;
// var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/App');




var PomoSettings = React.createClass({
  handleSettingsChange() {
    AppActions.updateConfig({
      playRunningSound: this.refs.playRunningSound.getChecked(),
      playCompleteSound: this.refs.playCompleteSound.getChecked(),
      playStartSound: this.refs.playStartSound.getChecked(),
      showNotifications: this.refs.showNotifications.getChecked()
    });

  },
  render: function() {
    return (
      <div className='main'>
        <h5>Settings</h5>
        <Input ref="playRunningSound" onChange={this.handleSettingsChange} type="checkbox" label="Play running sound" defaultChecked={this.props.config.playRunningSound} />
        <Input ref="playCompleteSound" onChange={this.handleSettingsChange} type="checkbox" label="Play complete sound" defaultChecked={this.props.config.playCompleteSound} />
        <Input ref="playStartSound" onChange={this.handleSettingsChange} type="checkbox" label="Play Start sound" defaultChecked={this.props.config.playStartSound} />
        <Input ref="showNotifications" onChange={this.handleSettingsChange} type="checkbox" label="Display Desktop Notifications" defaultChecked={this.props.config.showNotifications} />
      </div>
    );
  }
});

module.exports = PomoSettings;
