//调用非模块化js
require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'tvModel': {
            deps: ['model'],
            exports: 'TVModel'
        }
    },
    paths: {
        "underscore": "Lib/underscore",
        "backbone": "Lib/backbone",
        "model": "Model/Model",
        "tvModel": "Model/TVModel",
        "jquery": "Lib/jquery",
        'eventCardView':"../View/EventCardView",
        'tvView': "../View/TVMainView"
    }
});

//主页js
require(['underscore', 
		 'backbone', 
		 'model', 
		 'tvModel', 
		 'jquery',
		 'eventCardView',
		 'tvView'], 
		function (_, Backbone, Model, TVModel, $,EventCardView,TvView) {
		    var tvView = new TvView();
		}
	);
