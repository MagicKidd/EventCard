//定义Model模块
define(function () {

    if (typeof Object.create !== "function") {
        Object.create = function (o) {
            function f() { }
            f.prototype = o;
            return new F();
        };
    }

    var model = {
		//模型基本功能
        baseFunction1: function () { alert("Base function1") },
        baseFunction2: function () { alert("Base function2") },
        baseFunction3: function () { alert("Base function3") },

        create: function () {
            var object = Object.create(this);
            object.parent = this;
            object.prototype = object.fn = Object.create(this.prototype);
        }
    };
    return {
        Model: model
    };
});