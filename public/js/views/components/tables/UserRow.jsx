"use strict";

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var UserRow = React.createClass({
	mixins: [PureRenderMixin],
	propTypes:{
		user: React.PropTypes.object.isRequired,
	},
	render: function() {
		return (
			<tr>
				<td className='h4'><span className='cl-effect-1'><a href={'users/' + this.props.user.id}>{this.props.user.firstname}</a></span></td>
				<td className='h4'>{this.props.user.lastname}</td>
				<td className='h4'>{this.props.user.email}</td>
			</tr>
		);
	},
});

module.exports = UserRow;
