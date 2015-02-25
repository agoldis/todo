var ns = ns || {};
(function (ns) {
ns.Views = ns.Views || {}
ns.Views.Item = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#app-item-tpl").html()),
    events: {
         'click .toggle' : 'toggleCompleted'
    },
    initialize: function () {
        this.listenTo(this.model,'change',this.render);
    },
    toggleCompleted: function () {
        console.log('toggling completed')
        this.model.set('completed', !this.model.get('completed'));
        this.model.save({completed: this.model.get('completed')});
    },
    render: function () {
        console.log('render model "%s" isHidden: %s', this.model.get('title'), this.model.get('isHidden'))
        this.$el.html(this.template(this.model.attributes));

        this.$el.toggleClass('hidden',this.model.get('isHidden'));
        return this;
    }    
});
})(ns);