define(['underscore', 
		'backbone', 
		'jquery',
		'text!../Template/EventCardTemplate.html', 
		'eventCardModel', 
		'eventCardView'], 
		function(_, Backbone, $,Template, EventCardModel, EventCardView) {
			
		var AppView = Backbone.View.extend({
		
		el : $("body"),
		statsTemplate : _.template(Template),
		eventCardList : {},
		currentEventCardIndex : -1,
		currentbaseFunIndex : -1,
		views:[],
		cardElement:[],

		events : {
			"keyup" : "createOnEnter",
			"keydown":"preventArrow"
		},

		initialize : function() {
			this.currentEventCardIndex = 0;
			eventCardList = EventCardModel.EventCardModelList.createList();
			eventCardList.fetch().success(this.proxy(this.render));
			this.clientHeight = document.body.clientHeight;
		},

		addOne : function(eventCard) {
			var view = new EventCardView.EventCardView({
				model : eventCard
			});
			this.views.push(view);
			this.$el.append(view.render().el);
			this.cardElement.push(this.$el.find('.event_card:last'));
		},

		render : function() {
			eventCardList.each(this.addOne, this);
			this.init();
			/*初始化默认第一个EventCard为展开状态*/
			var firstCard = this.cardElement[0];
			this.bottomCards = this.$el.find('.bottom_card');
			$(this.bottomCards[0]).height(187);
			this.showShadow(firstCard);
		},

		proxy : function(func) {
			var self = this;
			return (function() {
				return func.apply(self, arguments);
			});
		},
		
		/*-----------------------------added by dehoo huangdong 5-6 start---------------------------------*/
		/**
		 * 图片加载完成再执行里面的方法
		 */
		init : function() {
			for(var j = 0; j < eventCardList.length; j++) {
				(function(d, func_1, func_2, func_3) {
					var img = $(".bottom_card img")[d];
					img.onload = function() {
						var origin_w_h = func_1(eventCardList.models[0].attributes.img_url);

						var img_width = origin_w_h[0];
						var img_height = origin_w_h[1];

						var width_height = func_2(img_width, img_height);

						var img_width_new = width_height[0];
						var img_height_new = width_height[1];

						img.setAttribute("width", img_width_new);
						img.setAttribute("height", img_height_new);

						func_3(img, img_width_new, img_height_new);
					}
				})(j, this.getOriginalSize, this.imageCompress, this.set_img_center);
			}
		},

		/**
		 * 获取资源图片原始的宽(width)和高(height)
		 */
		getOriginalSize : function(path) {
			var image = new Image();
			image.src = path;
			return [image.width, image.height];
		},

		/**
		 * 图片压缩,等比例压缩图片的宽高，使其短的一方与取景器对应的宽高保持一致，另一方取中间部分,返回压缩后图片的宽高
		 */
		imageCompress : function(width_origin, height_origin) {
			if(width_origin >= 500 && height_origin >= 187) {
				var width_compress_rate = 500 / width_origin;
				var height_compress_rate = 187 / height_origin;
				return width_compress_rate >= height_compress_rate ? [500, height_origin * width_compress_rate] : [width_origin * height_compress_rate, 187];
			}
		},

		/**
		 * 控制取景器获取图片的区域，这里是获取图片的中心
		 */
		set_img_center : function(image, width, height) {
			image.style.position = "absolute";
			var width_offset = (width - 500) / 2;
			var height_offset = (height - 187) / 2;
			image.style.top = "-" + height_offset + "px";
			image.style.left = "-" + width_offset + "px";
		},

		/*-----------------------------added by dehoo huangdong 5-6 end----------------------------------*/

		showShadow : function(eventCard) {
			/*创建EventCard阴影*/
			eventCard.removeClass('removeShadow');
			if(!eventCard.hasClass('showShadow')){
				//创建阴影
				eventCard.addClass('showShadow');
			}
		},

		removeShadow : function(eventCard) {
			eventCard.removeClass('showShadow');
			if(!eventCard.hasClass('removeShadow')){
				//创建阴影
				eventCard.addClass('removeShadow');
			}	
		},

		createOnEnter : function(event) {
			var keyCode = event.keyCode;
			event.stopPropagation();

			switch(keyCode) {
				/*左方向键*/
				case 37:
					if(this.currentbaseFunIndex != -1) {
						this.currentbaseFunIndex = -1;
						this.views[this.currentEventCardIndex].leftKey();
					}
					break;
					
				/*右方向键*/
				case 39:					
					this.currentbaseFunIndex = this.views[this.currentEventCardIndex].rightKey(this.currentbaseFunIndex);
					break;

				/*上方向键*/
				case 38:
					if(this.currentbaseFunIndex == -1) {
						/*如果没有拓展功能,如果是最上面的EventCard则不向上聚焦，否则向上聚焦一格*/
						if(this.currentEventCardIndex != 0) {
							//垂直滚动条向上滚动
							this.scrollUp();
							/*向上聚焦一格*/
							if(!this.bottomCards.is(":animated")){
								this.removeShadow(this.cardElement[this.currentEventCardIndex]);
								var bc = $(this.bottomCards[this.currentEventCardIndex]).get(0);
								bc.style.webkitAnimationName = '';
								bc.style.webkitAnimationName = 'slideUpAnimation';
								bc.style.height = 0;
								this.currentEventCardIndex -= 1;
								var bc2 = $(this.bottomCards[this.currentEventCardIndex]).get(0);
								bc2.style.webkitAnimationName = '';
								bc2.style.webkitAnimationName = 'slideDownAnimation';
								bc2.style.height = 187;
								this.showShadow(this.cardElement[this.currentEventCardIndex]);
							}
						}
					} else {
						/*如果已经有拓展功能，则向上聚焦拓展功能,如果已经是最上面一个拓展功能，则保持聚焦不变*/
						this.currentbaseFunIndex = this.views[this.currentEventCardIndex].upKey(this.currentbaseFunIndex);
					}
					break;

				/*下方向键*/
				case 40:
					//如果没有拓展功能
					if(this.currentbaseFunIndex == -1) {
						/*则向下聚焦EventCard,如果已经是最后一个EventCard，则保持聚焦不变*/
						if(this.currentEventCardIndex + 1 != eventCardList.length) {
							//垂直滚动条向下滚动
							this.scrollDown();
							if(!this.bottomCards.is(":animated")){
								this.removeShadow(this.cardElement[this.currentEventCardIndex]);
								var bc = $(this.bottomCards[this.currentEventCardIndex]).get(0);
								bc.style.webkitAnimationName = '';
								bc.style.webkitAnimationName = 'slideUpAnimation';
								bc.style.height = 0;
								this.currentEventCardIndex += 1;
								var bc2 = $(this.bottomCards[this.currentEventCardIndex]).get(0);
								bc2.style.webkitAnimationName = '';
								bc2.style.webkitAnimationName = 'slideDownAnimation';
								bc2.style.height = 187;
								this.showShadow(this.cardElement[this.currentEventCardIndex]);
							}		
						}
					} else {
						/*如果已经有拓展功能，则向下聚焦拓展功能,如果已经是最后一个拓展功能，则保持聚焦不变*/
						this.currentbaseFunIndex = this.views[this.currentEventCardIndex].downKey(this.currentbaseFunIndex);
					}
					break;

				/*Enter键*/
				case 13:
					var url = eventCardList.models[this.currentEventCardIndex].attributes.video_url;
					this.views[this.currentEventCardIndex].enterKey(this.currentbaseFunIndex,url);
					break;

				default:
					break;
			}
		},
		preventArrow:function(e)
		{
			var keyCode = e.keyCode;
			e.stopPropagation();
			switch(keyCode) {
				
				/*上方向键*/
				case 38:
				/*下方向键*/
				case 40:
						e.preventDefault();
					break;
				default:
					break;
			}
		},
		scrollUp:function(){
			var x = (180/this.$el.height())*this.clientHeight;
			this.$el.scrollTop(this.$el.scrollTop()-x);
		},
		scrollDown:function(){
			var x;
			if(this.currentEventCardIndex==0){
				x = (60/this.$el.height())*this.clientHeight;
			}
			else{
				x = (180/this.$el.height())*this.clientHeight;
			}
			this.$el.scrollTop(this.$el.scrollTop()+x);
		}
	});
	return AppView;
});

