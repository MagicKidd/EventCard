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
        'eventCardModel': {
            deps: ['model'],
            exports: 'EventCardModel'
        }
    },
    paths: {
        "underscore": "Lib/underscore",
        "backbone": "Lib/backbone",
        "model": "Model/Model",
        "eventCardModel": "Model/EventCardModel",
        "jquery": "Lib/jquery",
        'eventCardView':"../View/EventCardView",
        'appView': "../View/AppView"
    }
});

//主页js
require(['underscore', 
		 'backbone', 
		 'model', 
		 'eventCardModel', 
		 'jquery',
		 'eventCardView',
		 'text!../Template/EventCardTemplate.html',
		 'appView'], 
		function (_, Backbone, Model, EventCardModel, $,EventCardView,Template,AppView) {
		    var app = new AppView();
		}
	);
