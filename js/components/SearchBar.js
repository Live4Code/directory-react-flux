var React = require('react');
var EmployeeAction = require('../actions/EmployeeAction');

var SearchBar = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  _onChange: function(event, value) {
    //setState takes some time
    this.setState({text: event.target.value});
    var text = event.target.value;
    EmployeeAction.searchEmployees(text);
  },

  render: function () {
    return (
      <div className="bar bar-standard bar-header-secondary">
        <input type="search" ref="searchKey" onChange={this._onChange} value={this.state.text}/>
      </div>
    );
  }
});

module.exports = SearchBar;