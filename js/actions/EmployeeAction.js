var EmployeeDispatcher = require('../dispatcher/EmployeeDispatcher');
var EmployeeConstants = require('../constants/EmployeeConstants');

var ActionTypes = EmployeeConstants.ActionTypes;

module.exports = {

  receiveAll: function(employees) {
    EmployeeDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_EMPLOYEES,
      employees: employees
    });
  },

  searchEmployees: function(searchKey) {
    EmployeeDispatcher.handleViewAction({
      type: ActionTypes.SEARCH_EMPLOYEES_BY_NAME,
      searchKey: searchKey
    });    
  }

};