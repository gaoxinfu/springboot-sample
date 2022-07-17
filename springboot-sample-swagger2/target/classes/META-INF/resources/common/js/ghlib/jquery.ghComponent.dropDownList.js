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
				//alert(o.trigger);
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
		data:'',
		selectValue:''
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
		};
		/*modified by chenjiang on 2013.4.7*/
		var options = '<option value="请选择" selected>请选择</option>';
		/*-end modify-*/
	
		$.get(o.url,data,function(data) {
			$.each(data,function(index, value){
				if(value.label == o.selectValue){
					options += '<option value="'+value.value+'" selected>'+value.label+'</option>';
				}else{
					options += '<option value="'+value.value+'">'+value.label+'</option>';
				}
			});
			if($("#" + $(obj).attr("id") + "_div").attr("id") == undefined || o.trigger==''){
				$(obj).html(options);
				
			}else{
				
				var selectHtml = "<select style='" + $(obj).attr("style") + "' class='' plugType='"+ $(obj).attr("plugType") + "' name='" + $(obj).attr("name") + "' id='" + $(obj).attr("id") + "'>";
				selectHtml = selectHtml+ options + "</select>";
				$("#" + $(obj).attr("id") + "_div").html(selectHtml)
			}
		},o.dataType);


	}
// 闭包结束  
})(jQuery);  
