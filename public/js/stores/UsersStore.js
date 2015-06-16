"use strict";

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var deepCopy = require('react/addons').addons.update;
var _ = require('underscore');

// constants
var AppConstants = require('../constants/AppConstants');
var CHANGE_EVENT = 'change';

var _users = {};

var UsersStore = assign({}, EventEmitter.prototype, {
	getAllUsers: function() {
		var result = [];
		_.mapObject(_users, function(user) {
			result.push(user);
		});
		return result;
	},
	getUser: function(id) {
		return deepCopy(_users[id], {});
	},
	populate: function(users) {
		if (_.isArray(users)) {
			_users = users.reduce(function(carry, user) {
				carry[user.id] = user;
				return carry;
			}, _users);
		}
		else {
			_users[users.id] = users;
		}
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
});

module.exports = UsersStore;

// Register callback to handle all update
AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case AppConstants.USERS.POPULATE: {
			UsersStore.populate(action.users.data);
			UsersStore.emitChange();
			break;
		}

		case AppConstants.USERS.DELETE: {
			delete _users[action.userId];
			UsersStore.emitChange();
			break;
		}
	}
});
