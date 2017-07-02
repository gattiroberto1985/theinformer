// Model backbone per un feed
define([
    'underscore',
    'backbone',
    'config',
    'collections/ArticlesCollection'
], function(_, Backbone, config, ArticleCollection){

    // Defining backbone model. The save operation could be exectuted via:
    //book.save({}, {
    //    success: function (model, response, options) {
    //        console.log("The model has been saved to the server");
    //    },
    //    error: function (model, xhr, options) {
    //        console.log("Something went wrong while saving the model");
    //    }
    //});
    var FeedModel = Backbone.Model.extend({

        // Valori di default
        defaults: {
            id         : "no_id",
            title      : "Nome feed",
            unread     : 0,
            url        : "<no_url>",
            lastUpdate : new Date(),
            categories : [ "no", "default", "categories" ]
        },

        //urlRoot    : config.serverRootUrl + "feeds",
        idAttribute: "id",

        initialize : function ( ) {
            console.log(" [ FeedModel ] Initializing model for feed . . . ");
        }, // closing initialize function

        validate   : function ( attr ) {
            console.log(" [ FeedModel ] Validating model of feed '" + JSON.stringify( attr )  + "' . . .");
        },

        /*fetchArticles: function ( ) {
            console.log( " [ FeedModel ] Fetching articles of feed '" + this.model.get("title") + "' . . . ");
            var articleCollection = new ArticleCollection();
            articleCollection.fetch( {
                success: function(collection, response, options) { onFeedCollectionLoaded( collection, response, options, { "view": feedsView } ); },
                error  : function(collection, response, options) { onError( collection, response, options); }
            });
        }*/

    });

    // Return the model for the module
    return FeedModel;
});
