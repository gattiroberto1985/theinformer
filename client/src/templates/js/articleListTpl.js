// Filename: articleContentTpl
define([], function(){

    return {
        templateStr: '<ul> ' +
            '    <% _.each(articles, function(article){ %> ' +
            '        <% if ( article.get('isRead') ) { %> ' +
            '            <li class="read"> ' +
            '        <% } else {%> ' +
            '            <li class="unread"> ' +
            '        <% }%> ' +
            '            <%= article.get('title') %> ' +
            '    </li><% }); %> ' +
            '</ul>';
    }
});
