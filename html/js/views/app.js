var ns = ns || {};
(function (ns) {
ns.Views = ns.Views || {}

ns.Views.App = Backbone.View.extend({   
    template: _.template($('#app-layout-tpl').html()),
    initialize: function () {
        this.collection = new ns.Collections.List()
    },
    render: function () {
        this.$el.html(this.template());
        (new ns.Views.Controller({el: '#app-ctrl', collection: this.collection}))
            .render()
            .$el
            .append((new ns.Views.Status({collection: this.collection}).render().el))

        $("#app-items-list").html( (new ns.Views.List({collection: this.collection})).el)

        this.collection.fetch()
        return this;
    }
});
})(ns)