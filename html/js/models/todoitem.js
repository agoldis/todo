var ns = ns || {};
(function () {
// Models
ns.TodoItem = Backbone.Model.extend({
   defaults: {
       title: '',
       completed: false
   },
   idAttribute: '_id',
   toggle: function () {
       this.save({ 
           completed: !this.get('completed') 
       });
   },
    validate: function (attrs, options) {
        if (!attrs.title || attrs.title === '' )
            return 'Task description cannot be empty';
   }

});

})();