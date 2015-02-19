var ns = ns || {};
(function ($) {
ns.TodoStatusView = Backbone.View.extend({
    template: _.template($('#app-status-tpl').html()),
    // el: '#app-status',
    tagName: 'span',
    events: {
      'click #show-incompleted' : 'showIncompleted',
      'click #show-completed' : 'showCompleted',
      'click #show-all' : 'showAll'
    },
    initialize: function () {
        this.listenTo(ns.collection, 'add', this.render);
        this.listenTo(ns.collection, 'remove', this.render);
        this.listenTo(ns.collection, 'change', this.render);
        this.lastSelected = '#show-all';
    },
    getStatus: function () {
        var overall = ns.collection.length;
        var completed = ns.collection.where({ completed: true }).length;
        var others = overall - completed;
        return {
          'overall'  : overall,
          'completed' : completed,
          'others' : others
        };
    },
    showAll: function () {
        ns.collection.trigger('filter', "");
        this.clearActive();
        $("#show-all").addClass('active btn-info');
        this.lastSelected = '#show-all';
    },
    showCompleted: function () {
        ns.collection.trigger('filter', "completed");
        this.clearActive();
        $("#show-completed").addClass('active btn-info');
        this.lastSelected = '#show-completed';
    },
    showIncompleted: function () {
        ns.collection.trigger('filter', "incompleted");
        this.clearActive();
        $("#show-incompleted").addClass('active btn-info');
        this.lastSelected = '#show-incompleted';
    },
    clearActive: function () {
        this.$el.find('.active').removeClass('active').removeClass('btn-info');
    },
    render: function () {
        this.$el.html(this.template(this.getStatus()));
        $(this.lastSelected).addClass('active btn-info')
        return this;
    }
});

})(jQuery)
