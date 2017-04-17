// Filename: views/article/articleListView
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/articleCollection',
  'text!templates/articles/articleListTpl.html'
], function($, _, Backbone, ArticleCollection, articleHeaderListTemplate){
  var ArticleHeaderListView = Backbone.View.extend({
    el: $("#articlelist"),
    initialize: function(){
      this.collection = new ArticleCollection();
      this.collection.add({ title: "Articolo 1"});
      this.collection.add({ title: "Articolo 2"});
      console.log ( JSON.stringify( this.collection.models  ));
      // Compile the template using Underscores micro-templating
      var compiledTemplate = _.template( articleHeaderListTemplate )({ articles: this.collection.models } );
      this.$el.html(compiledTemplate);
  },
    render: function(){
        console.log("Rendering article list . . .");
      var data = {
        articles: this.collection.models,
        _: _
      };

      var compiledTemplate = _.template( articleHeaderListTemplate )( data );
      $("#articlelist").html( compiledTemplate );
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return ArticleHeaderListView;
});
