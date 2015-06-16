"use strict";

var React = require('react');
var _ = require('underscore');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

// components
var UserRow = require('./UserRow.jsx');

var UserTable = React.createClass({
	mixins: [PureRenderMixin],
	propTypes: {
		users: React.PropTypes.array.isRequired,
		filter: React.PropTypes.string,
		filteredRow: React.PropTypes.string,
	},

	render: function() {
		return (
			<table className='table table-striped'>
				<thead>
					<tr>
						<th className='h3'>firstname</th>
						<th className='h3'>lastname</th>
						<th className='h3'>email</th>
						<th className='h3'>right</th>
					</tr>
				</thead>
				<tbody className='table-striped'>
					{this._populate()}
				</tbody>
			</table>
		);
	},

	_populate: function() {
		var rows = [];
		_.map(this.props.users, function(user) {
			if (this.props.filter && this.props.filteredRow) {
				if (this.props.filteredRow == 'id') {
					if (user.id != this.props.filter && this.props.filter != '') {
						return;
					}
				}
				else if (user[this.props.filteredRow].indexOf(this.props.filter) === -1) {
					return;
				}
			}
			rows.push(<UserRow user={user} key={user.id} />);
		}.bind(this));
		return rows;
	},
});

module.exports = UserTable;
