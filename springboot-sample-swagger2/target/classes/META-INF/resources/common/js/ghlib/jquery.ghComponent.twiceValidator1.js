/**
 * @preserve jquery.GuoHuaLife.Component 1.0 beta1
 * $Date: 2010-12-01 $
 * $Rev: 1.05 $
 *
 * Copyright (c) 2010 
 *   Sam Xiao 
 *   Ebiz-interactive (http://www.ebiz-interactive.info/)
 */

/**
 * 二次验证控件
 *
 * 
 */
// 创建一个闭包   
(function($) {       
	//二次验证控件
	$.fn.twiceValidator = function(options) {     
		if(typeof(options)=='string'){
			switch(options){
				case "isEmpty":
					return this.each(function() { 
						if($(this).attr("successValue")!=''){
							return false;
						}else{
							return true;
						}
					});
				
			}
		}
		// build main options before element iteration    
		var opts = $.extend({}, $.fn.twiceValidator.defaults, options);   
		// Our plugin implementation code goes here.  
		return this.each(function() {    
			var $this = $(this);    
			var value='';
			$(this).attr("successValue",''); 
			// build element specific options    
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;   
			$this.css("background-color",o.firstBG);
			$this.keypress(function(event){
				var keyCode = event.keyCode ? event.keyCode : event.which;
				//检查键盘输入是否为回车
				if(keyCode=='13'){
					if(value==''){//第一次输入
						value = $(this).val();
						$(this).val('');
						if(value !=''){
							$(this).css("background-color",o.lastBG);
							$("#"+o.firstLabel).show();
							$("#"+o.firstLabel).val(o.errorFlag);
							$("#"+o.nextLabel).hide();
						}
					}else{//第二次输入
						if($(this).val() != value){
							value=''; //转回第一次输入
							$(this).val('');
							$(this).css("background-color",o.firstBG);
							$("#"+o.firstLabel).hide();
							$("#"+o.firstLabel).val('');
							$("#"+o.nextLabel).show();
						}else{
							value='';
							$(this).attr("successValue",$(this).val()) ;
							$(this).css("background-color",o.successBG);
							$("#"+o.firstLabel).hide();
							$("#"+o.firstLabel).val(o.successFlag);
							$("#"+o.nextLabel).hide();
						}
					}
				/*	
					if(value==''){//第一次输入
						value = $(this).val();
						$(this).val('');
						$(this).css("background-color",o.lastBG);
					}else{//第二次输入
						if($(this).val() != value){
							alert(o.alertMessage);
							value=''; //转回第一次输入
							$(this).val('');
							$(this).css("background-color",o.firstBG);
						}else{
							value='';
							$(this).attr("successValue",$(this).val()) ;
							$(this).css("background-color",o.successBG);
						}
					}*/
				}
			});
			$this.bind("paste",function(e){e.preventDefault(); });
			$this.bind("blur",function(){
			});
			
		});
	};    
	$.fn.twiceValidator.value = '';
	// 插件的defaults    
	$.fn.twiceValidator.defaults = {    
		firstBG: 'blue',    
		lastBG: 'yellow',
		successBG: 'green',
		firstLabel: '',
		nextLabel: '',
		successFlag : '',
		errorFlag : '',
		alertMessage: '两次输入值不一致，请确认!',
		firstAlertMessage:'投保单号码请在重复输入处填值!',
		secondAlertMessage:'投保单号码请在重复输入处填值!'
	};    
	// 定义暴露format函数    
	//$.fn.twiceValidator.format = function(txt) {    
	// return '<strong>' + txt + '</strong>';    
	//};  
	// 私有函数：debugging    
	//function debug($obj) {};
// 闭包结束  
})(jQuery);  
