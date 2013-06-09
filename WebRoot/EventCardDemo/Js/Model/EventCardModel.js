//定义EventCard模块
define(['model', 'backbone', 'jquery'], function (Model, Backbone, $) {
	
	//添加EventCard类基本功能
    var eventCardModel = Backbone.Model.extend(Model.Model);
    //添加EventCard实例额外功能
    $.extend(eventCardModel.prototype, {
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
    $.extend(eventCardModel, {
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
    var eventCardModelList = Backbone.Collection.extend({
        model: eventCardModel,
        url: "http://192.168.1.120:8080/files/source.json"
        
    });
	
	//EventCard列表初始化
    $.extend(eventCardModelList, {
        createList: function (o) {
            var list = new this;

            if(o){
            	list.add(o);
            }
            return list;
        }
    });

    return { EventCardModel: eventCardModel,
        EventCardModelList: eventCardModelList
    };
});
