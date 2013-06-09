//定义EventCardView
define(['underscore', 'backbone', 'jquery'], 
		function(_, Backbone, $) {
	var eventCardView = Backbone.View.extend({
		
		template :_.template(document.getElementById("tmpl").value),
		events : {},
		_LARGESCREEN_:1920,

		render : function() {
			this.$el.css({"float":"left"});
			this.$el.html(this.template(this.model));
			return this;
		},

		initialize : function() {
		},
		
		//左方向键
		leftKey:function(){
			var expander = this.$el.find(".expan_div");
			var images = expander.find("img");
			for(var i = 0; i < images.length; i++) {
				images[i].src = "../Images/expan_fun.png";
			};
			expander.hide();
		},
		
		//右方向键
		rightKey:function(currentbaseFunIndex){
			var currentFlipers = this.$el.find(".expan_div #f1_container");
			if(currentbaseFunIndex != -1) {
				var currentFun = currentFlipers.eq(currentbaseFunIndex);
				/*当前某个基本功能被聚焦，播放动画*/
				//播放动画前，清空之前添加的动画
				var element = currentFun.find('#f1_card')[0];
				element.addEventListener('webkitAnimationEnd', function() {
					this.style.webkitAnimationName = '';
				}, false); 
				element.style.webkitAnimationName = 'flipAnimation';
				return currentbaseFunIndex;
			} else {
				/*当前没有基本功能被聚焦，但是有某个EventCard被聚焦,则显示该EventCard的拓展功能，并聚焦拓展功能的第一个*/
				this.$el.find(".event_card .expan_div").show();
				var images = currentFlipers.eq(0).find("img");
				for(var i = 0; i < images.length; i++) {
					images[i].src = "../Images/expan_fun_f.png";
				}
				return 0 ;
			}
		},
		
		//上方向键
		upKey:function(currentbaseFunIndex){
			if(currentbaseFunIndex != 0) {
				var container = this.$el.find(".expan_div #f1_container");
				var images = container.eq(currentbaseFunIndex).find('img');
				for(var i = 0; i < images.length; i++) {
					images[i].src = "../Images/expan_fun.png";
				};
				currentbaseFunIndex -= 1;
				var focusImages = container.eq(currentbaseFunIndex).find("img");
				for(var i = 0; i < focusImages.length; i++) {
					focusImages[i].src = "../Images/expan_fun_f.png";
				};
			}
			return currentbaseFunIndex;
		},
		
		//下方向键
		downKey:function(currentbaseFunIndex){
			if(currentbaseFunIndex != 2) {
				var container = this.$el.find(".expan_div #f1_container");
				var images = container.eq(currentbaseFunIndex).find('img');
				for(var i = 0; i < images.length; i++) {
					images[i].src = "../Images/expan_fun.png";
				};
				currentbaseFunIndex += 1;
				var focusImages = container.eq(currentbaseFunIndex).find("img");
				for(var i = 0; i < focusImages.length; i++) {
					focusImages[i].src = "../Images/expan_fun_f.png";
				};
			}
			return currentbaseFunIndex;
		},
		
		//Enter键
		enterKey:function(currentbaseFunIndex,url){
			if(currentbaseFunIndex == -1) {
				// alert("Go to video plays!");
				window.location = "video.html#" + url;
			}
		}
	});
	return {
		EventCardView : eventCardView
	};
});
