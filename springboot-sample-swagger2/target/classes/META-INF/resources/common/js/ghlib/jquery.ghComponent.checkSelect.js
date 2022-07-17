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
	
	//下拉列表弹出层
	$.fn.dropDownDivList = function(options,val) {
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
				break;
			}	
		}
		
		// build main options before element iteration    
		var opts = $.extend({}, $.fn.dropDownDivList.defaults, options);   
		// Our plugin implementation code goes here.  
		return this.each(function() {
			var $this = $(this);
			var id = $this.attr("id");

			//双击显示
			$(this).dblclick(function(event){
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
					var divId = "selectItem" + id;
					var targetId = $("#" + divId);
					targetId.fadeOut();	
				}
			});
		});
	};

	$.fn.dropDownDivList.defaults = {
		position: 'left',			//显示位置[left,right]
		source: '',  			//数据来源
		wigth: 	'',				//div宽度
		height: ''				//div高度
	};
	
	//初始化全局变量
	function initParam(opts){
		source = opts.source;
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
		var hiddenId = targetObj.attr("id") + "_hidd";
		targetObj.val(date);
		$("#" + hiddenId).val(date);
	}
	
	function processJson(targetObj, date){
		var jsonObj = date;
		var keyBuf = "";
		var valueBuf = "";
		var hiddenId = targetObj.attr("id") + "_hidd";

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
		 });
		 
		targetObj.val(valueBuf);
		$("#" + hiddenId).val(keyBuf);
	}


	//显示展示层
	function displayDivList(targetObj){
		//创建展示层
		createDiv(targetObj);
	}

	
	
	//创建展示层
	function createDiv(targetObj){	  
		  
		//展示DIV内容Html
		var viewHtml = "";
		
		var divId = "selectItem" + targetObj.id;
		var targetId = $("#" + divId);
		
		if(targetId.attr("id") == undefined){
			
			viewHtml = viewHtml + '<div id="' + divId + '" style="width:' + wigth + 'px;height:' + height + 'px;overflow-X:auto;overflow-Y:auto"></div>';
			
			$(viewHtml).insertAfter(targetObj);
			
			//source = source + "&divId=" + targetObj.id + '&random=' + Math.random();
			if(!isCache){
				source = source + "&divId=" + targetObj.id + '&random=' + Math.random();
			}
			//setTimeout(function(){
	     		loadHtml(divId,targetObj.id);
      		//},300);
		}else{
		   // targetId.attr('DISPLAY',' block');
		  	 targetId.fadeIn();
		    //targetId.css({"display":"block","position":"absolute","top":A_top +"px","left":A_left +"px"});
			//targetId.show().css({"position":"absolute","DISPLAY":"block"});
		}
	}
 
	
	//加载数据
	function loadHtml(divId,id){
		//$("#" + divId).load(url);
		$("#" + divId).load(source,{"divId" : id},function(){	
			
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
	}

	//关闭展示层
	function closeDivList(targetObj){
		var divId = "selectItem" + targetObj.id;
		var targetId = $("#" + divId);
		targetId.fadeOut();
	}

	
// 闭包结束  
})(jQuery);  
