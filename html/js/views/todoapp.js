var ns = ns || {};
(function ($) {

ns.TodoAppView = Backbone.View.extend({
    
    layoutTpl: _.template($('#app-layout-tpl').html()),
    initialize: function () {
        this.ctrl = new ns.TodoControllerView();
        this.list = new ns.TodoListView();
    },
    render: function () {
        this.$el.html(this.layoutTpl());
        $('#app-ctrl').html(this.ctrl.$el)   
        $('#app-items-list').html(this.list.$el);

        return this;
    }
});
})(jQuery)