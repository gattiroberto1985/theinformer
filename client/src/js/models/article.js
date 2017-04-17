// Filename: models/articles/articleModel
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ArticleModel = Backbone.Model.extend({
    defaults: {
      title: "Nome Articolo"
    }
  });
  // Return the model for the module
  return ArticleModel;
});
