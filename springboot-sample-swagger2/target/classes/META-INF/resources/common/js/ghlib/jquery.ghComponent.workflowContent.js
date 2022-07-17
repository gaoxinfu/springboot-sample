/**
 * 
 * 
 * 
 */
// 创建一个闭包
( function($) {

	var isCache ='';
	var sourceUrl='';
	var param='';
	
	// 动态构架菜单
	$.fn.workflowContent = function(options, param, val) {
		// build main options before element iteration
		var opts = $.extend( {}, $.fn.menuTree.defaults, options);
		// Our plugin implementation code goes here.
		initParam(opts);
		initHtml($(this));
	};

	$.fn.workflowContent.defaults = {
		source : '', // 数据来源
		isCash : 'true',
		param  :  ''
	};

	// 初始化全局变量
	function initParam(opts) {
		if (opts.isCache != undefined) {
			isCache = opts.isCache;
		}
		if (opts.source != undefined) {
			sourceUrl = opts.source;
		}
		if (opts.param != undefined) {
			param = opts.param;
		}
	}

	function initHtml(divObj) {
		var orgHtml='<table width="100%" style="padding-left: 0px;">';
		orgHtml+='<tr align="center" class="tableTr" style="font-weight: 600; color: #2779AA;"><td class="inputBox3col"><b>操作人</b></td><td class="inputBox3col"><b>操作节点</b></td><td class="inputBox3col"><b>操作时间</b></td><td class="inputBox3col"><b>操作日志</b></td></tr>';
		sourceUrl=sourceUrl+"&param="+param;
		$.get(sourceUrl, function(data){
			var resultjsonData=eval(data);
			$.each(resultjsonData, function(idx, item) {
				orgHtml+='<tr class="tableTr" align="center">';
//				orgHtml+='<td class="inputBox3col" >'+item.bussinessDataId+'</td>';
				orgHtml+='<td class="inputBox3col" >'+item.userNo+'</td>';
				orgHtml+='<td class="inputBox3col" >'+item.stepName+'</td>';
				orgHtml+='<td class="inputBox3col" >'+item.createdDate+'</td>';
				orgHtml+='<td class="inputBox3col" >'+item.messageLog+'</td>';
				orgHtml+='</tr>';
			});
			orgHtml+='</table>';
			divObj.html(orgHtml);			 
		}); 
	}
	
	// 闭包结束
})(jQuery);
