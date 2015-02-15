var ns = ns || {};
(function($) {
    ns.TodoControllerView = Backbone.View.extend({
    
    template: _.template($('#app-ctrl-tpl').html()),

    events: {
      'click #item-add': 'addItem',
      'click #clear-completed' : 'removeCompleted',
      'keypress #item-title-input' : 'addOnEnter',
      'click #show-incompleted' : 'showIncompleted',
      'click #show-completed' : 'showCompleted',
      'click #show-all' : 'showAll',
    },
    addOnEnter: function (e) {
      this.$('#item-title-input').removeClass('invalid');
      if (e.which === ENTER_KEY && this.$('#item-title-input').val().trim()) 
		this.addItem(e);
    },
    addItem: function (e) {
        var item = new ns.TodoItem({title: this.$('#item-title-input').val().trim()}); 
        if (item.isValid())
            ns.collection.add(item) 
        else
            this.showInvalid();
        this.$('#item-title-input').val('')
    },
    removeCompleted: function (e) {
        var completed = ns.collection.where({ completed: true });
        ns.collection.remove(completed);
        completed.map( function (item) {
            item.destroy();    
        });
    },
    showAll: function (e) {
        ns.filter = "";
        ns.collection.trigger('filter');
        this.clearActive();
        $("#show-all").addClass('active');
    },
    showCompleted: function () {
        ns.filter = "completed";
        ns.collection.trigger('filter');
        this.clearActive();
        $("#show-completed").addClass('active');
    },
    showIncompleted: function () {
        ns.filter = "incompleted";
        ns.collection.trigger('filter');
        this.clearActive();
        $("#show-incompleted").addClass('active');
    },
    clearActive: function () {
        this.$el.find('.active').removeClass('active');
    },
    showInvalid: function() {
        this.$('#item-title-input').addClass('invalid');
    },
    render: function () {
        this.$el.html(this.template);
        return this;
    },
});
})(jQuery);