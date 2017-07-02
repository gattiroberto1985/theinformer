// Filename: collections/articleCollection
define([
  'underscore',
  'backbone',
  'models/Feed',
  'config'
], function(_, Backbone, FeedModel, config){

    var FeedsCollection = Backbone.Collection.extend({

        model: FeedModel,

        url  : config.serverRootUrl + "feeds",

        parse: function ( response, options ) {
            console.log(" [ FeedsCollection ] Fetching feeds collection said '" + response.message + "' + with http code '"  + response.httpcode + "'!");
            console.log(" [ FeedsCollection ] Response body: " + response.body );
            return response.body;
        }

    });

    return new FeedsCollection();
});
