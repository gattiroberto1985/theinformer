// Filename: collections/articleCollection
define([
  'underscore',
  'backbone',
  // Pull in the Model module from above
  'models/article',
  'config'
], function(_, Backbone, ArticleModel, config){

    var ArticlesCollection = Backbone.Collection.extend({

        model     : ArticleModel,
        url       : config.serverRootUrl + "feeds/:feedId:/articles",

        initialize: function ( models, options ) {
            if ( options != undefined )
            {
                feedId = options.feedId;
                console.log( " [ ArticlesCollection ] Overriding url for collection, with feedId '" + feedId + "'")
                this.url = config.serverRootUrl + "feeds/" + feedId + "/articles";
            }
        },

        parse     : function ( response, options ) {
            console.log(" [ ArticlesCollection ] Fetching articles in feed said '" + response.message + "' + with http code '"  + response.httpcode + "'!");
            console.log(" [ ArticlesCollection ] Response body: " + response.body );
            return response.body;
        }

    });

    return ArticlesCollection;
});
