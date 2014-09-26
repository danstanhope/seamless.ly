var SeamLess = SeamLess || {};

SeamLess = (function() {
	"use strict";	

	if(!window.postMessage){
		throw("browser doesn't support postMessage.")
	}
	var _util = {
		getBodyHeight : function(){
			var body = document.body,
			    html = document.documentElement;

			return Math.max( body.scrollHeight, body.offsetHeight, 
			                 html.clientHeight, html.scrollHeight, html.offsetHeight );			
		}
	};

	var _events = {
		config :{
			method : '',
			message : '',
			window : '',
			origin : ''
		},
		init : function(params){
			this.config.window = params.window;
			this.config.origin = params.origin;

			if(window.addEventListener){
				this.config.method = "addEventListener";
			}else{
				this.config.method = "attachEvent";
			}

			if(this.config.method === "attachEvent"){
				this.config.message = "onmessage";
			}else{
				this.config.message = "message";
			}			
		},
		message : function(callback){	
			window[this.config.method](this.config.message,function(e) {	
				var data = e.data;
				if(typeof callback === 'function'){
					callback.call(true, data);	
				} 
			},false);			
		}
	};

	return {
		config : function(params){
			var s = {};

			_events.init(params);
			
			s = {
				send : function(data){
					params.window.postMessage(data, params.origin);					
				},
				receive : function(callback){
					_events.message(function(data){
						if(typeof callback === 'function'){
							callback.call(true, data);	
						} 						
					});
				},
				sendHeight : function(){
					var bodyHeight = _util.getBodyHeight();

					s.send({ height : bodyHeight});
				},
				receiveHeight : function(){
					s.receive(function(data){
						if(data && data.height){
							if(params.frameId && params.frameId !== ''){
								document.getElementById(params.frameId).style.height = data.height + 'px';
							}else{
								throw('Please specify your iframe id');
							}							
						}						
					});
				},
				sendStyle : function(elements){
					if(elements.length === 0){
						throw('Please specify an array of DOM elements');
					}

					s.send({ arr : elements });
				},
				getStyle : function(){
					
				}
			};

			return s;
		}
	};
})();	


