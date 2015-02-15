var ns = ns || {};
(function ($) {
// Views
ns.TodoItemView = Backbone.View.extend({
    tagName: 'li',
    itemTpl: _.template($("#app-item-tpl").html()),
    events: {
         'click .toggle' : 'toggleCompleted'
    },
    initialize: function () {
        this.listenTo(this.model,'change',this.render);
        this.listenTo(ns.collection,'filter',this.render);
    },
    toggleCompleted: function (e) {
        this.model.toggle();
    },
    render: function () {
        this.$el.html( this.itemTpl(this.model.attributes));
        this.$el.toggleClass('hidden',this.isHidden());
        return this;
    },
    isHidden: function () {
        if (ns.filter === 'completed' && !this.model.get('completed')) {
            return true;
        }
        else if (ns.filter === 'incompleted' && this.model.get('completed')) {
            return true;
        }
        return false;
    }
    
});
})(jQuery);