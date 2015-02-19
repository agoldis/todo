var ns = ns || {};
(function () {
// Collections
ns.TodoCollection = Backbone.Collection.extend({
   model: ns.TodoItem,
   url: 'collections/todoitems',
   initialize:function(){
     this.on("filter", this.filterCollections);
   },
   filterCollections:function(filterBy){
     this.each(function(m){ 
       m.set("hidden", this.isHidden(m, filterBy));
     },this);
   },
   isHidden: function (model, filter) {
     if (filter === 'completed' && !model.get('completed')) {
       return true;
     }
     else if (filter === 'incompleted' && model.get('completed')) {
       return true;
     }
     return false;
   }
});
ns.collection = new ns.TodoCollection();
ns.collection.fetch();
})()
