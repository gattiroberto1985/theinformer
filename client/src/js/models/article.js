// Filename: models/articles/articleModel
define([
  'underscore',
  'backbone',
  'config'
], function(_, Backbone, config){

    var ArticleModel = Backbone.Model.extend({
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
            notes      : [ ]
        },
        urlRoot    : config.serverRootUrl + "articles",
        idAttribute: "id",
        initialize : function ( ) {
            console.log("Initializing model for article object . . . ");
        },
        validate   : function ( attr ) {
            console.log("Validating model of feed '" + JSON.stringify( attr )  + "' . . .");
        }
  });

  // Return the model for the module
  return ArticleModel;
});
