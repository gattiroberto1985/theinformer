// Model backbone per un feed
define([
    'underscore',
    'backbone',
    'config',
    'collections/ArticlesCollection',
    'models/Article'
], function(_, Backbone, config, ArticlesCollection, ArticleModel ){

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
            //id         : "no_id",
            title      : "Nome feed",
            unread     : 0,
            url        : "<no_url>",
            lastUpdate : new Date(),
            categories : [ "no", "default", "categories" ],
            //isNew      : true                                 // Backbone default property
        },

        //urlRoot    : config.serverRootUrl + "feeds",
        idAttribute: "id",

        initialize : function ( ) {
            console.log(" [ FeedModel ] Initializing model for feed . . . ");
        }, // closing initialize function

        validate   : function ( attr ) {
            console.log(" [ FeedModel ] Validating model of feed '" + JSON.stringify( attr )  + "' . . .");
        },

        /**
         * Refresh feed method.
         */
         refresh: function ( ) {
            console.log( " [ FeedModel ] Fetching articles of feed '" + this.get("title") + "' . . . ");
            var articleCollection = new ArticlesCollection([], { feedId: this.get("id") } );
            //var articlesHeaderView = new ArticleHeaderListView( { model: articlesCollection }); // lista testata articoli
            //var articleContentView = new ArticleContentView( { model: article });               // contenuto articolo
            articleCollection.sync('patch', articleCollection, {
            //articleCollection.save( {
                success: function(collection, response, options) {  console.log( " [ FeedModel ] Feed updated! "); },
                error  : function(collection, response, options) { console.log( " [ FeedModel ] ERROR: on feed updating . . . :'(  ... )"); }
            });
        }

    });

    // Return the model for the module
    return FeedModel;
});
