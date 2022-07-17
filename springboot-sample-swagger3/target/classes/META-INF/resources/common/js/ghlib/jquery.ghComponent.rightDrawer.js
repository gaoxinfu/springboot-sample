/**
 *
 *
 *
 */
// 创建一个闭包   
(function($) {       
	var position = "";
	var width ="";
	
	$.fn.rightDrawer = function(options) {

		// build main options before element iteration    
		var opts = $.extend({}, $.fn.dropDownDivList.defaults, options);   
		var fast = 600;
		// Our plugin implementation code goes here.  
		return this.each(function() {
			var $this = $(this);
			
			//单击显示
			$(this).click(function(){
				initParam(opts);
				  closeDiv();
				  creatDiv();
				  displayDivList();
			});	
			/*
			//关闭（鼠标点击空白地方关闭）
			$(document).click(function(event){
				//判断过滤gqGrid组件
				if(event.target.id != ''){
					closeDiv();
				}
				
			});*/


		});
		
	};

	$.fn.rightDrawer.defaults = {
		source: '',  			//数据来源
		width: ''
	};

	function initParam(opts){
		source = opts.source;
		if(opts.width != undefined){
			width = opts.width;
		}else{
			width = '40%'; 
		}
	}
	
	//显示展示层
	function displayDivList(){
		//展示DIV内容Html
		var viewHtml = "";
		viewHtml = viewHtml + '<span id="contextSpan" style="background:#DAF3FB;float:right;width:'+ width +'"></span>';
		$(viewHtml).insertAfter($("#rightDrawer"));
		$("#contextSpan").load(source,'',function(){
			var divWith = $("#contextSpan").width();

			var pos=$("#accordion-east").position();
			var A_top = pos.top;//  1
		
			var A_left = $("#mainFrame").width() - divWith;
			var C_top = 8;
			var C_left = 20;
			var C_right = 8;
			
			$("#contextSpan").css({"display":"block","z-index":"3","position":"absolute","top":A_top +"px","left":A_left +"px"}).append("<div id='closeDiv'><a id='closeBt' href='javascript:void(0)' title='close'><img src='../../../skin/default/css/images/closeDiv.png' width='20px' height='17px' border='0'/></a></div>");			
			//$("#closeDiv").css({"border":"0"});
			$("#closeBt").css({"display":"block","position":"absolute","top":C_top +"px","right":C_right +"px","text-decoration":"none","border":"0"});
			//为关闭按钮绑定事件
			$("#closeBt").bind('click', function(event) {
				closeDiv();
			});

			//$("#contextSpan").css({"position":"absolute","z-index":"-1","top":A_top +"px","left":"300px"});

		}); 
		
	}
	
	function creatDiv(){
		var myDiv = '<div id="rightDrawer"></div>';
		$(myDiv).insertAfter($("#mainFrame"));
	}
	
	//显示展示层
	function displayDivList1(){
		//展示DIV内容Html
		var viewHtml = "";
		viewHtml = viewHtml + '<span id="contextSpan"></span>';
		$(viewHtml).insertAfter($("#rightDrawer"));
		$("#contextSpan").load(source,'',function(){
			var divWith = $("#contextSpan").width();

			var pos=$("#accordion-east").position();
			var A_top = pos.top;//  1
		
			var A_left = $("#maincenter").width() - divWith;
	
			//$("#contextSpan").css({"position":"absolute"});
			//$("#contextSpan").css({"position":"absolute","z-index":"-1","top":A_top +"px","left":"300px"});
			
			$("#contextSpan").dialog();
			$("#contextSpan").dialog('moveToTop');
			
		}); 
		
	}
	//关闭窗口
	function closeDiv(){
		
		$("#contextSpan").remove();
		$("#rightDrawer").remove();

	}
	
// 闭包结束  
})(jQuery);  
