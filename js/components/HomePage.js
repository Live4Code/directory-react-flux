var React = require('react');
var SearchBar = require('./SearchBar');
var EmployeeList = require('./EmployeeList');


var HomePage = React.createClass({
  render: function () {
    return (
      <div>
        <SearchBar/>
        <div className="content">
          <EmployeeList/>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;