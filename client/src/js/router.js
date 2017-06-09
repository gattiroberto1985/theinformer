// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/titleView',
  'views/feeds/feedListView',
  'views/articles/articleHeaderListView',
  'views/articles/articleContentView'
], function($, _, Backbone, TitleView, FeedListView, ArticleHeaderListView, ArticleContentView){
    var paramsToObject = function(params) {
        if (!params)
            return {};
        var paramsArray = _.map(params.split(';'), function(str) {
            return str.split('=');
        });
        var obj = {};
        _.each(paramsArray, function(arr) {
            obj[arr[0]] = arr[1];
        });

        return obj;
    };

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '/'           : '',
            'alert'       : 'alert',
            'show/*params': 'show',
            'admin'       : 'admin'
        },
        show: function ( params ) {
            var objParam = paramsToObject(params);
            console.log ( JSON.stringify ( objParam ) ) ;
        },
        alert: function ( ) { console.log( "Hello!"); }
    });


  var initialize = function(){
        console.log("Initializing router . . . ");
        var app_router = new AppRouter();
        console.log("Creating views . . . ");
        var feedListView          = new FeedListView();
        var articleHeaderListView = new ArticleHeaderListView( [], { feedId: "" });
        var titleView             = new TitleView();
        var articleContentView    = new ArticleContentView( [],  { articleId: "" });
        app_router.on('load', function(){
            // Call render on the module we loaded in via the dependency array
            // 'views/projects/list'
        });

        app_router.on('defaultAction', function(actions){
            // We have no matching route, lets just log what the URL was
            console.log('No route:', actions);
        });

        Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});
