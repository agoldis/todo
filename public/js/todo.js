require.config({
    baseUrl: "js",
    paths: {
        'jquery' : '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery',
        'underscore' : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore',
        'backbone' : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone',
        'text' : 'vendors/text',
        'templates' : '../templates'
    },
    shim: {
        'backbone' : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore' : {
            exports: '_'
        }
    }
});
require([
        'jquery',
        'routers/router'
    ],
    function ($,Router) {
        var ENTER_KEY = 13;
        $(function () {
            new Router()
        }());
    }
);