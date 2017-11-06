/*
 * Vista relativa ad un feed
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'collections/FeedsCollection',
  //'router',
  //'text!templates/feeds/feedTpl.html'
  'templates/js/feedTpl'
], function($, _, Backbone, config, feedsCollection, /*router,*/ feedViewTemplate){

    var FeedView = Backbone.View.extend({
        // Nessuna specifica dell'elementid: verrà valorizzato a runtime!
        tagName: "li",
        events: {
            "click #feed-delete" : "doDeleteFeed",
            "click #feed-refresh": "doRefreshFeed",
            "click"              : "onFeedSelected"
        },

        doDeleteFeed: function ( event ) {
            event.stopImmediatePropagation();
            console.log(" [ FeedView ] Request for deleting feed with id '" + this.model.id + "'" );
            //console.log ( feedsCollection.get( this.model ) );
            this.model.collection.where( { id: this.model.id })[0].destroy();
            this.remove();
            //this.model.destroy()
            //feedsCollection.remove( this.model.id );
            //console.log(" [ FeedView ] Collection is: " + this.mCollection );
            // Access the collection
            // get the feed by id
            // call the remove method from the collection
        },

        doRefreshFeed: function ( event ) {
            event.stopImmediatePropagation();
            console.log(" [ FeedView ] Request for refreshing feed with id '" + this.model.id + "'" );
            //console.log ( feedsCollection.get( this.model ) );
            this.model.collection.where( { id: this.model.id })[0].refresh();
        },

        onFeedSelected: function ( event ) {
            console.log(" [ FeedView ] Selected feed");
            var $li = event.target.parentNode;
            config.router.navigate("feeds/" + $li.attributes["feed-id"].value + "/articles", { trigger: true });
        },

        initialize: function( ) {
            console.log(" [ FeedView ] Initializing . . .");
        },

        render    : function ( ) {
            console.log(" [ FeedView ] rendering view . . .");
            this.$el.attr( "feed-id", this.model.id );
            var template = _.template( feedViewTemplate.templateStr );
            var html = template(this.model.toJSON());
            this.$el.html( html );
            return this;
        }

    });

    // Returning instantiated views can be quite useful for having "state"
    return FeedView;
});
