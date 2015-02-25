var ns = ns || {};
(function (ns) {
ns.Views = ns.Views || {}
ns.Models = ns.Models || {};
ns.Collections = ns.Collections || {};

ns.app = Backbone.Router.extend({
	routes: {
		'' : 'start',
	},
	initialize: function () {
		Backbone.history.start({pushState: true});
	},
	start: function () {
		console.log("Started routing")

		var app = new ns.Views.App({el: '#app'})
		app.render();

		
	}
})
})(ns)