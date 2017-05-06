SystemJS.config({
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        
        //Libraries
        'jquery': './node_modules/jquery/dist/jquery.js',
        'sammy': './node_modules/sammy/lib/sammy.js',
        'handlebars': './node_modules/handlebars/handlebars.js',

        //Utils
        'templateLoader': './scripts/templates.js',
        'requester' : './utils/requester.js',

        //Main
        'app': '/scripts/app.js',
    },
        'transpiler': 'plugin-babel',
});

System.import('app');
