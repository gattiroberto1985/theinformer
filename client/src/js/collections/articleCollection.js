// Filename: collections/articleCollection
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/article'
], function(_, Backbone, ArticleModel){
  var ArticleCollection = Backbone.Collection.extend({
    model: ArticleModel
  });
  // You don't usually return a collection instantiated
  return ArticleCollection;
});
