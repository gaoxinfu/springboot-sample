/**
 * @preserve jquery.Eagle.Component 1.0 beta1
 * $Date: 2011-01-01 $
 * $Rev: 1.05 $
 *
 * 树控件
 * Copyright (c) 2011 
 */

(function($) {
	var comGrade = "";
	
	var sourceUrl = '/orgnization.do?action=getOrgTree';
	
	$.fn.ghZtree = function(options) {
		var opts = $.extend( {}, $.fn.ghZtree.defaults, options);
		
		initParam(opts);
		var $this = $(this);
		var id = $this.attr("id");
		showTree(id);
	}
	
	$.fn.ghZtree.defaults = {
		comGrade : ''
	};
	
	// 初始化全局变量
	function initParam(opts) {
		if (opts.comGrade != undefined) {
			comGrade = opts.comGrade;
		}
	}

	function showTree(id){
		var source = common.ctx + sourceUrl + "&comGrade=" + $("#comGrade").val();
		$.get(source, function(data) {
			loadTree(id,eval(data));
		});
	}
	
	function zTreeOnChange(event, treeId, treeNode) {
	     var selectId = $("#selectId").val();
		 var selectNodeCode = selectId + "Code";
		 var selectNodeName = selectId + "Name";
		 parent.$("#" + selectNodeCode).val(treeNode.code);
		 parent.$("#" + selectNodeName).val(treeNode.name);
	}
	
	function zTreeOnClick(event, treeId, treeNode) {
	     var selectId = $("#selectId").val();
		 var selectNodeCode = selectId + "Code";
		 var selectNodeName = selectId + "Name";
		 parent.$("#" + selectNodeCode).val(treeNode.code);
		 parent.$("#" + selectNodeName).val(treeNode.name);
	}


	function loadTree(id, zTreeNodes) {
		var setting = {
			isSimpleData : true,
			treeNodeKey : "id",
			treeNodeParentKey : "pid",
			showLine : true,
			expandSpeed :"fast"
		};
		//setting.checkable = true;
		//setting.checkStyle = "radio";
		//setting.checkRadioType = "all";
		setting.callback = {
			click : zTreeOnClick
		};
		var zTree = $("#" + id).zTree(setting, zTreeNodes);
	}
})(jQuery);