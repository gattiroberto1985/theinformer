// Filename: articleContentTpl
define([], function(){

    return {
        templateStr: '<div class="jumbotron"> ' +
        '    <h1><%= title.title %></h1>' +
        '    <p><%= title.subtitle %></p>' +
        '</div>';
    }
});
