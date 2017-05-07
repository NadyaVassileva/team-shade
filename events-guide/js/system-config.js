SystemJS.config({
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        
        //Libraries
        'jquery': './node_modules/jquery/dist/jquery.js',
        'sammy': './node_modules/sammy/lib/sammy.js',
        //not AMD handlebars!
        'handlebars': './node_modules/handlebars/dist/handlebars.js',

        //Data
        'Kinvey': 'js/utils/kinvey-html5-sdk.min.js',

        //Utils
        'templateLoader': '/js/utils/template-loader.js',
        'requester' : '/js/utils/requester.js',
        'data': 'js/utils/data.js',

        //Controllers
        'homeController':'/js/controllers/home-controller.js',
        'userController':'/js/controllers/user-controller.js',

        //Main
        'app': '/js/app.js',
    },
        'transpiler': 'plugin-babel',
});

System.import('app');
