var EmployeeDispatcher = require('../dispatcher/EmployeeDispatcher');
var EmployeeConstants = require('../constants/EmployeeConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = EmployeeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var employees = [];
var currentEmployees = [];

var EmployeeStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  findById: function (id) {
    var employee = null;
    var l = employees.length;
    for (var i = 0; i < l; i++) {
      if (employees[i].id == id) {
        employee = employees[i];
        break;
      }
    }
    return employee;
  },

  findByName: function (searchKey) {
    var results;
    if (searchKey.trim()){
      results = employees.filter(function (element) {
        var fullName = element.firstName + " " + element.lastName;
        return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
      });      
    } else {
      results = employees;
    }

    return results;
  },

  findByManager: function (managerId) {
    var results = employees.filter(function (element) {
      return managerId === element.managerId;
    });
    return results;
  },

  getEmployees: function(){
    return currentEmployees;
  }

});

EmployeeStore.dispatchToken = EmployeeDispatcher.register(function(payload){

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_EMPLOYEES:
      employees = action.employees;
      currentEmployees = employees;
      EmployeeStore.emitChange();
      break;

    case ActionTypes.SEARCH_EMPLOYEES_BY_NAME:
      var searchKey = action.searchKey;
      currentEmployees = EmployeeStore.findByName(searchKey);
      EmployeeStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EmployeeStore;