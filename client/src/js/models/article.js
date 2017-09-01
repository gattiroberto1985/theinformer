// Filename: models/articles/articleModel
define([
  'underscore',
  'backbone',
  'config'
], function(_, Backbone, config){

    var ArticleModel = Backbone.Model.extend({

        // Valori di default
        defaults: {
            id         : "noid",
            feedId     : "nofeedid",
            title      : "no_title",
            link       : "no_link",
            publishDate: new Date(),
            author     : "no_author",
            isRead     : false,
            description: "no_description",
            rate       : 0,
            content    : "no_content",
            notes      : [ ],
            tags       : [ ]
        },
        //urlRoot    : config.serverRootUrl + "articles",
        idAttribute: "id",
        urlRoot    : config.serverRootUrl + "articles",

        initialize : function ( options ) {
            console.log(" [ ArticleModel ] Initializing model for article . . . ");
        },

        validate   : function ( attr ) {
            console.log(" [ ArticleModel ] Validating model of feed '" + JSON.stringify( attr )  + "' . . .");
        }
  });

  // Return the model for the module
  return ArticleModel;
});
