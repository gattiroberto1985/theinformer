// Filename: views/article/articleListView
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/articleCollection',
  //'templates/js/articleListTpl'
  'text!templates/articles/articleListTpl.html'
], function($, _, Backbone, ArticleCollection, articleHeaderListTemplate){

  var ArticleHeaderListView = Backbone.View.extend({
      el        : $("#articlelist"),
      initialize: function(models, options) {
          this.collection = new ArticleCollection([], { feedId: options.feedId });
          _.bindAll(this, 'render');
          if ( options.feedId != "" )
            this.collection.fetch({reset: true, success: this.render  }, this);
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
