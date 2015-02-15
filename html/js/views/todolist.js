var ns = ns || {};
(function($){
    ns.TodoListView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
       this.listenTo(ns.collection, 'add', this.render);
       this.listenTo(ns.collection, 'remove', this.render);
    },
    render: function () {
        this.$el.html('');
        ns.collection.each(function(item) {
            var itemView = new ns.TodoItemView({model: item});
            this.$el.append( itemView.render().el );
        }, this); 
        return this;
    },
    showAll: function () {
        
    },
    showCompleted: function () {
        
    },
    showNotCompleted: function () {
        
    },
});
    
})(jQuery)