// Filename: views/article/articleContentView
define([
  'jquery',
  'underscore',
  'backbone',
  //'templates/js/articleListTpl'
  'models/Article',
  //'text!templates/articles/articleContentTpl.html'
  'templates/js/articleContentTpl'
], function($, _, Backbone, Article, articleContentTemplate){

    var ArticleContentView = Backbone.View.extend({

        //el        : $("#article-content"),

        initialize: function( /*options*/ ) { },

        render    : function( ) {
            console.log(" [ ArticleContentView ] Rendering article content . . .");
            var template = _.template( articleContentTemplate.templateStr );
            var html = template(this.model.toJSON());
            this.$el.html( html );
            return this;
        }
    });

    // Returning instantiated views can be quite useful for having "state"
    return ArticleContentView;
});
