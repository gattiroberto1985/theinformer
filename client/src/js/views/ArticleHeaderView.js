/*
 * Vista relativa ad un articolo in un feed
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  //'text!templates/articleTpl.html'
  'templates/js/articleHeaderTpl'
], function($, _, Backbone, config, articleViewTemplate){

    var ArticleHeaderView = Backbone.View.extend({
        // Nessuna specifica dell'elementid: verrà valorizzato a runtime!
        tagName: "li",

        events: {
            "click #del-article" : "doDeleteArticle",
            "click #mark-as-read": "doMarkAsRead",
            "click #bookmark-art": "doBookmarkArticle",
            "click"              : "onArticleSelected"
        },

        doDeleteArticle: function ( event ) {
            console.log(" [ ArticleHeaderView ] Request for deleting article . . . ");
        },

        doMarkAsRead    : function ( event ) {
            console.log(" [ ArticleHeaderView ] Marking as read article . . .");
        },

        doBookmarkArticle: function ( event ) {
            console.log(" [ ArticleHeaderView ] Bookmarking article . . . ");
        },

        onArticleSelected: function ( event ) {
            console.log(" [ ArticleHeaderView ] Selected article");
            var $li = event.target.parentNode;
            // get current url + "articles/" + $li.attributes["id"].value
            var url = Backbone.history.getFragment().split("/");
            config.router.navigate(url[0] + "/" + url[1] + "/" + url[2] + "/" + $li.attributes["id"].value, { trigger: true });
        },

        initialize: function( ) {
            console.log(" [ ArticleHeaderView ] Initializing . . .");
        },

        render    : function ( ) {
            console.log(" [ ArticleHeaderView ] rendering view . . .");
            this.$el.attr( "id", this.model.id );
            var template = _.template( articleViewTemplate.templateStr );
            var html = template(this.model.toJSON());
            this.$el.html( html );
            return this;
        }

    });

    // Returning instantiated views can be quite useful for having "state"
    return ArticleHeaderView;
});
