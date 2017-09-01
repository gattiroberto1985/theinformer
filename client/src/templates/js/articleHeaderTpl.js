define([], function(){
    return {

        templateStr:    "<% if ( isRead ) { %> " +
                        "<li class='article-read'>" +
                        "<% } else {%>" +
                        "<li class='article-unread'>" +
                        "<% }%>" +
                            "<%= title %>"  +
                        "</li>"
        // Autore -- Data pubbl. -- Titolo -- Punteggio -- Tags
        /*templateStr:    "<tr>" +
                        "<td> <%= author %> </td>" +
                        "<td> <%= publishDate %></td>" +
                        "<td> <%= title %></td>" +
                        "<td> <%= rate %></td>" +
                        "<td> <%= tags %></td>" +
                        "</tr>"*/
    }
});
