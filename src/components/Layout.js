'use strict';

var React = require('react');
var Reflux = require('reflux');
var AppStore = require('../stores/AppStore');
var CircularTimer = require('./CircularTimer');
// CSS
require('normalize.css');
require('../styles/main.less');


var {Grid, Row, Col} = require('react-bootstrap');

var Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Route = Router.Route,
  Link = Router.Link;
var ReactBootstrap = require('react-bootstrap'),
  Nav = ReactBootstrap.Nav,
  NavItem = ReactBootstrap.NavItem,
  ListGroup = ReactBootstrap.ListGroup;

var ReactRouterBootstrap = require('react-router-bootstrap'),
  NavItemLink = ReactRouterBootstrap.NavItemLink,
  ButtonLink = ReactRouterBootstrap.ButtonLink,
  ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;

var Layout = React.createClass({
  mixins: [Router.State, Reflux.connect(AppStore), React.addons.LinkedStateMixin],

  render: function() {

    if(this.state.loading){
      return <h1 style={{textAlign:'center',padding:30}}>Loading App Data...</h1>;
    }

    if (this.getPathname() === '/') {
      return (
        <div>
          <div className="container">
            <div style={{textAlign: 'center',padding:20}}>
              <Link to="/">Current Timer</Link> - {' '}
              <Link to="history">History</Link> - {' '}
              <Link to="settings">Settings</Link>
            </div>
            <RouteHandler {...this.state} />
          </div>
        </div>
      );
    }
    // console.log(this.getPathname());
    return (
      <div>
        <div className="container">
          <div style={{textAlign: 'center',padding:20}}>
            <Link to="/">Current Timer</Link> - {' '}
            <Link to="history">History</Link> - {' '}
            <Link to="settings">Settings</Link>
          </div>
          <div className="layout-timer-wrapper">
            <div className="wrapped-view">
              <RouteHandler {...this.state} />
            </div>
            <CircularTimer text={ ''} percentage={(this.state.currentTimer.timeRemaining/this.state.timerTypes[this.state.currentTimer.typeName].duration)*100} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Layout;
