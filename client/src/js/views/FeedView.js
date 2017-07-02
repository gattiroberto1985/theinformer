/*
 * Vista relativa ad un feed
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  //'router',
  //'text!templates/feeds/feedTpl.html'
  'templates/js/feedTpl'
], function($, _, Backbone, config, /*router,*/ feedViewTemplate){

    var FeedView = Backbone.View.extend({
        // Nessuna specifica dell'elementid: verrà valorizzato a runtime!
        tagName: "li",
        events: {
            "click #del-feed" : "doDeleteFeed",
            "click"           : "onFeedSelected"
        },

        doDeleteFeed: function ( event ) {
            console.log(" [ FeedView ] Request for deleting feed");
        },

        onFeedSelected: function ( event ) {
            console.log(" [ FeedView ] Selected feed");
            var $li = event.target.parentNode;
            config.router.navigate("feeds/" + $li.attributes["id"].value + "/articles", { trigger: true });
        },

        initialize: function( ) {
            console.log(" [ FeedView ] Initializing . . .");
        },

        render    : function ( ) {
            console.log(" [ FeedView ] rendering view . . .");
            this.$el.attr( "id", this.model.id );
            var template = _.template( feedViewTemplate.templateStr );
            var html = template(this.model.toJSON());
            this.$el.html( html );
            return this;
        }

    });

    // Returning instantiated views can be quite useful for having "state"
    return FeedView;
});
