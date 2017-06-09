// Filename: views/article/articleContentView
define([
  'jquery',
  'underscore',
  'backbone',
  //'templates/js/articleListTpl'
  'text!templates/articles/articleContentTpl.html'
], function($, _, Backbone, articleContentTemplate){

  var ArticleContentView = Backbone.View.extend({
      el        : $("#articlecontent"),
      initialize: function(models, options) { },
      render: function(){
          console.log("Rendering article content . . .");
          var data = {
              article: { title: "Titolo", content: "<h1>titolo</h1><p>Contenuto</p>" },
              _: _
          };

          var compiledTemplate = _.template( articleContentTemplate )( data );
          $("#articlecontent").html( compiledTemplate );
      }
  });

  // Returning instantiated views can be quite useful for having "state"
  return ArticleContentView;
});
