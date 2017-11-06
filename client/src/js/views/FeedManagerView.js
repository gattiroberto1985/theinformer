/**
 * File       : FeedManagerView.js
 * Descrizione:
 *        Il file contiene la definizione della View Backbone dedicata alla
 *        gestione dei feed. Le action definite:
 *          - refreshAllFeeds consente l'aggiornamento di tutti i feed definiti
 *            dall'utente;
 *          - markAllAsRead, consente di porre in stato letto tutti gli articoli
 *            di tutti i feed;
 *          - addFeed, consente l'aggiunta di un nuovo feed nel sistema.
 *        Ciascuna action ha il suo metodo do dedicato.
 * Versione   : 1.0
 * Changelog  :
 *              - gestione errori in pagina in arrivo dal server
 *              - estensione generale delle funzionalità (gestione folder)
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'router',
  //'text!templates/feeds/feedTpl.html'
  'templates/js/feedManagerTpl',
  'models/Feed'
], function($, _, Backbone, config, router,/* feedViewTemplate, */ feedManagerTpl, FeedModel){

    var FeedManagerView = Backbone.View.extend({
        // Nessuna specifica dell'elementid: verrà valorizzato a runtime!
        tagName: "div",
        events: {
            "click #refresh-all-feeds": "doRefreshAllFeeds",
            "click #mark-all-as-read" : "doMarkAllAsRead"  ,
            "click #add-feed"         : "doAddFeed"
        },

        /**
        * Metodo di refresh dei feed in pagina.
        * The method loops through the feed collection and updates them.
        */
        doRefreshAllFeeds: function ( event ) {
            console.log( " [ FeedManagerView ] Request for refreshAllFeeds . . . ");
            // Get collection, in some way (TODO: how to get a backbone collection
            // from within a View completely independent from it? Is this a
            // good pattern? Should i implement this in another way? Which way?)
            // For each feed in collection call the update feed method and
            // update the feed list view.
            this.collection.each( function ( feed ) {
                feed.refresh();
            });
        },

        /**
         * Metodo di conferma lettura articoli dei feed (tutti!).
         * The method loops through the feed collection marking as read all the
         * uread articles.
         */
        doMarkAllAsRead: function ( event ) {
            console.log(" [ FeedManagerView ] Request for mark all as read . . .");
            // Get collection (see before . . .)
            // For each feed, loop through the unread articles and mark them
            // as read.
        },

        /**
         * Metodo di definizione nuovo feed.
         * The method adds a new feed in the system.
         * TODO: error management!
         */
        doAddFeed: function ( event ) {
            console.log(" [ FeedManagerView ] Request for adding feed . . .");

            console.log(" [ FeedManagerView ] Collection is: " + this.collection )
            var
                newFeedName = $("#newFeedName").val(),
                newFeedUrl  = $("#newFeedUrl" ).val(),
                newFeedTag  = $("#newFeedTag" ).val();
            var newFeed = new FeedModel({
                title      : newFeedName,
                url        : newFeedUrl,
                categories : [ newFeedTag ]
            });

            this.collection.add( newFeed );

            console.log( " [ FeedManagerView ] Feed defined: '" + JSON.stringify(newFeed) + "'");
            console.log( " [ FeedManagerView ] About to save the feed . . . ");
            newFeed.save();

            // Get the new feed datas from the template:
            //  newFeedName
            //  newFeedUrl
            //  newFeedTag
            // Create a new Feed via the backbone model
            // Save the feed
            // Check the errors and show them in page (or confirm the user
            // the save has completed well)

            //var $li = event.target.parentNode;
            //config.router.navigate("feeds/" + $li.attributes["id"].value + "/articles", { trigger: true });
        },

        initialize: function( ) {
            console.log(" [ FeedManagerView ] Initializing . . .");
        },

        render    : function ( ) {
            console.log(" [ FeedManagerView ] rendering view . . .");
            this.$el.attr( "id", this.model.id );
            var template = _.template( feedManagerTpl.templateStr );
            var html = template();
            this.$el.html( html );
            return this;
        }

    });

    // Returning instantiated views can be quite useful for having "state"
    return FeedManagerView;
});
