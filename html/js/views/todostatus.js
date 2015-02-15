var ns = ns || {};
(function ($) {
ns.TodoStatusView = Backbone.View.extend({
    template: _.template($('#app-status-tpl').html()),
    initialize: function () {
        this.listenTo(ns.collection, 'all', this.render);
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
    render: function () {
        this.$el.html(this.template(this.getStatus()));
        return this;
    }
});

})(jQuery)