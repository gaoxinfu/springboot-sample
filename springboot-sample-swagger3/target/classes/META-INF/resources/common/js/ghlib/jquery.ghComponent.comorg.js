/**
 *
 *
 *
 */
// 创建一个闭包   
(function($) {       
	var comGrade = "";
	var dWigth = "350";
	var dHeight = "300";
	
	//下拉列表弹出层
	$.fn.comorg = function(options,val) {
		if(typeof(options)=='string'){
			switch(options.toLowerCase()){
				case "close":
					return this.each(function() { 
						closeDialog(val);							
					});
				break;
			}	
		}
		var opts = $.extend({}, $.fn.comorg.defaults, options);   
		// Our plugin implementation code goes here.  
		return this.each(function() {
			var $this = $(this);
			var id = $this.attr("id");
			initParam(opts);
			initHtml(id);
		});
	};

	$.fn.comorg.defaults = {
		comGrade: '',  			//机构职级
		wigth: 	'',				//div宽度
		height: ''				//div高度
	};
	
	//初始化全局变量
	function initParam(opts){
		if(opts.comGrade != undefined){
			comGrade = opts.comGrade;
		}

		if(opts.wigth != undefined && opts.wigth != ""){
			dWigth = opts.wigth;
		}
		
		if(opts.dHeight != undefined && opts.dHeight != ""){
			dHeight = opts.height;
		}
	}
	
	function initHtml(id){
		createDiv(id);
		initDialog(id);
	}
	
	function createDiv(id){
		var sourceUrl = common.ctx + "/orgnization.do?action=viewOrgTree" + "&comGrade=" + comGrade + "&selectId=" + id + "&decoratorName=window";
		var orgHtml = '<input id="' + id + 'Code" name="' + id + '" type="hidden" />';
		orgHtml += '<input id="' + id + 'Name" name="' + id + 'Name"  type="text" readonly="readonly"/>';
		orgHtml += '<img id="orgSelect_' + id + '" src=\"../skin/default/css/images/search.png\" style="margin-left: 3px;vertical-align: middle;" />';
		orgHtml += '<div id="dialog_' + id + '" style="display: none;"></div>';
		$("#" + id).html(orgHtml);
		$("#orgSelect_" + id).click( function() {
			openDialog(id);
			loadOrgTree(id);
	    });
	}
	
	function loadOrgTree(id){
		//var sourceUrl = common.ctx + "/orgnization.do?action=viewOrgTree&decoratorName=window";
		//("#dialog_" + id).load(sourceUrl,{"comGrade":comGrade,"selectId":id});
		var sourceUrl = common.ctx + "/orgnization.do?action=viewOrgTree" + "&comGrade=" + comGrade + "&selectId=" + id + "&decoratorName=window";
		var iframeHtml = '<iframe id="iframe_"' + id + ' src="' + sourceUrl + '" frameborder="0"></iframe>';
		$("#dialog_" + id).html(iframeHtml);
	}
	
	function initDialog(id){
		var dTop = (window.screen.availHeight-30-dHeight)/2; //获得窗口的垂直位置;
		var dLeft = (window.screen.availWidth-10-dWigth)/2; //获得窗口的水平位置;
		$("#dialog_" + id).dialog({		
			resizable : false,
			modal: false,
			title: '请选择',
			autoOpen: false,		
			height: dHeight,
			width: dWigth,
			top:111,
			left:dLeft,
			buttons: {
			"关闭" : function() {
				$(this).dialog("close");
				//var orgHtml = '<div id="dialog_' + id + '">加载中....</div>';
				$("#dialog_" + id).html("");
				}
			}
		});
	}

	//显示展示层
	function openDialog(id){
		$("#dialog_" + id).dialog('open');
	}

	
	//关闭展示层
	function closeDialog(id){
		var orgHtml = '<div id="dialog_' + id + '">加载中....</div>';
		$("#dialog_" + id).html(orgHtml);
		$("#dialog_" + id).dialog('close');
	}
	
// 闭包结束  
})(jQuery);  
