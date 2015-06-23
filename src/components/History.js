'use strict';

const React = require('react/addons');
const moment = require('moment');

var History = React.createClass({
  getPomos(){
    let history = this.props.pomos;
    // if(this.state.onlyToday){

    // }
    return this.props.history.slice().reverse().map((pomo, i) => {
      return (
        <li key={pomo.title+Math.random()}>
          {pomo.title}/
          <small>{pomo.typeName} </small>
          <small> {moment(pomo.dateStarted).startOf('second').fromNow()}  </small>
        </li>
      );
    });
  },
  render() {
    //Reverse to show latest first
    var pomos = this.getPomos();
    // var pomos = "";
    return (

      <div className='history '>
        <h5>History</h5>
        <ul>
          {pomos}
        </ul>
      </div>
    );
  }
});

module.exports = History;
