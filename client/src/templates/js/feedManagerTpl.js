/**
 * File       : feedManagerTpl.js
 * Descrizione:
 *        Template javascript per la view relativa alla gestione dei feed.
 *        Contiene :
 *          - tasto refresh per l'azione di aggiornamento di tutti i feed;
 *          - tasto markAsRead per l'azione di conferma lettura di tutti gli
 *            articoli non letti dei feed;
 *          - un form a tre campi contenente:
 *               - una casella di testo per il nome del feed;
 *               - una casella di testo per l'url del feed;
 *               - un tasto di sottomissione del form.
 * Versione   : 1.0
 * Changelog  :
 *              - Gestione errori in arrivo dal server post tentativo di
 *                inserimento.
 */

define([], function(){

    return {
        templateStr:    "<div>" +
                            "<p>" +
                                "<span class='pull-left'>" +
                                    "<button id='refresh-all-feeds' class='glyphicons glyphicons-refresh' />" +
                                    // <span class="glyphicons glyphicons-ok-circle"></span>
                                    "<button id='mark-all-as-read' class='glyphicons glyphicons-ok-circle' />" +
                                "</span>" +
                            "</p>" +
                            "<div>" +
                                "<div class='form-group'>" +
                                    "<label for='newFeedName'>Name</label>" +
                                    "<input type='text' class='form-control' id='newFeedName' placeholder='Feed name . . .'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<input type='text' class='form-control' id='newFeedUrl'  placeholder='Feed url . . .'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<input type='text' class='form-control' id='newFeedTag'  placeholder='Feed category . . .'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<button id='add-feed' class='btn btn-primary'>Inserisci</button>" + // type='submit'
                                "</div>" +
                            "</div>" +
                        "</div>"
    }
});
