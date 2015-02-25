var ns = ns || {};
(function (ns) {
ns.Collections = ns.Collections || {}
ns.Models = ns.Models || {}

ns.Collections.List = Backbone.Collection.extend({
   model: ns.Models.Item,
   url: 'collections/todoitems'
});
})(ns)