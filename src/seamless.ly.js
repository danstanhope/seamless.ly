var SeamLess = SeamLess || {};

SeamLess = function(params) {
	"use strict";
	var self = this;	

	if(!window.postMessage){
		throw("browser doesn't support postMessage.")
	}
	if( !window.getComputedStyle) {
	    window.getComputedStyle = function(e) {return e.currentStyle};
	}

	var _util = {
		getBodyHeight : function(){
			var body = document.body,
			    html = document.documentElement;

			return Math.max( body.scrollHeight, body.offsetHeight, 
			                 html.clientHeight, html.scrollHeight, html.offsetHeight );			
		},
		getElementStyle : function(ele, frameId){			
			var element = document.createElement(ele.toUpperCase()),
				frame = document.getElementById(frameId),
				styles = {},
				computed = {};

			frame.parentNode.appendChild(element);	

			computed = window.getComputedStyle(
				element
			);

			styles = {
				'element' 		: ele,
			    'color' 		: computed.getPropertyValue('color'),
			    'font-family' 	: computed.getPropertyValue('font-family'),
			    'font-size' 	: computed.getPropertyValue('font-size'),
			    'font-weight' 	: computed.getPropertyValue('font-weight'),
			};

			element.remove();

			return styles;		
		},
		injectStyles : function(styles){
			var css = '',
			    head = document.head || document.getElementsByTagName('head')[0],
			    style = document.createElement('style');

			for(var i = 0; i < styles.length; i++){
				css += 'body ' + styles[i].element + ' { ';	
				css += ' font-family : ' + styles[i]['font-family'] + ' ;';
				css += ' font-size : ' + styles[i]['font-size'] + ' ;';
				css += ' font-weight : ' + styles[i]['font-weight'] + ' ;';
				css += ' color : ' + styles[i]['color'] + ' ;';
				css += '} ';			
				
				if(styles[i].element === 'a'){
					css += '.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus { ';
					css += ' background-color : ' + styles[i]['color'] + ' ;';
					css += ' border-color : ' + styles[i]['color'] + ' ;';
					css += '} ';
					css += 'body .pagination li a{ '
					css += ' color : ' + styles[i]['color'] + ' ;';
					css += '} ';									
				}				
			}		

			style.type = 'text/css';
			
			if (style.styleSheet){
			  style.styleSheet.cssText = css;
			} else {
			  style.appendChild(document.createTextNode(css));
			}

			head.appendChild(style);
		},
		findByAttributeValue : function(attribute, value) {
			var allElements = document.getElementsByTagName('*');
			for (var i = 0; i < allElements.length; i++){
				if (allElements[i].getAttribute(attribute) == value){
					return allElements[i];
				}
			}
		},
    	isJSON : function(a){
			try {
				JSON.parse(a);
			} catch (e) {
			return false;
			}
			return true;
    	}				
	};

	self._events = {
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
	
	self.send = function(data){
		params.window.postMessage(JSON.stringify(data), params.origin);					
	};
	self.receive = function(callback){
		self._events.message(function(data){
			if(typeof callback === 'function'){
				if(!_util.isJSON(data)) return;

				callback.call(true, JSON.parse(data));	
			} 						
		});
	};
	self.sendHeight = function(){
		var bodyHeight = _util.getBodyHeight();

		self.send({ height : bodyHeight, origin : params.origin});
	};
	self.receiveHeight = function(callback){
		self.receive(function(data){
			if(typeof callback === 'function'){
				callback.call(true, data.height);	
			}else if(data && data.height){
				if(data.contentType && data.contentType !== ''){
					_util.findByAttributeValue('data-content-type', data.contentType).style.height = data.height + 10 + 'px';					
				}else if(params.frameId && params.frameId !== ''){
					document.getElementById(params.frameId).style.height = data.height + 10 + 'px';
				}else{
					throw('Please specify data-content-type="content-orgid-template"');
				}							
			}						
		});
	};
	self.sendStyle = function(elements){
		var arr = [];
		if(elements.length === 0){
			throw('Please specify an array of DOM elements');
		}
		
		for(var i = 0; i < elements.length; i++){
			arr.push(_util.getElementStyle('p', params.frameId));
		}					

		self.send({ style : arr });
	};
	self.receiveStyle = function(){
		self.receive(function(data){
			if(data && data.style){
				_util.injectStyles(data.style);
			}						
		});						
	};	

	self._events.init(params);
};	

