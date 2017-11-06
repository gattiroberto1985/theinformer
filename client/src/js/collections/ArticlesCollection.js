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
        //url       : config.serverRootUrl + "feeds/:feedId:/articles",
        feedId    : "<na>",

        url       : function ( ) {
            return config.serverRootUrl + "feeds/" + this.feedId + "/articles";
        },

        initialize: function ( models, options ) {
            console.log( " [ ArticlesCollection ] Entering initialize method . . .");
            if ( options != undefined )
            {
                this.feedId = options.feedId;
                //console.log( " [ ArticlesCollection ] Overriding url for collection, with feedId '" + feedId + "'")
                //this.url = config.serverRootUrl + "feeds/" + feedId + "/articles";
                //console.log( " [ ArticlesCollection ] Url is '" + this.url + "'")
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
