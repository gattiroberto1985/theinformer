// Bootstrap file for the application
require.config({
    shim: {
        'bootstrap': { "deps": [ 'jquery' ] }
    },
    paths: {
        jquery    : 'libs/jquery-3.2.1',
        underscore: 'libs/underscore-1.8.3', // be sure to download the amd version of the library!
        backbone  : 'libs/backbone-1.3.3'  , // be sure to download the amd version of the library!
        //tether    : 'libs/tether-1.4.0',
        bootstrap : 'libs/bootstrap-3.3.7',
        config    : 'config',
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

require( ['app'], function( App ) {
    console.log("initializing app . . .")
    // The "app" dependency is passed in as "App"
    App.initialize();
});
