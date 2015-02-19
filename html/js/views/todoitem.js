var ns = ns || {};
(function ($) {
// Views
ns.TodoItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: "#app-item-tpl",
    events: {
         'click .toggle' : 'toggleCompleted'
    },
    initialize: function () {
        this.listenTo(this.model,'change',this.render);
    },
    toggleCompleted: function (e) {
        this.model.toggle();
    },
    onRender: function () {
        this.$el.toggleClass('hidden',this.model.get("hidden"));
        return this;
    },
    
    
});
})(jQuery);
