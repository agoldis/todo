define(['backbone','views/item'], function (Backbone,ItemView) {
    return Backbone.View.extend({
        tagName: 'ul',
        initialize: function () {
            this.collection.on('add', this.addItem, this);
            this.collection.on('remove', this.removeItem, this)
            // this.collection.on('reset', this.render, this)
            this.itemViews = []
        },
        addItem: function (item) {
            var newView = new ItemView({model: item});
            this.itemViews.push(newView);
            this.$el.append(newView.render().el);
        },
        removeItem: function (item) {
            this.itemViews.forEach(function (view) {
                if (view.model === item) {
                    console.log('Removing %s view', item.get('title'))
                    view.remove()
                }
            })
        },
        render: function () {
            this.$el.html('');
            this.itemViews.forEach(function (itemView) {
                this.$el.append(itemView.render().el);
            }, this);
            return this;
        }
    });

});