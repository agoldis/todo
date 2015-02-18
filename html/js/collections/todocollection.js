var ns = ns || {};
(function () {
// Collections
ns.TodoCollection = Backbone.Collection.extend({
   model: ns.TodoItem,
   url: 'collections/todoitems'
});
ns.collection = new ns.TodoCollection();
ns.collection.fetch();
})()