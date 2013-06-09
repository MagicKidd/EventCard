define(['underscore', 
		'backbone', 
		'jquery',
		'tvModel', 
		'eventCardView'], 
		function(_, Backbone, $, TVModel, EventCardView) {
			
		var TvView = Backbone.View.extend({
		
		el : $("body"),
		container:$("#container"),
		cardElement:[],
		tvList : {},
		_LARGESCREEN_:1920,
		title:$("#title"),
		pageFocus:-1,
		cardIndex:-1,
		length:0,
		mode:1,
		interval:0,
		currentbaseFunIndex:-1,
		views:[],
		
		events : {
			"keydown" : "keyDown",
		},
		
		initialize : function() {

			this.tvList = TVModel.TVModelList.createList();
//			this.tvList = TVModel.TVModelList.fetchData();
			if(window.screen.width==this._LARGESCREEN_){
				this.container.addClass("tv1920_1080");
				this.title.addClass("title1920_1080");
				this.tvList.url = "http://192.168.1.109:8080/EventCard/servlet/ECDServlet";
				this.$el.css({"background-image":"url(../Images/1920_1080shine.png)"});
			}else{
				this.container.addClass("tv1280_720");
				this.title.addClass("title1280_720");
				this.tvList.url = "http://192.168.1.109:8080/EventCard/servlet/ECDServlet";
				this.$el.css({"background-image":"url(../Images/1280_720shine.png)"});
			}
			//页面焦点
			this.pageFocus = 0;
//			this.render();
			this.tvList.fetch().success(this.proxy(this.render));
		},
		
		proxy : function(func) {
			var self = this;
			return (function() {
				return func.apply(self, arguments);
			});
		},
		
		addOne : function(eventCard) {
			var view = new EventCardView.EventCardView({
				model : eventCard
			});
			this.views.push(view);
			this.container.append(view.render().el);
			var card = this.$el.find('.event_card:last');
			card[0].style.webkitAnimationName = 'zAnimation';
			card[0].style["-webkit-animation-duration"]=(500+this.interval*100)+"ms";
			this.interval++;
			this.cardElement.push(card);
			card.addClass("clear");
		},

		render : function() {
			this.tvList.each(this.addOne, this);
			if(window.screen.width==this._LARGESCREEN_){
				for(var i = 0;i<3;i++){
					$(this.cardElement[i]).css({"margin":"0px 62.5px 0px 62.5px"});
				}
			}else{
				for(var i = 0;i<3;i++){
					$(this.cardElement[i]).css({"margin":"1px 40.5px 0px 40.5px"});
				}
			}
			
			this.length = this.tvList.length;
			var clearString = "<div style='clear:both;'></div>";
			this.container.append(clearString);
			this.$el.append(clearString);
		},
		keyDown : function(event) {
			var keyCode = event.keyCode;
			event.stopPropagation();
			
			if(this.mode){
				
				if(this.pageFocus==-1){
					this.removeShadow(this.cardElement[this.cardIndex]);
				}
					
				switch(keyCode) {
					/*左方向键*/
					case 37:
						if(this.pageFocus==-1){
							//非页面焦点
							this.cardIndex==0?this.cardIndex = this.length-1:this.cardIndex--;
						}
						else{
							//页面焦点
							//暂时什么都不做
						}
						break;
					
					/*右方向键*/
					case 39:
						if(this.pageFocus==-1){
							//非页面焦点
							this.cardIndex==this.length-1?this.cardIndex=0:this.cardIndex++;
						}
						else{
							//页面焦点
							//暂时什么都不做
						}			
						break;
	
					/*上方向键*/
					case 38:
						if(this.pageFocus==-1){
							//非页面焦点
							if(Math.floor(this.cardIndex/3)==0){
								this.cardIndex = -1;
								this.pageFocus = 0;
								if(window.screen.width==this._LARGESCREEN_){
									this.$el.css({"background-image":"url(../Images/1920_1080shine.png)"});
								}else{
									this.$el.css({"background-image":"url(../Images/1280_720shine.png)"});
								}
							}
							else{
								this.cardIndex-=3; 
							}
						}
						else{
							//页面焦点
							this.pageFocus = -1;
							if(window.screen.width==this._LARGESCREEN_){
									this.$el.css({"background-image":"url(../Images/1920_1080bg.png)"});
							}else{
									this.$el.css({"background-image":"url(../Images/1280_720bg.png)"});
							}
							this.cardIndex = Math.floor((this.length-1)/3)*3;
						}
						break;
	
					/*下方向键*/
					case 40:
						if(this.pageFocus==-1){
							//非页面焦点
							if(Math.floor(this.cardIndex/3)==Math.ceil(this.length/3)-1){
								this.cardIndex = -1;
								this.pageFocus = 0; 
								if(window.screen.width==this._LARGESCREEN_){
									this.$el.css({"background-image":"url(../Images/1920_1080shine.png)"});
								}else{
									this.$el.css({"background-image":"url(../Images/1280_720shine.png)"});
								}
							}
							else{
								var next =  this.cardIndex +3;
								if(next<=this.length-1){
									this.cardIndex+=3; 
								}else{
									this.cardIndex = -1;
									this.pageFocus = 0;
									if(window.screen.width==this._LARGESCREEN_){
										this.$el.css({"background-image":"url(../Images/1920_1080shine.png)"});
									}else{
										this.$el.css({"background-image":"url(../Images/1280_720shine.png)"});
									}
								}
							}
						}
						else{
							//页面焦点
							this.pageFocus = -1;
							if(window.screen.width==this._LARGESCREEN_){
									this.$el.css({"background-image":"url(../Images/1920_1080bg.png)"});
							}else{
									this.$el.css({"background-image":"url(../Images/1280_720bg.png)"});
							}
							this.cardIndex = 0;
						}
						break;
	
					/*Enter键*/
					case 13:
						if(this.pageFocus==-1){
							//非页面焦点
							this.container.html("");
							this.container.append(this.views[this.cardIndex].render().$el.addClass('center_card'));
							this.cardElement[this.cardIndex] = this.$el.find(".event_card");
							this.mode = 0;
							this.currentbaseFunIndex = -1;
						}
						break;
					default:
						break;
				}
			}
			else{
				switch(keyCode) {
					/*Android里的P键*/
					/*PC里的shift键*/
					case 16:
					case 80:
						/**返回键处理*/
						this.container.html("");
						this.container.append(this.title);
						if(window.screen.width==this._LARGESCREEN_){
							this.title.addClass("title1920_1080");
						}else{
							this.title.addClass("title1920_1080");
						}
						this.mode = 1;
						this.currentbaseFunIndex = -1;
						
						/**返回的时候重新渲染数据，相当于时时刷新*/
						this.tvList = null;
						this.views = [];
						this.tvList = TVModel.TVModelList.fetchData();
						this.render();//--------------
						this.cardElement=[];
						
						if(window.screen.width==this._LARGESCREEN_){
							for(var i =0; i<this.$el.find(".event_card").length;i++){
								this.cardElement.push(this.$el.find(".event_card").eq(i));
								if(i<3){
									this.$el.find(".event_card").eq(i).addClass("clear");
									this.$el.find(".event_card").eq(i).css({"margin":"0px 62.5px 0px 62.5px"});
								}
							}
							this.$el.css({"background-image":"url(../Images/1920_1080shine.png)"});
						}else{
							for(var i =0; i<this.$el.find(".event_card").length;i++){
								this.cardElement.push(this.$el.find(".event_card").eq(i));
								if(i<3){
									this.$el.find(".event_card").eq(i).addClass("clear");
									this.$el.find(".event_card").eq(i).css({"margin":"1px 40.5px 0px 40.5px"});
								}
							}
							this.$el.css({"background-image":"url(../Images/1280_720shine.png)"});
						}
						this.cardIndex = -1;
						this.pageFocus = 0;
						break;
					/*左方向键*/
					case 37:
						if(this.currentbaseFunIndex != -1) {
							this.currentbaseFunIndex = -1;
							this.views[this.cardIndex].leftKey();
						}
						break;
					
					/*右方向键*/
					case 39:
						/**这里的id还是从服务器获取*/
						window.preference.getId(this.tvList.models[this.cardIndex].attributes["id"]);
						//------------------------
						var request = new XMLHttpRequest();
						request.open("GET", "http://192.168.1.109:8080/EventCard/servlet/ECDServlet?id=" + this.tvList.models[this.cardIndex].attributes["id"]);
						request.send(null);
						//-------------------------
						this.currentbaseFunIndex = this.views[this.cardIndex].rightKey(this.currentbaseFunIndex);	
						break;
	
					/*上方向键*/
					case 38:
						if(this.currentbaseFunIndex != -1) {
							/*如果已经有拓展功能，则向上聚焦拓展功能,如果已经是最上面一个拓展功能，则保持聚焦不变*/
							this.currentbaseFunIndex = this.views[this.cardIndex].upKey(this.currentbaseFunIndex);
						}
						break;
	
					/*下方向键*/
					case 40:
						if(this.currentbaseFunIndex != -1) {
							/*如果已经有拓展功能，则向下聚焦拓展功能,如果已经是最后一个拓展功能，则保持聚焦不变*/
							this.currentbaseFunIndex = this.views[this.cardIndex].downKey(this.currentbaseFunIndex);
						}
						break;
					/*Enter键*/
				case 13:
					var url = this.tvList.models[this.cardIndex].attributes.video_url;
					this.views[this.cardIndex].enterKey(this.currentbaseFunIndex,url);
					break;
					
				default:
						break;
				}
			}
			if(this.cardIndex!=-1){
				this.showShadow(this.cardElement[this.cardIndex]);	
			}
		},
		
		showShadow : function(eventCard) {
			if(eventCard.hasClass('clear')){
				//创建阴影
				eventCard.removeClass('clear');
			}
			eventCard.find(".top_card").css({"background-color":"white"});
		},

		removeShadow : function(eventCard) {
			if(!eventCard.hasClass('clear')){
				//创建阴影
				eventCard.addClass('clear');
			}
			eventCard.find(".top_card").css({"background-color":"transparent"});	
		}
	});
	return TvView;
});

