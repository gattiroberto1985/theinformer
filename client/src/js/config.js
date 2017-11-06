/**
 * File       : config.js
 * Descrizione:
  *       Definizioni di parametri e proprieta' comuni per l'applicazione.
 * Versione   : 1.0
 * Memo       :
 *        2017.11.05 -- Capire se l'utilizzo di questo file e' corretto o se
 *                      backbone debba essere usato in altra maniera.
 * Changelog  :
 *        2017.11.05 -- Refactoring
 */
define([], function( ){

    return {
        serverRootUrl: 'http://localhost:3000/rest/',
        router       : { },
        htmlIds      : [
            { "view_managerfeed_btn_addfeed"        : "add-feed"          },
            { "view_managerfeed_btn_markallasread"  : "mark-all-as-read"  },
            { "view_managerfeed_btn_refreshallfeeds": "refresh-all-feeds" }
        ]
    };
});
