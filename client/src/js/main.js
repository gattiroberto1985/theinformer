/**
 * File       : main.js
 * Descrizione:
 *       File di configurazione della libreria require.js per l'applicazione.
 *       Vengono definiti le librerie aggiuntive e i percorsi dell'applicazione,
 *       da importare successivamente tramite etichette.
 *       Al termine della configurazione viene eseguito il boot
 *       dell'applicazione, attraverso l'esecuzione dell'opportuno metodo.
 * Versione   : 1.0
 * Changelog  :
 *      2017.11.05 -- prima stesura
 */
require.config({
    // TODO: some info about the shim... #idk ...
    shim: {
        'bootstrap': { "deps": [ 'jquery' ] }
    },
    paths: {
        jquery    : 'libs/jquery-3.2.1',
        underscore: 'libs/underscore-1.8.3', // be sure to download the amd version of the library!
        backbone  : 'libs/backbone-1.3.3'  , // be sure to download the amd version of the library!
        //tether    : 'libs/tether-1.4.0',
        bootstrap : 'libs/bootstrap-3.3.7',
        config    : 'config',                // Application configuration
        //templates : 'http://localhost:3000/static',
        //templates: 'http://www.theinformer.dev:3000/static',
        templates: '../templates',
        text      : 'text'
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                //Override function for determining if XHR should be used.
                //url: the URL being requested
                //protocol: protocol of page text.js is running on
                //hostname: hostname of page text.js is running on
                //port: port of page text.js is running on
                //Use protocol, hostname, and port to compare against the url
                //being requested.
                //Return true or false. true means "use xhr", false means
                //"fetch the .js version of this resource".
                if ( url.endsWith(".html") )
                    return true;
            }
        }
    }

});

/**
 * Application boot. The require.js library automagically load an 'app.js' file
 * in the same directory.
 */
require( ['app'], function( App ) {
    console.log(" [ Main ] Initializing app . . .")
    // The "app" dependency is passed in as "App"
    App.initialize();
});
