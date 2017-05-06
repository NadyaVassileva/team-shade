SystemJS.config({
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        
        //Libraries
        'jquery': './node_modules/jquery/dist/jquery.js',
        'sammy': './node_modules/sammy/lib/sammy.js',
        'handlebars': './node_modules/handlebars/handlebars.js',

        //Utils
        'templateLoader': './js/utils/template-loader.js',
        'requester' : '.js/utils/requester.js',

        //Main
        'app': '/js/app.js',
    },
        'transpiler': 'plugin-babel',
});

System.import('app');
