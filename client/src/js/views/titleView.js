// Filename: views/titleView
define([
    'jquery',
    'underscore',
    'backbone',
    //'text!templates/titleTpl.html'
    'templates/js/titleTpl'
], function($, _, Backbone, titleTemplate){

    var TitleView = Backbone.View.extend({

        initialize: function( options ) {
             //this.render();
         },

        render    : function ( ) {
            console.log( " [ TitleView ] Rendering title view . . .");
            var template = _.template( titleTemplate.templateStr );
            var html = template(this.model.toJSON());
            this.$el.html( html );
            return this;
        }
    });

    return TitleView;

});
