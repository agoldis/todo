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
        this.lastSelected = '#show-all';
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'change:completed', this.activateFilter);
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
    activateFilter: function () {
        $(this.lastSelected).click()
        this.render()
    },
    showAll: function (e) {
        this.highlightButton(e);  
        this.collection.each( function (item) {
            item.set('isHidden', false);
        })
    },
    showCompleted: function (e) {
        this.highlightButton(e);  
        this.collection.each(function (item) {
            item.set('isHidden' , !item.get('completed'))
        })
    },
    showIncompleted: function (e) {
        this.highlightButton(e);  
        this.collection.each(function (item) {
            item.set('isHidden', item.get('completed'))
        })
    },
    highlightButton: function(e) {
        this.$el.find('.active').removeClass('active').removeClass('btn-info');
        $(e.target).addClass('active btn-info');
        this.lastSelected =  '#' + $(e.target).attr('id');
    },
    render: function () {
        this.$el.html(this.template(this.getStatus()));
        $(this.lastSelected).addClass('active btn-info')
        return this;
    }
});

})(ns)