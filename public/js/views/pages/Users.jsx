"use strict";

var React = require('react');

// components
var FilterableUserTable = require('../components/tables/FilterableUserTable.jsx');

function getUserState() {
	return {
		users: UsersStore.getAllUsers(),
	};
}
var Users = React.createClass({
	getInitialState: function() {
		return getUserState();
	},
	componentWillMount: function() {
		UsersStore.addChangeListener(this._onChange);
		UsersActions.populate();
	},
	componentWillUnmount: function() {
		UsersStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getUserState());
	},
	render: function() {
		if (this.state.users) {
			return (
				<FilterableUserTable users={this.state.users} />
			);
		}
		else {
			// TODO loading animation...
			return (
				<div></div>
			);
		}
	},
});

module.exports = Users;
