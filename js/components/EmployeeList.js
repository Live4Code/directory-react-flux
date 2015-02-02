var React = require('react');
var EmployeeStore = require('../stores/EmployeeStore');
var EmployeeListItem = require('./EmployeeListItem');

function getStateFromStores(){
  return {
    employees: EmployeeStore.getEmployees()
  }
}

var EmployeeList = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    EmployeeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    EmployeeStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var items = this.state.employees.map(function (employee) {
      return (
        <EmployeeListItem key={employee.id} employee={employee} />
      );
    });
    return (
      <ul className="table-view">
        {items}
      </ul>
    );
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = EmployeeList;