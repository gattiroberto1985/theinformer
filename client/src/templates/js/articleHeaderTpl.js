define([], function(){

    return {

        templateStr:    "<% if ( isRead ) { %> " +
                        "<li class='article-read'>" +
                        "<% } else {%>" +
                        "<li class='article-unread'>" +
                        "<% }%>" +
                            "<%= title %>"  +
                        "</li>"
    }
});
