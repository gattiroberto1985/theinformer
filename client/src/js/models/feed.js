// Filename: models/feeds/feedModel
define([
    'underscore',
    'backbone',
    'config'
], function(_, Backbone, config){

    // Defining backbone model. The save operation could be exectuted via:
    //book.save({}, {
    //    success: function (model, response, options) {
    //        console.log("The model has been saved to the server");
    //    },
    //    error: function (model, xhr, options) {
    //        console.log("Something went wrong while saving the model");
    //    }
    //});
    var FeedModel = Backbone.Model.extend({
        defaults: {
            id         : "no_id",
            title      : "Nome feed",
            //unread     : 0,
            url        : "<no_url>",
            lastUpdate : new Date(),
            categories : [ "no", "default", "categories" ]
        },
        urlRoot    : config.serverRootUrl + "feeds",
        idAttribute: "id",
        initialize : function ( ) {
            console.log("Initializing model for feed object . . . ");
        }, // closing initialize function
        /*constructor: function( attributes, options ) {
            console.log("FeedModel constructor with attributes: '" + JSON.stringify( attributes ) +
                        "' and options '" + JSON.stringify( options ) + "' . . . ");
            Backbone.Model.apply(this, arguments);
        }*/
        validate   : function ( attr ) {
            console.log("Validating model of feed '" + JSON.stringify( attr )  + "' . . .");
        }
    });

    // Return the model for the module
    return FeedModel;
});
