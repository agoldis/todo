var ns = ns || {};
(function (ns) {
ns.Views = ns.Views || {}
ns.Views.Status = Backbone.View.extend({
    template: _.template($('#app-status-tpl').html()),
    tagName: 'span',
    events: {
      'click #show-incompleted' : 'showIncompleted',
      'click #show-completed' : 'showCompleted',
      'click #show-all' : 'showAll'
    },
    initialize: function () {
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'change:completed', this.render);
        this.lastSelected = '#show-all';
    },
    getStatus: function () {
        var overall = this.collection.length;
        var completed = this.collection.where({ completed: true }).length;
        var others = overall - completed;
        return {
          'overall'  : overall,
          'completed' : completed,
          'others' : others
        };
    },
    showAll: function (e) {
        this.collection.each( function (item) {
            item.set('isHidden', false);
        })
        this.highlightButton(e);  
    },
    showCompleted: function (e) {
        console.log('show completed')
        this.collection.each(function (item) {
            item.set('isHidden' , !item.get('completed'))
        })
        this.highlightButton(e);  
    },
    showIncompleted: function (e) {
        this.collection.each(function (item) {
            item.set('isHidden', item.get('completed'))
        })
        this.highlightButton(e);  
    },
    highlightButton: function(e) {
        this.$el.find('.active').removeClass('active').removeClass('btn-info');
        $(e.target).addClass('active btn-info');
        this.lastSelected =  e.target;
    },
    render: function () {
        this.$el.html(this.template(this.getStatus()));
        $(this.lastSelected).addClass('active btn-info')
        return this;
    }
});

})(ns)