// Filename: app.js
// define ( [ list_of_dependencies], factory_function ( dpendency_identifiers ) { } )
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'config',
  'router', // Request router.js
  'views/TitleView',
  'views/ArticleContentView',
  'views/ArticleHeaderView',
  'views/ArticleHeaderListView',
  'views/FeedListView',
  'views/FeedView',
  'collections/FeedsCollection',
  'collections/ArticlesCollection',
  'models/Title',
  'models/Article',
  'models/Feed'
], function( $, _, Backbone, Bootstrap,
            config,
            Router,
            TitleView, ArticleContentView, ArticleHeaderView, ArticleHeaderListView, FeedListView, FeedView,
            FeedsCollection, ArticlesCollection,
            TitleModel, ArticleModel, FeedModel ){

    var onFeedCollectionLoaded = function( collection, response, options, params ) {
        var viewOfCollection = params.view;
        console.log( " [ App ] Feed collection loaded, rendering the view . . .");
        $("#feeds").html( viewOfCollection.render().$el ); // called asychronously
    }

    var onError    = function ( collection, response, options ) {
        console.log( " [ App ] Error loading collection!");
    }

    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        console.log(" [ App ] Bootstraping application . . .");
        console.log(" [ App ] Defining backbone router . . .");
        var appRouter = new Router();
        //console.log(" [ App ] Router created: " router.toJSON());
        Backbone.history.start();
        config.router = appRouter;

        console.log(" [ App ] Creating stuff for application . . .");
        var feedsCollection    = FeedsCollection;
        var articlesCollection = new ArticlesCollection();
        var article            = new ArticleModel();
        // Creazioni viste
        var titleView          = new TitleView({ model: new TitleModel() });                // titolo
        var feedsView          = new FeedListView( { model: feedsCollection } );            // lista feed
        var articlesHeaderView = new ArticleHeaderListView( { model: articlesCollection }); // lista testata articoli
        var articleContentView = new ArticleContentView( { model: article });               // contenuto articolo

        console.log(" [ App ] Retreiving data from database . . .");
        feedsCollection.fetch( {
            success: function(collection, response, options) { onFeedCollectionLoaded( collection, response, options, { "view": feedsView } ); },
            error  : function(collection, response, options) { onError( collection, response, options); }
        });

        console.log(" [ App ] Creating interface . . .");
        $("#header")         .html( titleView         .render().$el );
        //$("#feeds")          .html( feedsView         .render().$el ); // called asychronously
        $("#articles")       .html( articlesHeaderView.render().$el );   // Empty initialization
        $("#article-content").html( articleContentView.render().$el );   // Empty initialization
    }

    return {
        initialize: initialize
    };
});
