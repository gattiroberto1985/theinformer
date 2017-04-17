// Filename: views/titleView
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/titleTpl.html' ], function($, _, Backbone, titleTemplate)
    {
    var TitleView = Backbone.View.extend({
        el        : $("#header"),
        initialize: function( ) { this.render(); },
        render    : function ( ) {
            console.log( " Rendering title view . . .");
            this.title = {
                title   : "The Informer",
                subtitle: "An RSS reader based on Go - MongoDB - BackboneJS - Bootstrap!"
            };
            this.$el.html( _.template( titleTemplate ) ( { title: this.title } ));
        }
    });

    return TitleView;

});
