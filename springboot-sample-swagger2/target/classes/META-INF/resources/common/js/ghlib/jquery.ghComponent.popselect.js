/**
 *
 *
 *
 */
// 创建一个闭包   
(function($) {       
	
	var source = "";
	var position = "left";
	var wigth = "400";
	var height = "300";
	var isCache= "true";
	var valueInput="";
	var  lableInput=""; 
	
	//下拉列表弹出层
	$.fn.popselect = function(options,val) {
		
		// alert(" in popselect construts begin::::");
		if(typeof(options)=='string'){
			switch(options.toLowerCase()){
				case "default":
					return this.each(function() { 
						processString($(this),val);							
					});
				break;
				case "json":
				return this.each(function() { 
					processJson($(this),val);
				});
				break
				case "close":
					return this.each(function() { 
						processClose($(this),val);
					});
				break;
			}	
			
			// alert(" in popselect construts  End::::");
		}
		
		// build main options before element iteration    
		var opts = $.extend({}, $.fn.popselect.defaults, options);   
		// Our plugin implementation code goes here.  
		return this.each(function() {
			var $this = $(this);
			var id = $this.attr("id");

			//双击显示
			$(this).click(function(event){
				//初始化全局参数
				initParam(opts);
				displayDivList(this);
			});			
			
			//获得焦点显示
			$(this).focus(function(){
				 //初始化全局参数
				initParam(opts);
    			displayDivList(this);
			});
			
			//关闭
			$(document).click(function(event){
				//判断过滤gqGrid组件
				var eventId = event.target.id;
				/*if(eventId != '' && eventId.indexOf("cb_") == -1 && eventId != id){
					var divId = "selectItem" + id;
					var targetId = $("#" + divId);
					targetId.fadeOut();	
				}*/
			
				if(eventId == ''){
					
					var tmpId = id;
					
					if(id.indexOf("-select")>0){
					   tmpId = id.substring(0,id.indexOf("-select"));
					}
				
					if( valueInput != ""){
						if(tmpId ==  valueInput){
							
					
							//var divId = "selectItem" + tmpId;
							//var targetId = $("#" + divId);
							//targetId.fadeOut();	
						
							//targetId.css({"display":"none","z-index":"1","position":"absolute"}).fadeOut();
							//targetId.remove();
							
						}
					}
					
				}
			});
		});
	};

	$.fn.popselect.defaults = {
		position: 'left',			//显示位置[left,right]
		source: '',  			//数据来源
		wigth: 	'',				//div宽度
		height: ''				//div高度
	};
	
	//初始化全局变量
	function initParam(opts){
		source = opts.source;
		
		if(opts.valueInput != undefined){
			valueInput = opts.valueInput;
		}
		
		if(opts.lableInput != undefined){
			lableInput = opts.lableInput;
		}
		
		if(opts.position != undefined){
			position = opts.position.toLowerCase();
		}

		if(opts.isCache != undefined){
			isCache = opts.isCache;
		}
		if(opts.wigth != undefined){
			wigth = opts.wigth;
		}
		
		if(opts.useCache != undefined){
			height = opts.height;
		}
		
	}
	
	
	function processString(targetObj, date){		
		//$("#branchName1").val(data.rslt.obj.attr("name"))
		//var hiddenId = targetObj.attr("id") + "_hidd";
		//targetObj.val(date);
		//$("#" + hiddenId).val(date);
	}
	
	function processJson(targetObj, date){
		
		var jsonObj = date;
		var keyBuf = "";
		var valueBuf = "";
		//var hiddenId = targetObj.attr("id") + "_hidd";
        var lableInput="";
        var valueInput="";
		
		$.each(jsonObj, function(idx, item) {
			if(keyBuf != ""){
				keyBuf += "," + item.value;
			}else{
				keyBuf += item.value;
			}
			
			if(valueBuf != ""){
				valueBuf += "," + item.lable;
			}else{
				valueBuf += item.lable;
			}
			
			lableInput  = item.lableInput;
			
			valueInput  = item.valueInput;
			
			
		 });
	
		
		if( lableInput != ""){
			$("#" + lableInput).val(valueBuf);
		}
		if( valueInput != ""){
			$("#" + valueInput).val(keyBuf);
			$("#" + valueInput).change();
		}
		
		//closeDivList(targetObj);
		
		
	}
	function processClose(targetObj, data){
		$("#" + data).css({"display":"none","z-index":"1","position":"absolute"}).fadeOut();
		  $("#" + data).remove();

		//$("#" + data).hide();
	}

	//显示展示层
	function displayDivList(targetObj){
		
		// alert(" in displayDivList begin ::::");
		
		var inputObj = targetObj;
		
		if( lableInput != ""){
			inputObj= document.getElementById(lableInput);
		}
		
		//创建展示层
		createDiv(inputObj);
		
		
		// alert(" in displayDivList End ::::");
	}

	
	
	//创建展示层
	function createDiv(targetObj){	
		
		 // alert(" in createDiv  BEGIN:::::");
		  
		//展示DIV内容Html
		var viewHtml = "";
		
		var valueObj ="";
		
		if( valueInput != ""){
			valueObj= document.getElementById(valueInput);
		}
		
		var divId = "selectItem" + valueObj.id;
		var targetId = $("#" + divId);
		
		if(targetId.attr("id") == undefined){
			//alert("divId::::::="+divId);
			//viewHtml = viewHtml + '<div id="' + divId + '" style="display:none; width:' + wigth + 'px;height:' + height + 'px;overflow-X:auto;overflow-Y:auto"></div>';
			viewHtml = viewHtml + '<div id="' + divId + '"    class="ui-dialog  ui-dialog-content ui-widget ui-widget-content"  tabIndex=-1 style="display:none;"></div>';
			
			//$(viewHtml).empty().append(generateHTML());
			
			$(viewHtml).insertAfter(targetObj);
			
			
			if(!isCache){
				source = source + "&divId=" + targetObj.id + '&random=' + Math.random();
			}
			
	     	loadHtml(divId,targetObj.id);
	     	//$("#" + divId).css({"display":"block","z-index":"2","position":"absolute","top:px","left":A_left +"px"}).fadeIn();
		}else{
		   // targetId.attr('DISPLAY',' block');
		  	// targetId.fadeIn();
		    //targetId.css({"display":"block","position":"absolute","top":A_top +"px","left":A_left +"px"});
			//targetId.show().css({"position":"absolute","DISPLAY":"block"});
		}
		
		// alert(" in createDiv  End:::::");
	}
	function generateHTML() {
		var html = '';
		html += '';
		html += '<DIV class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" >';
		html += '<SPAN id=ui-dialog-title-dialog class=ui-dialog-title >请选择</SPAN>';
		html += '<A class="ui-dialog-titlebar-close ui-corner-all" >';
		html += '<SPAN class="ui-icon ui-icon-closethick"   onclick="POPPICKER_jQuery_.poppicker._hidePoppicker();" >关闭</SPAN></A></DIV>';
		html += '<DIV  id="uuid_div" style=" WIDTH: auto; HEIGHT: auto"  class="ui-dialog-content ui-widget-content" ></DIV>';
		return html;
	}
	
	//加载数据
	function loadHtml(divId,id){
		
		// alert(" in loadHtml begin ::::");
		
		  $("#" + divId).load(source,{"popselectDivId" : divId,"valueInput" : valueInput,"lableInput" : lableInput},function(){	
			
			var pos=$("#" + id).position();
			
			if(position == "right"){			
				var divWith = $("#grid_" + id).width();
				var A_top = pos.top + $("#" + id).outerHeight(true);  //  1
				var A_left =  pos.left - (divWith - $("#" + id).width()) + 5;
		
				//var A_left =  pos.left;
				$("#" + divId).css({"display":"block","z-index":"2","position":"absolute","top":A_top +"px","left":A_left +"px"}).fadeIn();
			}else if(position == "left"){
				var A_left =  pos.left;
				var A_top = pos.top + $("#" + id).outerHeight(true);
				$("#" + divId).css({"display":"block","z-index":"2","position":"absolute","top":A_top +"px","left":A_left +"px"}).fadeIn();
				
			}
		});  
		  
		//	 alert(" in loadHtml End ::::");
	
	}

	//关闭展示层
	function closeDivList(targetObj){
		var divId = "selectItem" + targetObj.id;
		var targetId = $("#" + divId);
		targetId.fadeOut();
	}
	
	
	
	
	
// 闭包结束  
})(jQuery);  
