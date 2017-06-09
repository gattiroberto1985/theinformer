// Filename: articleContentTpl
define([], function(){

    return {
        templateStr: '<div id="article-container">' +
        '    <h1> ' +
        '        <a href="<%=article.get('url')%>"><%= article.get('title') %></a> ' +
        '    </h1> ' +
        '    <div id="article-body-container"> ' +
        '        <%= article.get('content') %> ' +
        '    </div> ' +
        '</div> ';
    }
});
