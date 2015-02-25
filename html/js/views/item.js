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
        // this.listenTo(this.model,'change',this.render);
    },
    toggleCompleted: function () {
        console.log('toggling completed')
        this.model.set('completed', !this.model.get('completed'));
        this.model.save();
        this.render()
    },
    render: function () {
        console.log('model render')
        console.log(this.model.get('title'))
        this.$el.html(this.template(this.model.attributes));
        this.$el.toggleClass('hidden',this.model.get('isHidden'));
        return this;
    }    
});
})(ns);