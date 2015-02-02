var HomePage = require('./components/HomePage');
var DetailPage = require('./components/DetailPage');
var Header = require('./components/Header');
var EmployeeWebAPIUtils = require('./utils/EmployeeWebAPIUtils');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
  Link=Router.Link, RouteHandler = Router.RouteHandler, NotFoundRoute = Router.NotFoundRoute;

window.React = React;

EmployeeWebAPIUtils.getEmployees();

var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

var EmployeeApp = React.createClass({
  render: function () {
    return (
      <div>
        <Header text="Employee Directory" back="false"/>
        <RouteHandler />
      </div>
    );
  }
});

var routes = (
  <Route handler={EmployeeApp}>
    <Route name="Detail" handler={DetailPage} path="employees/:id" />
    <DefaultRoute handler={HomePage} />
    <NotFoundRoute handler={NotFound}/>
  </Route>

);

Router.run(routes, function(Handler){
  React.render(<Handler/>, document.getElementById('react'));
});