define([
        'backbone',
        'collections/list',
        'views/list',
        'views/status',
        'views/controller',
        'text!templates/layout.html'
    ],
    function (Backbone, TodoCollection, ListView, StatusView, ControllerView, layoutTpl) {
        return Backbone.View.extend({
            template: _.template(layoutTpl),
            initialize: function () {
                this.collection = new TodoCollection()
            },
            render: function () {
                this.$el.html(this.template());
                var ctrlView = new ControllerView({el: '#app-ctrl', collection: this.collection});
                ctrlView
                    .render()
                    .$el
                    .append((new StatusView({collection: this.collection}).el));

                $("#app-items-list").html((new ListView({collection: this.collection})).el);

                this.collection.fetch();
                return this;
            }
        });
    });