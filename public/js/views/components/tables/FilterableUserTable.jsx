"use strict";

var React = require('react');

// components
var UserSearchBar = require('./UserSearchBar.jsx');
var UserTable = require('./UserTable.jsx');

var FilterableUserTable = React.createClass({
	propTypes:{
		users: React.PropTypes.array.isRequired,
	},

	getInitialState: function() {
		return {
			filter: '',
			filteredRow: 'id',
		};
	},

	handleUserInput: function(value, filteredRow) {
		this.setState({
			filter: value,
			filteredRow: filteredRow,
		});
	},

	render: function() {
		return (
			<div>
				<UserSearchBar filterText={this.state.filterText} handleUserInput={this.handleUserInput} />
				<UserTable users={this.props.users} filter={this.state.filter} filteredRow={this.state.filteredRow} />
			</div>
		);
	},
});

module.exports = FilterableUserTable;
