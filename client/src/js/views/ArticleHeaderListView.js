// Filename: views/article/articleListView
define([
  'jquery',
  'underscore',
  'backbone',
  'models/Article',
  'collections/ArticlesCollection',
  'views/ArticleHeaderView'
//  'text!templates/articles/articleListTpl.html'
], function($, _, Backbone, Article, ArticlesCollection, ArticleHeaderView/*, articleListTemplate*/ ){

    var ArticleListView = Backbone.View.extend({
        tagName: "ul",
        //el: ("#articles"),
        //tagName: "table",

        initialize: function( options ){
            console.log(" [ ArticleListView ] Initializing article collection view . . .");
            //this.bus = options.bus;
            //this.model.on("add"   , this.addArticle, this);
            this.model.on("remove", this.delArticle, this);

            /*this.collection = new ArticlesCollection();
            _.bindAll(this, 'render');
            this.collection.fetch({reset: true, success: this.render  }, this);*/
        },

        delArticle: function ( article ) {
            console.log(" [ ArticleListView ] Deleting article . . .");
        },

        render: function(){
            console.log(" [ ArticleListView ] Rendering article list . . .");
            var self = this;
            //self.$el.find("tbody");
            this.model.each(
                function ( article ) {
                    var articleHeaderView = new ArticleHeaderView({ model: article } );
                    var el2Add = articleHeaderView.render().$el;
                    //console.log( " [ ArticleHeaderListView ] --> Adding new ArticleHeaderView to $el: '" );
                    //console.log( el2Add.html() );

                    self.$el.append( el2Add );
                    //console.log(" [ ArticleHeaderListView ] --> ul length: " + self.$el.children().length );
            }); // closing each
            $("#articlelist").html( this.$el );
            return this;
        }

    });
    // Returning instantiated views can be quite useful for having "state"
    return ArticleListView;
});
