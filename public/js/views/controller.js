define([
    'backbone',
    'models/item',
    'constants',
    'text!templates/control.html'
], function (Backbone,ItemModel,constants,controlTpl) {
    return Backbone.View.extend({

        template: _.template(controlTpl),
        events: {
            'click #item-add': 'addItem',
            'click #clear-completed': 'removeCompleted',
            'click #complete-all': 'completeAll',
            'keypress #item-title-input': 'addOnEnter'
        },
        initialize: function () {
            this.createNewItem()
        },
        addOnEnter: function (e) {
            this.$('#item-title-input').parent().removeClass('has-error');
            if (e.which === constants.ENTER_KEY )
                this.addItem();
        },
        addItem: function () {
            this.newItem.set('title',this.$('#item-title-input').val().trim());
            if(this.newItem.isValid()) {
                this.collection.add(this.newItem);
                this.newItem.save();
                this.createNewItem();
            }
            else {
                console.error(this.newItem.validationError);
            }
        },
        createNewItem: function () {
            // Create an empty model.
            // When form is filled, the new item is added to a collection
            // and a new dummy item is created.
            // Some cleaning required to get rid of submitted dummy model
            console.log('Creating a new dummy item');
            if (this.newItem) {
                this.stopListening(this.newItem, 'invalid');
            }
            this.newItem = new ItemModel();
            this.listenTo(this.newItem, 'invalid', this.render);
            this.$('#item-title-input').val('');
        },
        removeCompleted: function () {
            var completed = this.collection.where({completed: true});
            completed.map(function (item) {
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
        render: function () {
            var error_msg = this.newItem.validationError ? this.newItem.validationError : false;
            this.$el.html(this.template({error: error_msg}));
            return this;
        }
    });
});