/**
 * File       : app.js
 * Descrizione:
 *       Entry point dell'applicazione. Esegue il boot, definendo e caricando
 *       i vari oggetti necessari al funzionamento.
 * Versione   : 1.0
 * Memo       :
 * Changelog  :
 *       2017.11.05 -- Refactoring
 */
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
  'views/FeedManagerView',
  'collections/FeedsCollection',
  'collections/ArticlesCollection',
  'models/Title',
  'models/Article',
  'models/Feed',

], function( $, _, Backbone, Bootstrap,
            config,
            Router,
            TitleView, ArticleContentView, ArticleHeaderView, ArticleHeaderListView, FeedListView, FeedView, FeedManagerView,
            FeedsCollection, ArticlesCollection,
            TitleModel, ArticleModel, FeedModel ){

    /**
     * Populate the view of the feed collection.
     */
    var onFeedCollectionLoaded = function( collection, response, options, params ) {
        var viewOfCollection = params.view;
        viewOfCollection.mCollection = collection;
        console.log( " [ App ] Feed collection loaded, rendering the view . . .");
        $("#feeds").html( viewOfCollection.render().$el ); // called asychronously
    }

    /**
     * Basic error manager.
     */
    var onError    = function ( collection, response, options ) {
        console.log( " [ App ] Error loading collection!");
    }

    /**
     * Application initialization. This method should be the entry point.
     */
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
        var feedManagerView    = new FeedManagerView({
                model     : new Backbone.Model.extend({}),
                collection: feedsCollection
            });                                  // manager view
        console.log(" [ App ] Retreiving data from database . . .");
        feedsCollection.fetch( {
            success: function(collection, response, options) { onFeedCollectionLoaded( collection, response, options, { "view": feedsView } ); },
            error  : function(collection, response, options) { onError( collection, response, options); }
        });

        console.log(" [ App ] Creating interface . . .");
        $("#header")         .html( titleView         .render().$el );
        $("#app-manager")    .html( feedManagerView   .render().$el );
        //$("#feeds")          .html( feedsView         .render().$el ); // called asychronously
        //$("#articles")       .html( articlesHeaderView.render().$el );   // Empty initialization
        //$("#article-content").html( articleContentView.render().$el );   // Empty initialization
    }

    return {
        initialize: initialize
    };

});
