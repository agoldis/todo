var ns = ns || {};
(function (ns) {
ns.Views = ns.Views || {};
ns.Models = ns.Models || {};
ns.Views.Controller = Backbone.View.extend({
    
    template: _.template($('#app-ctrl-tpl').html()),
    events: {
      'click #item-add': 'addItem',
      'click #clear-completed' : 'removeCompleted',
      'click #complete-all' : 'completeAll',
      'keypress #item-title-input' : 'addOnEnter'
    },
    addOnEnter: function (e) {
      this.$('#item-title-input').parent().removeClass('has-error');
      if (e.which === ENTER_KEY && this.$('#item-title-input').val().trim()) 
		this.addItem(e);
    },
    addItem: function () {
        var item = new ns.Models.Item({title: this.$('#item-title-input').val().trim()}); 
        if (item.isValid()) {
            this.collection.create(item)
        }
        else
            this.showInvalid();
        this.$('#item-title-input').val('')
    },
    removeCompleted: function () {

        var completed = this.collection.where({ completed: true });
        completed.map( function (item) {
            console.log('going to destroy %s', item.get('title'))
            item.destroy();
        });
    },
    completeAll: function () {
        this.collection.map(function (item) {
            item.set('completed', true)
            item.save();
        })
    },
    showInvalid: function () {
        this.$('#item-title-input').parent().addClass('has-error');
    },
    render: function () {
        this.$el.html(this.template());
        // this.$el.append(this.statusView.$el);
        return this;
    },
});
})(ns);