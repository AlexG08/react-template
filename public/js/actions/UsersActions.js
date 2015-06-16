"use strict";

var BaseActions = require('./BaseActions');
var extend = require('extend');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var UsersActions = extend({}, BaseActions, {
	populate: function() {
		this.get('users').then(function(users) {
			AppDispatcher.dispatch({
				actionType: AppConstants.USERS.POPULATE,
				users: users,
			});
		});
	},
	editUser: function(user) {
		this.put('users', {
			url: '/api/users/' + user.id,
			user: user,
		}).then(function(updatedUser) {
			var users = {};
			users.data = updatedUser;
			AppDispatcher.dispatch({
				actionType: AppConstants.USERS.POPULATE,
				users: users,
			});
		});
	},
	createUser: function(user) {
		this.post('users', {
			user: user,
		}).then(function(createdUser) {
			var users = {};
			users.data = createdUser;
			AppDispatcher.dispatch({
				actionType: AppConstants.USERS.POPULATE,
				users: users,
			});
		});
	},
	deleteUser: function(userId) {
		this.delete('users', {
			url: '/api/users/' + userId,
		}).then(function() {
			AppDispatcher.dispatch({
				actionType: AppConstants.USERS.DELETE,
				userId: userId,
			});
		});
	},
	changePassword: function(credential) {
		this.put('credential', {
			url: '/api/credential/' + credential.id,
			credential: credential,
		}).then(function() {
		});
	},
});

module.exports = UsersActions;
