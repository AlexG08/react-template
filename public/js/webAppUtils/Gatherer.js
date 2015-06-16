"use strict";

var Amygdala = require('amygdala');

var api = new Amygdala({
	config: {
		apiUrl: process.env.apiUrl,
		idAttribute: 'url',
	},
	schema: {
		users: {
			url: '/api/users',
		}
	},
});

var Gatherer = {
	get: function() {
		return api.get.apply(api, arguments);
	},
	post: function() {
		return api.add.apply(api, arguments);
	},
	put: function() {
		return api.update.apply(api, arguments);
	},
	delete: function() {
		return api.remove.apply(api, arguments);
	},
	find: function() {
		return api.find.apply(api, arguments);
	},
};

module.exports = Gatherer;
