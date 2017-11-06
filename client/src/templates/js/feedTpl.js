// Filename: articleContentTpl
define([], function(){

    return {
        templateStr:    "<div>" +
                            "<%= title %>" +
                            "<span class='pull-right'>" +
                                "<span class='badge'>" +
                                    "<%= unread %>" +
                                "</span> " +
                                "<button id='feed-refresh' class='glyphicon glyphicon-refresh' />" +
                                "<button id='feed-delete'  class='glyphicon glyphicon-trash' />" +
                            "</span>" +
                        "</div>"
    }
});
