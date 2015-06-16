"use strict";

var React = require('react');


$(function() {
	var container = document.getElementById('pricingWidgetContainer');
	if (container) {
		var creator = React.render(<PricingWidget />,container);
	}
});
