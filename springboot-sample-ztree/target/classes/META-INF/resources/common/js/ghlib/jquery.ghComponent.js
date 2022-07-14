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
					}
				}
			});
			$this.bind("paste",function(e){e.preventDefault(); });
			$this.blur(function(){
				if(value==''){//第一次输入
					if($(this).val() != $(this).attr("successValue")){
						alert(o.firstAlertMessage);
					}
				}else{//第二次输入
					alert(o.secondAlertMessage);
				}
			});
		});
	};    
	$.fn.twiceValidator.value = '';
	// 插件的defaults    
	$.fn.twiceValidator.defaults = {    
		firstBG: 'blue',    
		lastBG: 'yellow',
		successBG: 'green',
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

/**
 *
 *
 *
 */
// 创建一个闭包   
(function($) {       
	//多级联动下拉框
	$.fn.dropDownList = function(options,val) {     
		if(typeof(options)=='string'){
			switch(options){
				case "disable":
					return this.each(function() { 
						if(val){
							$(this).val(val);
						}
						
						$(this).change();
						$(this).attr("disabled",true);
					});
				case "enable":
					return this.each(function() { $(this).attr("disabled",false);});
			}
		}
		// build main options before element iteration    
		var opts = $.extend({}, $.fn.dropDownList.defaults, options);   
		// Our plugin implementation code goes here.  
		return this.each(function() {    
			
			var $this = $(this);    
			var value='';
			// build element specific options    
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;   
			if(o.trigger!=''){
				$(o.trigger).bind(o.event,function(){
					o.value = $(this).val();
					getData(o,$this);
					$($this).change();
				});
				o.value = $(o.trigger).val();
				getData(o,$this);
				$($this).change();
			}else {
				getData(o,$this);
				$($this).change();
			}
			
		});
	};    
	
	// 插件的defaults    
	$.fn.dropDownList.defaults = {    
		trigger: '',    
		event: '',
		dataField: '',
		url: '',
		value:'',
		dataType:'json',
		data:''    
	};    
	$.fn.dropDownList.disable = function(value){
		return this.each(function() { 
			if(value){
				$(this).val(value);
			}
			
			$(this).change();
			$(this).attr("disabled",true);
		});
	};
	function getData(o,obj){
		if(o.data==''){
			getDataFromAjax(o,obj);
		}else{
			getDataFromLocal(o,obj);
		}
	}
	
	function getDataFromLocal(o,obj){
		var options = '';
		if(o.value!=''){
			$.each(o.data,function(index, value){
				if(value[o.dataField] == o.value){
					options += '<option value="'+value.value+'">'+value.label+'</option>';
				}
			});
		}else{
			$.each(o.data,function(index, value){
				options += '<option value="'+value.value+'">'+value.label+'</option>';
			});
		}
		$(obj).html(options);
	}
	
	function getDataFromAjax(o,obj){
		var data = '';
		if(o.dataField!=''){
			data = o.dataField+"=" + o.value;
		}
		var options = '';
		$.get(o.url,data,function(data) {
			$.each(data,function(index, value){
				options += '<option value="'+value.value+'">'+value.label+'</option>';
			});
			$(obj).html(options);
		},o.dataType);

	}
// 闭包结束  
})(jQuery);  


/**
 * 自动完成组件
 * 
 * 
 */
// 创建一个闭包
(function($) {   
	$.fn.ghAutoComplete = function(options,val) {
		if(typeof(options)=='string'){
			switch(options){
				case "isValidate":
				return this.each(function() {  
					var value = $(this).val();
					var validate = false;
					if($(this).val()!=''){
						$.each(o.source,function(){
							if(this.value==value){
								validate= true;
							}
						});
						if(!validate){
							alert(o.errorMsg);
							$(this).val('');
						}
					}
				});
			}
		}
		var opts = $.extend({}, $.fn.ghAutoComplete.defaults, options); 
		return this.each(function() {    
			var $this = $(this);
			var o = $.meta ? $.extend({}, this.opts, $this.data()) : opts;   
			$.fn.ghAutoComplete.source = o.source;
			//初始化 JQueryUI autocomplete 插件
			$(this).autocomplete({
				source: o.source,
				minLength: 0,
				select: function( event, ui ) {
					$($this).val( ui.item.value );
					if(o.twoInput){
						$($this).next().val(  ui.item.lable);
					}
					return false;
				},
				open: function(event, ui){
					if(o.height!=''){
						$($this).autocomplete("widget").css("height",o.height);
						$($this).autocomplete("widget").css("overflow-y","auto");
					}
					if(o.width!=''){
						$($this).autocomplete("widget").css("width",o.width);
						$($this).autocomplete("widget").css("overflow-x","auto");
					}
				}
			}).data( "autocomplete" )._renderItem = function( ul, item ) {
				return $( "<li style=\"width:200px;\"></li>" )
					.data( "item.autocomplete", item )
					.append( "<a>" + item.value + "-" + item.lable + "</a>" )
					.appendTo( ul );
			};

			if(o.twoInput){
				$($this).next().attr( "tabindex","-1");
			}
			//失去焦点时验证
			//$(this).blur(function(event){

			//});
			//实现自动完成控件 双击显示和自动清除功能
			$(this).dblclick(function(event){
				$(this).autocomplete("search");
			});
			$(this).keydown(function(event){
				var keyCode = event.keyCode ? event.keyCode : event.which;
				switch(keyCode){
					
					case 9:
					case 19:
					case 13:
					case 27:
					case 33:
					case 34:
					case 35:
					case 36:
					case 37:
					case 38:
					case 39:
					case 40:
					case 45:
					case 46:
					case 91:				
					case 93:
					case 112:
					case 113:
					case 114:
					case 115:
					case 116:
					case 117:
					case 118:
					case 119:
					case 120:
					case 121:
					case 122:
					case 123:
					case 192:
						
					break;
					default:
						$(this).next().val('');
						
				}
				
			});
		});
	}
	$.fn.ghAutoComplete.source='';
	// 插件的defaults    
	$.fn.ghAutoComplete.defaults = {    
		source: '',    
		width: '',
		height: '',
		twoInput: true,
		errorMsg: '输入数据不合法，请重新输入'
	};   
	
})(jQuery);  


(function($) { 
	$.ghBlockUI  = {
		message: "请求处理中，请稍候.",
		
		active: function(){
			$.blockUI({ 
				message: $.ghBlockUI.message,
				showOverlay: true, 
				css: { 
					border: 'none', 
					padding: '15px', 
					backgroundColor: '#000', 
					'-webkit-border-radius': '10px', 
					'-moz-border-radius': '10px', 
					color: '#fff' 
				},
				overlayCSS:  {
					backgroundColor: '#b3b3b3'
				}
			})
		},
			
		inactive: function(){
			$.unblockUI();
		},
		
		setMessage: function(msg){
			$.ghBlockUI.message = msg;
		}
	}
})(jQuery);  