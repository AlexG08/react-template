"use strict";

var React = require('react');

var UserSearchBar = React.createClass({
	propTypes:{
		handleUserInput: React.PropTypes.func.isRequired,
	},

	getInitialState: function() {
		return {
			filter: '',
			selected: 'id',
		};
	},

	_inputChange: function(e) {
		this.setState({ filter: e.target.value });
		this.props.handleUserInput(e.target.value, this.state.selected);
	},
	_selectChange: function(e) {
		this.setState({ selected: e.target.value });
		this.props.handleUserInput(this.state.filter, e.target.value);
	},
	render: function() {
		return (
			<form>
                <input type="text" onChange={this._inputChange} value={this.state.filter} placeholder="Search..." />
                <select onChange={this._selectChange}>
                	<option value='id' >Id</option>
					<option value='firstname' >Firstname</option>
					<option value='lastname' >Lastname</option>
					<option value='email' >Email</option>
					<option value='right' >Right</option>
					<option value='created_at' >Created_at</option>
					<option value='updated_at' >Updated_at</option>
                </select>
            </form>
		);
	},
});

module.exports = UserSearchBar;
