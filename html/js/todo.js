// Main
var ENTER_KEY = 13;
var ns = ns || {};

$(function () {

	ns.app = new ns.TodoAppView({ el: $("#app") });
	ns.app.render();
});
