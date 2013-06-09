//定义EventCard模块
define(['model', 'backbone', 'jquery'], function (Model, Backbone, $) {
	
	//添加EventCard类基本功能
    var tvModel = Backbone.Model.extend(Model.Model);
    //添加EventCard实例额外功能
    $.extend(tvModel.prototype, {
        init: function (atts) {
            if (atts) {
                this.load(atts);
            }
        },
        load: function (attributes) {
            for (var name in attributes) {
                this[name] = attributes[name];
            }
        },
        extend: function (o) {
            $.extend(this, o);
        },
        include: function (o) {
            $.extend(this.prototype, o);
        }
    });
	//添加EventCard类创建功能
    $.extend(tvModel, {
        createInstance: function (o) {
            var instance = new this;
            if (!o) {
            	//默认初始化
                instance.init({ title_1: "zard",title_2: "zard", img_url: "zardzardzard3" });
            }
            else {
            	//用户自定义初始化
                instance.init(o);
            }
            return instance;
        }
    });

	//创建EventCard列表
    var tvModelList = Backbone.Collection.extend({
        model: tvModel,
        url: "http://192.168.1.109:8080/EventCard/servlet/ECDServlet"
        
    });
	
	//EventCard列表初始化
    $.extend(tvModelList, {
        createList: function (o) {
            var list = new this;

            if(o){
            	list.add(o);
            }
            return list;
        },

		fetchData: function(){
        	var list = new this;
        	var data = window.preference.getData();
			console.log("fetchData data = " + data);
			var json = eval(data);
			list.add(json);
			console.log("json == " + json[0].title_1);
			return list;
        },
        
        clearDate: function(){
        	
        }
    });

    return { TVModel: tvModel,
        TVModelList: tvModelList
    };
});
