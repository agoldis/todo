var ns = ns || {};
(function (ns) {
  ns.Views = ns.Views || {}
  ns.Views.Status = Backbone.View.extend({
    template: _.template($('#app-status-tpl').html()),
    tagName: 'span',
    events: {
      'click #show-incompleted' :function() { this.model.set("show", "incompleted");}, 
      'click #show-completed' : function() { this.model.set("show", "completed");},
      'click #show-all' : function() { this.model.set("show", "all");},
    },
    initialize: function () {
      this.model = new Backbone.Model();
      this.model.set("show", "all");
      this.listenTo(this.model, "change", this.filterCollection);
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'change:completed', this.render);
    },
    getStatus: function () {
      var overall = this.collection.length;
      var completed = this.collection.where({ completed: true }).length;
      var others = overall - completed;
      return {
        'overall'  : overall,
        'completed' : completed,
        'others' : others
      };
    },
    filterCollection: function(){
      var word = this.model.get("show");
      this.collection.each(function (item) {
        if (word === "all") {
          item.set('isHidden' , false);
        }
        else if (word === "incompleted"){
          item.set('isHidden' , item.get("completed"))
        }
        else{
          item.set('isHidden' , !item.get("completed"))
        } 
      });

    },
    render: function () {
      this.$el.html(this.template(this.getStatus()));
      this.$el.find("button").end().removeClass("active btn-info").find("#show-" + this.model.get("show")).addClass("active btn-info");
      this.filterCollection();
      return this;
    }
  });

})(ns)
