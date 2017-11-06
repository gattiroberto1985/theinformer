/**
 * File       : router.js
 * Descrizione:
 *       File di definizione del routing backbone.
 * Versione   : 1.0
 * Changelog  :
 *      2017.11.05 -- refactoring
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'views/TitleView'                 , // view per il titolo di pagina
  'views/FeedView'                  , // view per il singolo feed nella lista feed
  'views/FeedListView'              , // view per la collection di feed
  'views/ArticleHeaderView'         , // view per il singolo articolo nella lista articoli
  'views/ArticleHeaderListView'     , // view per la collection di articoli
  'views/ArticleContentView'        , // view per il contenuto dell'articolo
  'collections/FeedsCollection'     , // model per la collection di feed
  'collections/ArticlesCollection'  , // model per la collection di articoli
  'models/Article'
], function($, _, Backbone, config, TitleView, FeedView,
            FeedListView, ArticleHeaderView, ArticleHeaderListView,
            ArticleContentView, FeedsCollection, ArticlesCollection,
            ArticleModel ){

    /**
     * Method to transform a parameters string into a json object.
     * From: <generic stackoverflow :) >
     */
    var paramsToObject = function(params) {
        if (!params)
            return {};
        var paramsArray = _.map(params.split(';'), function(str) {
            return str.split('=');
        });
        var obj = {};
        _.each(paramsArray, function(arr) {
            obj[arr[0]] = arr[1];
        });

        return obj;
    };

    /**
     * Backbone router definition.
     */
    var AppRouter = Backbone.Router.extend({

        /**
         * Router path definitions
         */
        routes: {
            // Define some URL routes
            ''                        : "showHome",
            //'feeds/:fId'              : "showArticlesInFeed",
            'feeds/:fId/articles'     : "showArticlesInFeed",
            "feeds/:fId/articles/:aId": "showArticleContent",

            //"*other"                   : "showErrorPage"
        },

        /**
         * Callback for the showHome route
         */
        showHome: function ( ) {
            console.log(" [ router ] Going to home page . . .");
        },

        /**
         * Callback for the article showing route
         */
        showArticlesInFeed: function ( feedId ) {
            console.log(" [ router ] Going to load articles of feed with id '" + feedId + "'. . ." );
            var feed = FeedsCollection.get( feedId );
            //console.log( " [ router ] Fetching articles of feed '" + this.model.get("title") + "' . . . ");
            var articlesCollection = new ArticlesCollection([], { "feedId": feedId } );
            articlesCollection.fetch( {
                success: function(collection, response, options) {
                    var articlesHeaderView = new ArticleHeaderListView( { model: articlesCollection }); // lista testata articoli
                    console.log( " [ router ] Feed article collection loaded, rendering the view . . .");
                    $("#articles").html( articlesHeaderView.render().$el ); // called asychronously
                },
                error  : function(collection, response, options) {
                    console.log(" [ router ] ERROR: on loading articles!");
                }
            });
        },

        /**
         * Callback for the article content showing route
         */
        showArticleContent: function ( feedId, articleId ) {
            console.log(" [ router ] Going to show article content . . . ");
            var article = new ArticleModel( { id: articleId } );
            //article.set("id", articleId);
            article.fetch( {
                success: function(model, response, options) {
                    var articleContentView = new ArticleContentView({ model: new ArticleModel( response.body[0] ) } );
                    $("#article-content").html( articleContentView.render().$el );
                },
                error  : function() {
                    console.log(" [ router ] ERROR on fetching article!");
                }
            });
        },

        /**
         * Callback for the generic error route
         */
        showErrorPage: function ( params ) {
            console.log(" [ router ] Going to show error page . . ");
        },

        /**
         * Callback for the test endpoint
         */
        alert: function ( ) { console.log( "Hello!" ); }
    });

    return AppRouter;

});
