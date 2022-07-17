// 创建一个闭包
( function($) {

	var isCache ='';
	var sourceUrl='';
	
	// 动态构架菜单
	$.fn.ghOrgnization = function(options, param, val) {
		// build main options before element iteration
		var opts = $.extend( {}, $.fn.menuTree.defaults, options);
		// Our plugin implementation code goes here.
		initParam(opts);

		initHtml($(this));
		initComponent($(this));
	};

	$.fn.menuTree.defaults = {
		source : '', // 数据来源
		isCash : 'true'
	};

	// 初始化全局变量
	function initParam(opts) {
		if (opts.isCache != undefined) {
			isCache = opts.isCache;
		}
		if (opts.source != undefined) {
			sourceUrl = opts.source;
		}
	}

	function initHtml(divObj) {
		var orgHtml = '<input id="ghComcode" class="ui-autocomplete-input"  type="text" />';
		orgHtml += '<input id="ghComcode-label" class="ui-widget-content ui-autocomplete-label ui-gh-autocomplete-label" type="text" readonly="readonly" />';
		orgHtml += '<img id="orgSelectId" src=\"../skin/default/css/images/search.png\" style="margin-left: 3px;vertical-align: middle;" />';
		divObj.html(orgHtml);
	}

	function initComponent(divObj) {
		if(sourceUrl == 'true'){
			sourceUrl += '?random=' + Math.random();
		}
		
		$("#ghComcode").ghAutoComplete( {
			source : sourceUrl,
			height : '100px',
			width : '300px'
		});
		
		$("#orgSelectId").popselect({
		    valueInput: 'ghComcode',
			lableInput: 'ghComcode-label',								
			position : 'left',		
			source: common.ctx + '/platform/web/orgnization/jsp/orgTree.jsp'
	   });	
	}
	// 闭包结束
})(jQuery);
