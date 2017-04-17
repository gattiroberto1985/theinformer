// Filename: views/feed/feedListView
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/feedCollection',
  'text!templates/feeds/feedListTpl.html'
], function($, _, Backbone, FeedCollection, feedListTemplate){

    var FeedListView = Backbone.View.extend({
        el: $("#feedlist"),

        initialize: function(){
            console.log("Initializing feed collection . . .");
            this.collection = new FeedCollection();
            _.bindAll(this, 'render');
            this.collection.fetch({reset: true, success: this.render  }, this);

            //this.collection.on("reset", this.)
            // Compile the template using Underscores micro-templating
            //console.log( feedListTemplate );
            /*var compiledTemplate = _.template( feedListTemplate)({ feeds: this.collection.models } );
            this.$el.html(compiledTemplate);*/
        },

        render: function(){
            console.log("Rendering feed list . . .");
            //console.log( JSON.stringify( feeds ) );
            console.log( JSON.stringify( this.collection ) );
            var data = {
                feeds: this.collection.models,
                _: _
            };

            var compiledTemplate = _.template( feedListTemplate) ( data );
            $("#feedlist").html( compiledTemplate );
        }

  });
  // Returning instantiated views can be quite useful for having "state"
  return FeedListView;
});
