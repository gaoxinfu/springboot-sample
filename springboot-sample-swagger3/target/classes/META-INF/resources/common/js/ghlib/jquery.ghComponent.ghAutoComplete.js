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
				case "option":
					var optionValue = "";
					this.each(function() {  
						optionValue = $(this).autocomplete("option",val);
					});
					return optionValue;
				case "setValue":
					return this.each(function() {  
						var $this = $(this);
						var value = val;
						var source = $(this).autocomplete("option","source");
						var twoInput = $(this).autocomplete("option","twoInput");
						$(source).each(function(i,item){
							 if(item.value == val){
								$($this).val( item.value );
								if(twoInput){
									$($this).next().val(item.lable);
								}
								if(twoInput=='all'){
									$($this).val(item.value + '-' + item.lable);
									$($this).next().val(item.value);
								}
								//联动
								if(item.openDriver==true){
									var k=-1;
									var driverValues=item.driverValue.split(';');
									var showValues=item.showValue.split(',');
									for(var i=0;i<showValues.length;i++){
										if(item.value==showValues[i]){
											k=i;
										}
									}
									for(var i=0;i<driverValues.length;i++){
										var driverValue=driverValues[i].split(','); 
										if(k==i){
											for(var j=0;j<driverValue.length;j++){
												$('#'+driverValue[j]).show();
											}
										}else{
											for(var n=0;n<driverValue.length;n++){
												$('#'+driverValue[n]).hide();
											}
										}
									}
									k=-1;
								}
								
								return false;
							 }
						});
						return false;
					});
			}
		}
		var opts = $.extend({}, $.fn.ghAutoComplete.defaults, options); 
		return this.each(function() {    
			var $this = $(this);
			var o = $.meta ? $.extend({}, this.opts, $this.data()) : opts;
			var cacheItems = new Array();
			if(o.source != undefined && typeof(o.source) == 'string' && o.source != ''){
				o.url = o.source;
			}
			if(o.url != ''){
					$.ajax( {
								url : o.url + '&random=' + Math.random(),
								dataType : "json",
								async : false,
								success : function(data) {
									$.each(data,function(i,item){
										 var jsonItem = {
										    value : item[o.value],
											lable : item[o.lable],
											openDriver:o.openDriver,
											driverValue:o.driverValue,
											showValue:o.showValue
										 };
										 cacheItems.push(jsonItem);
									});
								}
					});	
					o.source = cacheItems;
			}   
			$.fn.ghAutoComplete.source = o.source;
			//初始化 JQueryUI autocomplete 插件
			$(this).autocomplete({
				source: o.source,
				minLength: o.minLength,
				select: function( event, ui ) {
					$($this).val( ui.item.value );
					if(o.twoInput){
						$($this).next().val(ui.item.lable);
					}
					if(o.twoInput=='all'){
						$($this).val(ui.item.value+'-'+ui.item.lable);
						$($this).next().val(ui.item.value);
					}
					//联动
					if(o.openDriver==true){
						var k=-1;
						var driverValues=o.driverValue.split(';');
						var showValues=o.showValue.split(',');
						for(var i=0;i<showValues.length;i++){
							if(ui.item.value==showValues[i]){
								k=i;
							}
						}
						for(var i=0;i<driverValues.length;i++){
							var driverValue=driverValues[i].split(','); 
							if(k==i){
								for(var j=0;j<driverValue.length;j++){
									$('#'+driverValue[j]).show();
								}
							}else{
								for(var n=0;n<driverValue.length;n++){
									$('#'+driverValue[n]).hide();
								}
							}
						}
						k=-1;
					}
					if(o.openBlank==true){
						var blankValue=o.blankValue.split(',');
						for(var i=0;i<blankValue.length;i++){
							$('#'+blankValue[i]).val('');
						}
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
			$(this).blur(function(event){

			});
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
						//联动
						if(o.openDriver==true){
							$($this).bind('input propertychange',function(){
								var k=-1;
								var driverValues=o.driverValue.split(';');
								var showValues=o.showValue.split(',');
								for(var i=0;i<showValues.length;i++){
									if(this.value==showValues[i]){
										k=i;
									}
								}
								for(var i=0;i<driverValues.length;i++){
									var driverValue=driverValues[i].split(','); 
									if(k==i){
										for(var j=0;j<driverValue.length;j++){
											$('#'+driverValue[j]).show();
										}
									}else{
										for(var n=0;n<driverValue.length;n++){
											$('#'+driverValue[n]).hide();
										}
									}
								}
								k=-1;
							});
						}
						if(o.openBlank==true){
							var blankValue=o.blankValue.split(',');
							for(var i=0;i<blankValue.length;i++){
								$('#'+blankValue[i]).val('');
							}
						}
						$(this).next().val('');
						
				}
				
			});
			
			//如果设置了默认值则自动选择上
			if(o.defaultValue != ''){
				$(this).ghAutoComplete("setValue",o.defaultValue);
			}
			if($(this).val() != ''){
				$(this).ghAutoComplete("setValue",$(this).val());
			}
		});
	}
	$.fn.ghAutoComplete.source='';
	// 插件的defaults    
	$.fn.ghAutoComplete.defaults = {    
		source: '',    
		width: '',
		height: '',
		twoInput: true,
		errorMsg: '输入数据不合法，请重新输入',
		url : '',
		minLength : 0,
		value : 'value',
		lable : 'lable',
		cache : true,
		defaultValue : '',
		openDriver:false,
		driverValue:'',
		showValue:'',
		openBlank:false,
		blankValue:''
	};   
	
})(jQuery);