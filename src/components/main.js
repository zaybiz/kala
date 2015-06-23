'use strict';

var Timer = require('./Timer');
var Settings = require('./Settings');
var Layout = require('./Layout');
var History = require('./History');
var React = require('react');
var {Route, Redirect, RouteHandler, DefaultRoute, NotFoundRoute} = require('react-router');
var Router = require('react-router');

var content = document.getElementById('content');

var Routes = (
<Route name='app' handler={Layout} path='/'>
  <Route name="settings" handler={Settings}/>
  <Route name="history" handler={History}/>
  <DefaultRoute handler={Timer} />
</Route>
);

Router.run(Routes, function(Handler) {
  React.render(<Handler/>, content);
});
