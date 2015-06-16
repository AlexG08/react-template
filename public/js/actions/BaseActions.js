"use strict";

var Gatherer = require('../webAppUtils/Gatherer');

// component
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var BaseActions = {
	dispatchError: function(error) {
		var errorObj = JSON.parse(error.message).error;
		if (errorObj.status != 405) {
			AppDispatcher.dispatch({
				actionType: AppConstants.ERROR.POPULATE,
				error: errorObj,
			});
		}
		return Promise.reject(errorObj);
	},
	get: function() {
		return Gatherer.get.apply(Gatherer, arguments).catch(this.dispatchError);
	},
	post: function() {
		return Gatherer.post.apply(Gatherer, arguments).catch(this.dispatchError);
	},
	put: function() {
		return Gatherer.put.apply(Gatherer, arguments).catch(this.dispatchError);
	},
	delete: function() {
		return Gatherer.delete.apply(Gatherer, arguments).catch(this.dispatchError);
	},
	find: function() {
		return Gatherer.find.apply(Gatherer, arguments).catch(this.dispatchError);
	},
};

module.exports = BaseActions;
