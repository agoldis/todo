var ns = ns || {};
(function () {
// Collections
ns.TodoCollection = Backbone.Collection.extend({
   model: ns.TodoItem,
});
ns.collection = new ns.TodoCollection();
})()