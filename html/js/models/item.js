var ns = ns || {};
(function (ns) {
ns.Models = ns.Models || {};
ns.Models.Item = Backbone.Model.extend({
   defaults: {
       isHidden: false,
       title: '',
       completed: false
   },
   idAttribute: '_id',
   toJSON: function () {
      /// filter out unneeded attributes 
      return  _.pick(this.attributes, 'title','completed');
   }
});

})(ns);