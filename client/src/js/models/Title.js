// Model backbone per un feed
define([
    'underscore',
    'backbone',
    'config'
], function(_, Backbone, config){

    var TitleModel = Backbone.Model.extend({

        // Valori di default
        defaults: {
            title      : "TheInformer",
            subtitle    : "An RSS Reader based on MongoDB - Go - BackboneJS - Bootstrap"
        },

        initialize : function ( ) {
            console.log(" [ TitleModel ] Initializing model for feed . . . ");
        }

    });

    return TitleModel;
});
