var ns = ns || {};
(function ($) {
    ns.TodoControllerView = Backbone.View.extend({
    
    template: _.template($('#app-ctrl-tpl').html()),
    initialize: function () {
        this.statusView = new ns.TodoStatusView();
        this.render();
    },
    events: {
      'click #item-add': 'addItem',
      'click #clear-completed' : 'removeCompleted',
      'keypress #item-title-input' : 'addOnEnter'
    },
    addOnEnter: function (e) {
      this.$('#item-title-input').parent().removeClass('has-error');
      if (e.which === ENTER_KEY && this.$('#item-title-input').val().trim()) 
		this.addItem(e);
    },
    addItem: function () {
        var item = new ns.TodoItem({title: this.$('#item-title-input').val().trim()}); 
        if (item.isValid()) {
            ns.collection.create(item)
        }
        else
            this.showInvalid();
        this.$('#item-title-input').val('')
    },
    removeCompleted: function () {
        var completed = ns.collection.where({ completed: true });
        completed.map( function (item) {
            item.destroy();
        });
        ns.collection.remove(completed);
    },
    showInvalid: function() {
        this.$('#item-title-input').parent().addClass('has-error');
    },
    render: function () {
        this.$el.html(this.template());
        this.$el.append(this.statusView.$el);
        return this;
    },
});
})(jQuery);