// Filename: collections/articleCollection
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/feed',
  'config'
], function(_, Backbone, FeedModel, config){

  var FeedCollection = Backbone.Collection.extend({

    model: FeedModel,
    url  : config.serverRootUrl + "feeds",
    parse: function ( response, options ) {
        console.log("Fetching feeds collection said '" + response.message + "' + with http code '"  + response.httpcode + "'!");
        console.log("Response body: " + response.body );
        return response.body;
    }
  });
  // You don't usually return a collection instantiated
  return FeedCollection;
});
