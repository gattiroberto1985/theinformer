// Filename: collections/articleCollection
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/article',
  'config'
], function(_, Backbone, ArticleModel, config){
  var ArticleCollection = Backbone.Collection.extend({
    model     : ArticleModel,
    feedId    : "",
    url       : config.serverRootUrl + "feeds/:fId/articles",
    initialize: function ( models, options ) {
        this.feedId = options.feedId;
    },
    parse     : function ( response, options ) {
        console.log("Fetching articles in feed said '" + response.message + "' + with http code '"  + response.httpcode + "'!");
        console.log("Response body: " + response.body );
        return response.body;
    }
  });
  // You don't usually return a collection instantiated
  return ArticleCollection;
});
