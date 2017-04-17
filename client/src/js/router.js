// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/titleView',
  'views/feeds/feedListView',
  'views/articles/articleHeaderListView'
], function($, _, Backbone, TitleView, FeedListView, ArticleHeaderListView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/': 'load',
      //'/users': 'showUsers',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
        console.log("Initializing router . . . ");
        var app_router = new AppRouter();
        console.log("Creating views . . . ");
        var feedListView = new FeedListView();
        var articleHeaderListView = new ArticleHeaderListView();
        var titleView = new TitleView();
        //titleView.render();
        //feedListView.render();
        //articleHeaderListView.render();
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
