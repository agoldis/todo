var ns = ns || {};
(function ($) {

ns.TodoAppView = Backbone.View.extend({
    
    layoutTpl: _.template($('#app-layout-tpl').html()),
    
    render: function () {
        this.$el.html(this.layoutTpl());
        
        var ctrl = new ns.TodoControllerView({el: $('#app-ctrl')});
        ctrl.render();
        
        var status = new ns.TodoStatusView({ el: $('#app-status')})
        status.render();
        var list = new ns.TodoListView();
        $('#app-items-list').html(list.$el);
        
        return this;
    }
});
})(jQuery)