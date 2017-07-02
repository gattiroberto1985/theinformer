// Filename: views/feed/feedListView
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Feed',
  'views/FeedView',
  'collections/FeedsCollection',
  'text!templates/feeds/feedListTpl.html'
], function($, _, Backbone, Feed, FeedView, FeedsCollection, feedListTemplate){

    var FeedListView = Backbone.View.extend({
        tagName: "ul",

        initialize: function( options ){
            console.log(" [ FeedListView ] Initializing feed collection view . . .");
            //this.bus = options.bus;
            this.model.on("add"   , this.addFeed, this);
            this.model.on("remove", this.delFeed, this);
            this.model.on("add-feed", this.onAddFeed, this);

            /*this.collection = new FeedsCollection();
            _.bindAll(this, 'render');
            this.collection.fetch({reset: true, success: this.render  }, this);*/
        },

        addFeed: function ( feed ) {
            console.log(" [ FeedListView ] Adding feed . . .");
        },

        delFeed: function ( feed ) {
            console.log(" [ FeedListView ] Deleting feed . . .");
        },

        onAddFeed: function ( feed ) {
            console.log(" [ FeedListView ] Trying to add feed . . .");
            var feedModel = new Feed( { model: feed } );
            if ( !feedModel.isValid() )
                console.log(" [ FeedListView ] " + " ERROR: " + feedModel.validationError );
            else
                this.model.add( feed );
        },

        render: function(){
            console.log(" [ FeedListView ] Rendering feed list . . .");
            var self = this;

            this.model.each(
                function ( feed ) {
                    var feedHeaderView = new FeedView({ model: feed } );
                    self.$el.append( feedHeaderView.render().$el );
            }); // closing each
            return this;
        }

    });
    // Returning instantiated views can be quite useful for having "state"
    return FeedListView;
});
