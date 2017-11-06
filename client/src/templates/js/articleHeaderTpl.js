define([], function(){
    return {

        /*
         *                 _________________________________________
                         | <mark>| <art_title>         <categories>
                         |_________________________________________|
         */

        templateStr:    "<% if ( isRead ) { %> " +
                        "<li class='article-read'>" +
                        "<% } else {%>" +
                        "<li class='article-unread'>" +
                        "<% }%>" +
                            "<button class='glyphicon glyphicon-ok'/>" +  // TODO: "V" icon!
                            "<%= title %>"  +
                            "<span class='pull-right'>" +
                                "<% if ( author ) { author } %>" +
                                " on " +
                                " <%if ( publishDate ) { publishDate } %> " +
                                //"<% for ( var c in categories ) { c.name + ', ' } %>" // TODO: syntax check. Logical controls if no categories
                            "</span>" +
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
