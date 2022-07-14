/**
 *
 *
 *
 */
// 创建一个闭包   
( function($) {
	var menuDate = "";
	var isCache = "true";
	var source = "";

	var titilArray = new Array();

	var TITLE_PREFIX = "当前位置：";

	var TITLE_SEP = " > ";
	
	var zTree;
	var str;

	//动态构架菜单
	$.fn.menuTree = function(options,param, val) {
		if (typeof (options) == 'string') {
			switch (options.toLowerCase()) {
			case "inittitle":
				return titilArray.push(val);
			}
		}
		
		if(param!=""){
			str=$("#selectMenuId").val();
		}
		
		// build main options before element iteration    
		var opts = $.extend( {}, $.fn.menuTree.defaults, options);
		// Our plugin implementation code goes here.  
		initParam(opts);
		//loadMenu(this);
		//createMainIframe();

		buildMenu();
		//setTimeout(function(){
		//	$(".treeDiv").ghTree();
		//},100);	

	};

	$.fn.menuTree.defaults = {
		source : '', //数据来源
		isCash : ''
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

	function loadAjaxMenu(pid) {
		if (!isCache) {
			sourceUrl += '&random=' + Math.random();
		}
		$.get(sourceUrl, {"pid" : pid}, function(data) {
			targetObj = $("#treeDivId_" + pid);
			loadMenu(targetObj,eval(data));
		});
	}

	function buildMenu() {
		for ( var i = 0; i < titilArray.length; i++) {
			var pid = titilArray[i];
			loadAjaxMenu(pid);
		}
	}

	
	function zTreeOnClick(event, treeId, treeNode) {
		 if(treeNode!=null&&treeNode.url!=null&&treeNode!=""){
			 var url = encodeURI(treeNode.url);
			 $("#mainTarget").attr("href",url);
//			 document.getElementById("mainTarget").href=treeNode.url;
			 var a=document.getElementById("mainTarget");  
//			 $("#mainTarget").click;
			 a.click();
		 }
	}

	function loadMenu(targetObj, menuTree) {
		var setting = {
			isSimpleData : true,
			expandSpeed : "fast",
			treeNodeKey : "id",
			treeNodeParentKey : "pId",
			showLine : true,
			expandTriggerFlag : true
//			callback : {
//				click : zTreeOnClick
//			}
		};

		var curType = '0';
		var curLi;

		if (curLi) {
			curLi.removeClass("focus");
		}
		$("#sim").attr("disabled", true);
		$("#flag").attr("disabled", true);

		curLi = $("#defaultStyle");

		curLi.addClass("focus");
		
		zTree = targetObj.zTree(setting, menuTree);
		if(str!=null&&str!=""){
			selectMenu(str)
		}
//		var nodes = zTree.getNodesByParam("id", 12201002);
//		if(nodes!=null&&nodes[0]!=null){
//			zTree.selectNode(nodes[0]);
//			zTreeOnClick(event,"#tree",nodes[0]);
//		}
	}
	function selectMenu(selectId){
		var nodes = zTree.getNodesByParam("id", selectId);
		zTree.selectNode(nodes[0]);
		zTreeOnClick(event,"#tree",nodes[0]);
	}

	// 闭包结束  
})(jQuery);
