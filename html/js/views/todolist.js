var ns = ns || {};
(function($){
  ns.TodoListView = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: ns.TodoItemView
  });

})(jQuery)
