// Filename: articleContentTpl
define([], function(){

    return {
        templateStr:    "<li>" +
                            "<%= title %>" +
                            "<span class='pull-right'>" +
                                "<span class='badge'>" +
                                    "5 <!-- <%= unread %> -->" +
                                    "<button class='glyphicons glyphicons-refresh' />" +
                                    "<button class='glyphicons glyphicons-delete' />" +
                                "</span>" +
                            "</span>" +
                        "</li>"
    }
});
