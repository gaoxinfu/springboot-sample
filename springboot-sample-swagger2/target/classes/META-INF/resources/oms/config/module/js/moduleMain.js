 
//展现module结构树
var zTree = null; 
var rMenu = null; 

var setting = {
	view: { 
		selectedMulti: false 
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	async : {
		enable : true,
		url: "module.do?action=initModuleTree&random="+ Math.random(),
		autoParam:["id", "name=n", "level=lv"],
		otherParam:{"otherParam":"zTreeAsyncTest"},
		dataFilter: filter
	},
	
	callback: {
		beforeClick: beforeClick,
		beforeAsync: beforeAsync,
		onRightClick: onRightClick,
		onClick: onClick,
		onAsyncError: onAsyncError,
		onExpand: onExpand,
		onAsyncSuccess: onAsyncSuccess
	}
};
function filter(treeId, parentNode, childNodes) {
	if (!childNodes) return null;
		for (var i=0, l=childNodes.length; i<l; i++) {
		  childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
} 

function beforeAsync(treeId, treeNode) {
	 return true;
}


function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
	
}

function onAsyncSuccess(event, treeId, treeNode, msg) { 
	var currentLevel = 0, nodeList = null;
	if(treeNode){currentLevel = treeNode.level+1; }else{ currentLevel = 0;  } 
	if(currentLevel>=0 && currentLevel<1){
		nodeList = zTree.getNodesByParam("level",  currentLevel);
		if(nodeList&&nodeList.length>0){
			for(var i=0; i<nodeList.length; i++){
				var nodesel =  nodeList[i];
         		if(nodesel && nodesel.id=='0'){
         			zTree.selectNode(nodesel); 
         			zTree.setting.callback.onClick(null, zTree.setting.treeId, nodesel);//调用事件
         		} 
         		zTree.expandNode(nodesel, true, false, false, null);
         		zTree.setting.callback.onExpand(null, zTree.setting.treeId, nodesel);//调用事件
			}
		}
	}
	
}
 
function beforeClick(treeId, treeNode, clickFlag) {
    return true;
} 

function onExpand(event, treeId, treeNode) {
	//alert("onExpand");
	return true;
} 

function onClick(event, treeId, treeNode, clickFlag) {
	if(treeNode && treeNode.id!=0){
		$('#addProperty').attr("disabled", false); 
	}else{
		$('#addProperty').attr("disabled", true); 
	}
	$("#currentModuleId").val(treeNode.id);
	ModuleMain.gridReload(); 
}

function onRightClick(event, treeId, treeNode) {
    if (treeNode && !treeNode.noR) {
		zTree.selectNode(treeNode);
		zTree.setting.callback.onClick(null, zTree.setting.treeId, treeNode);//调用事件
		showRMenu("node", treeId, treeNode,event.clientX, event.clientY);
	}
}

function showRMenu(type, treeId, treeNode, x, y) {
	$("#rMenu ul").show();
	if(treeNode && 0==treeNode.id){ 
		$("#m_add").show();
		$("#m_update").hide();
		$("#m_remove").hide(); 
		$("#m_reset").hide(); 
		$("#m_reset").show(); 
	}else if(treeNode){
		$("#m_add").show(); 
		$("#m_update").show();
		$("#m_remove").show();
		$("#m_reset").hide();  
		$("#m_reset").show(); 
	} 
	rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});
	$("body").bind("mousedown", onBodyMouseDown);
}

function hideRMenu() {
	if (rMenu) rMenu.css({"visibility": "hidden"});
	$("body").unbind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event){
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}

function addTreeNode() {
	hideRMenu();
	var selectNodes = zTree.getSelectedNodes();
	if(selectNodes && selectNodes.length==1){
		var selNodeId = selectNodes[0].id; 
		var addModulePageUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/module/module.do?action=addModulePage&random="+ Math.random()+"&parentModuleId="+selNodeId);
		window.open(addModulePageUrl);
	}else{
		 common.showMsgDialog("无选中栏目，不能进行新增！");
	}
}

function updateTreeNode() {
	hideRMenu();
	var selectNodes = zTree.getSelectedNodes();
	if(selectNodes && selectNodes.length==1){
		var selNodeId = selectNodes[0].id; 
		var modModulePageUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/module/module.do?action=modfiyModulePage&random="+ Math.random()+"&moduleId="+selNodeId);
		window.open(modModulePageUrl);
	}else{
		common.showMsgDialog("无选中栏目，不能进行修改！");
	}
}

//删除节点
function removeTreeNode() {
	hideRMenu();
	
	var selectNodes = zTree.getSelectedNodes();
	
	if(selectNodes && selectNodes.length==1){
		var selNodeId = selectNodes[0].id;
		if(selNodeId && null!=selNodeId && ''!=selNodeId){
			var option = {
					title : "请确认",
					msg : "确定删除这个栏目吗？",
					confirm : function(){
						$.ajax({
					        url: $.ghHash.get("ctx")+ "/config/module/module.do?action=delModulesAndProps",
					        type : "post",
					        async : true,
					        dataType:"json",
					        data: {moduleId: selNodeId}, 
					        success: function(data){
					        	common.showMsgDialog(data.resultMessage); 
					        }, 
					        error: function(){
					        	common.showMsgDialog("删除栏目出现异常！"); 
					        },
					        complete: function(){
					        	//刷新下面的属性生产列表
					        	resetPidTree();
					        }   
					      });
					}
			 };
		     common.showConfirmFixDialog(option);
		}else{
			 common.showMsgDialog("选中栏目参数不全，不能进行删除！");
		}
	}else{
		 common.showMsgDialog("无选中栏目，不能进行删除！");
	}
	  
} 

//重置刷新
function resetTree() {
	hideRMenu();
	var selectNodes = zTree.getSelectedNodes();
	
	if(selectNodes && selectNodes.length==1){
		var selNodeId = selectNodes[0].id;
    	var nodep = zTree.getNodeByParam("id", selNodeId, null);
		if (nodep) {  
			 zTree.reAsyncChildNodes(nodep, "refresh", false);
			 zTree.selectNode(nodep); 
			 zTree.setting.callback.onClick(null, zTree.setting.treeId, nodep);//调用事件
		}
	}else{
		zTree = $.fn.zTree.init($("#moduleTree"), setting); 
	} 
}

//重置刷新
function resetPidTree() {
	var selectNodes = zTree.getSelectedNodes();
	if(selectNodes && selectNodes.length==1){
		var selNodeId = selectNodes[0].id;
		var parentNode = selectNodes[0].getParentNode();
		var pid = parentNode.id;
		var nodep = zTree.getNodeByParam("id", pid, null);
		if (nodep) {  
			 zTree.reAsyncChildNodes(nodep, "refresh", false);
			 zTree.selectNode(nodep); 
			 zTree.setting.callback.onClick(null, zTree.setting.treeId, nodep);//调用事件
		}
	}else{
		zTree = $.fn.zTree.init($("#moduleTree"), setting); 
	} 
}

var ModuleMain = {
		init:function(){
			$('#addProperty').attr("disabled", true); 
			
			//新增
			$('#addProperty').click(function(){ 
				var currentModuleId = $("#currentModuleId").val();
				if(currentModuleId && currentModuleId>0){
					var modifyPropertyUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/property/property.do?action=addPage&random="+ Math.random()+"&moduleId="+currentModuleId);
					window.open(modifyPropertyUrl);
				} 
				
			});
			
			//发布属性
			$('#publishProperty').click(function(){ 
				 
				  var propertyId = $('#moduleMainGrid').jqGrid('getGridParam','selrow');
				  
				  if(null!=propertyId && ''!=propertyId){
					    var rowData = $('#moduleMainGrid').jqGrid('getRowData', propertyId);
					    var publishEnv = $('#publishEnv').val();
					    
					    if(null!=publishEnv && ''!=publishEnv){
					    	   var showCode = rowData.code;
					    	   var version = rowData.version;
					    	 
					    	    //alert(selectId+" = "+rowData.code+" = "+publishEnv);
								var option = {
										title : "请确认",
										msg : "确定发布编码为【"+showCode+"】的属性到【"+publishEnv+"】环境吗？",
										confirm : function(){
											$.ajax({
										        url: $.ghHash.get("ctx")+ "/config/publish/publish.do?action=publishProperty",
										        type : "post",
										        async : true,
										        dataType:"json",
										        data: {profile:publishEnv, propertyId:propertyId}, 
										        success: function(data){
										        	common.showMsgDialog(data.resultMessage); 
										        }, 
										        error: function(){
										        	common.showMsgDialog("发布属性出现异常！"); 
										        },
										        complete: function(){
										        	//刷新下面的属性生产列表 
										        	 ModuleMain.reloadPropertyPrd(); 
										        }   
										      });
										}
								 };
							     common.showConfirmFixDialog(option);
							 
					    }else{
							  common.showMsgDialog("请先选中需要发布的环境！");
						} 
				  }else{
					  common.showMsgDialog("请先选中需要发布的属性！");
				  }
			});
			
			
			
			//初始化查询列表 1584 
			$("#moduleMainGrid").jqGrid({
				mtype : "GET",
				datatype : "local",  
				height: 'auto',
				autowidth : true, 
				shrinkToFit : false,
				adjustTarget : 'queryConditionTable',
				colNames : [ '属性标识', '属性编码', '属性名称', '栏目路径', '属性版本', '是否有效', '创建时间', '创建人', '修改时间', '修改人', '操作' ],
				colModel : [ {name : 'propertyId', index:'propertyId', hidden: true},
				             {name : 'code', index : 'code', width : 110, resizable : true,  sortable:false,align : 'center' },
				             {name : 'name', index : 'name', width : 120, resizable : true,  sortable:false,align : 'center' },
				             
				             {name : 'path', index : 'path', width : 190, resizable : true,  sortable:false,align : 'center' },
				             {name : 'version', index : 'version', width : 155, resizable : true,  sortable:false,align : 'center' },
				        
				             {name : 'isDelete', index : 'isDelete',width : 70,resizable : true, sortable:false,align : 'center'},
				             {name : 'createdDate',index : 'createdDate',width : 150,resizable : true, sortable:false,align : 'center'},
				             {name : 'createdUser', index : 'createdUser', width : 60, resizable : true, sortable:false, align : 'center' } ,
				             {name : 'modifiedDate',index : 'modifiedDate',width : 150,resizable : true, sortable:false,align : 'center'},
				             {name : 'modifiedUser', index : 'modifiedUser', width : 60, resizable : true, sortable:false, align : 'center' } ,
				            
				             {name : 'operation', index : 'operation', width : 150, resizable : false,  sortable:false,align : 'center' }
				          
					     ],
				rowNum : 10,
				rowList : [ 10, 30, 50 ], 
				pager : '#moduleMainPager',
				emptyrecords: '无记录返回！',
				viewrecords : true,
				rownumbers:true,
				multiselect : false,
				xmlReader : {
					repeatitems : false,
					root : "object",
					row : "ConfigPropertyDto",
					page : 'page',
					total : 'total',
					records : 'records',
					id : "propertyId"
				},
				gridComplete: function(){ 
					var ids = $("#moduleMainGrid").jqGrid('getDataIDs');				
					for(var i=0;i < ids.length;i++){ 
						var rowArray = $("#moduleMainGrid").jqGrid('getRowData',ids[i]);			
					 
						var modifyPrdOper = '<a href=\"#\" onclick=\"ModuleMain.modifyProperty(\''+rowArray.propertyId+'\')\">'+'修改'+'</a>'; 
						var deletePrdOper = '<a href=\"#\" onclick=\"ModuleMain.deleteProperty(\''+rowArray.propertyId+'\')\">'+'删除'+'</a>'; 
						var viewPrdOper = '<a href=\"#\" onclick=\"ModuleMain.hisViewProperty(\''+rowArray.propertyId+'\')\">'+'历史版本'+'</a>'; 
						
						$("#moduleMainGrid").jqGrid('setCell', ids[i], 'operation', modifyPrdOper+" | "+deletePrdOper+" | "+viewPrdOper);
						
						//是否可用
						var isDelete = rowArray.isDelete;
						var isDeleteName = '';
						if(isDelete=='0'){
							isDeleteName = '有效';
						}else if(isDelete=='1'){
							isDeleteName = '<font color = "red">无效</font>';
						}
						$("#moduleMainGrid").jqGrid('setCell', ids[i], 'isDelete', isDeleteName);
						
					}
				},  
				onSelectRow : function(rowid, status) {
					 var selectData = $("#moduleMainGrid").getRowData(rowid);
					 if(selectData && ModuleMain.rePropertyPrdValidate()){
						 //alert(selectData.propertyId);
					     ModuleMain.gridPropertyPrdReload({'propertyId':selectData.propertyId, 'version':selectData.version});
					 }  
				}, 
				
				loadBeforeSend : function(xhr, settings) {
					 //清空数据
					 ModuleMain.gridPropertyPrdReload({'propertyId':0, 'version':'00000000000000000'});
					
				}, 
				
				beforeRequest : function(){
					
					$("#moduleMainGrid").setGridWidth($(document.body).width()-360);
					
				} 
				
			});
			
			 
			
			//发布信息

			//初始化查询列表 1584 
			$("#propertyPrdGrid").jqGrid({
				mtype : "GET",
				datatype : "local",  
				height: 'auto',
				autowidth : true, 
				shrinkToFit : false,
				adjustTarget : 'queryConditionTable2',
				colNames : [ '发布ID', '属性ID', 'ModID','属性环境','版本' , '是否最新版本', '修改时间', '修改人', '操作' ],
				colModel : [ {name : 'publishId', index:'publishId', hidden: true},
				             {name : 'propertyId', index:'propertyId', hidden: true},
				             
				             {name : 'moduleId', index:'moduleId', hidden: true},
				             {name : 'profile',index : 'profile',width : 80,resizable : true, sortable:false,align : 'center'},
				             {name : 'version',index : 'version',width : 150,resizable : true, sortable:false,align : 'center'},
					           
				       
				             {name : 'isUpdate', index : 'isUpdate',width : 90,resizable : true, sortable:false,align : 'center'},
				             {name : 'modifiedDate',index : 'modifiedDate',width : 150,resizable : true, sortable:false,align : 'center'},
				             {name : 'modifiedUser', index : 'modifiedUser', width : 60, resizable : true, sortable:false, align : 'center' } ,
				             {name : 'operation', index : 'operation', width : 120, resizable : false,  sortable:false,align : 'center' } 
				            ],
				rowNum : 10,
				rowList : [ 10, 30, 50 ], 
				pager : '#propertyPrdPager',
				emptyrecords: '无记录返回！',
				viewrecords : true,
				rownumbers:true,
				multiselect : false,
				xmlReader : {
					repeatitems : false,
					root : "object",
					row : "PublishPropertyDto",
					page : 'page',
					total : 'total',
					records : 'records',
					id : "publishId"
				},
				gridComplete: function(){ 
					var ids = $("#propertyPrdGrid").jqGrid('getDataIDs');
					var pversion = '';
					var pversionObj = $("#propertyPrdGrid").getPostData();
					if(pversionObj && pversionObj.version){
						pversion = pversionObj.version;
					} 
					for(var i=0;i < ids.length;i++){ 
						
						var rowArray = $("#propertyPrdGrid").jqGrid('getRowData',ids[i]);			
						 
						var prdVersion = rowArray.version;
						//alert(prdVersion+" = "+pversion);
						if(prdVersion==pversion){
							$("#propertyPrdGrid").jqGrid('setCell', ids[i], 'isUpdate', '最新版本');
						}else{
							$("#propertyPrdGrid").jqGrid('setCell', ids[i], 'isUpdate', '<font color = "red">可更新</font>');
						}
						
						var setStopOper = '<a href=\"#\" onclick=\"ModuleMain.stopPropertyByEnv(\''+rowArray.publishId+'\', \''+rowArray.propertyId+'\')\">'+'停用'+'</a>'; 
						var viewPrdOper = '<a href=\"#\" onclick=\"ModuleMain.hisViewPrdProperty(\''+rowArray.publishId+'\',\''+rowArray.propertyId+'\',\''+rowArray.profile+'\')\">'+'历史版本'+'</a>'; 
						$("#propertyPrdGrid").jqGrid('setCell', ids[i], 'operation',  setStopOper+" | "+viewPrdOper);
						
						
					}
				},  
				onSelectRow : function(rowid, status) {
					 var selectData = $("#propertyPrdGrid").getRowData(rowid);
					 if(selectData && selectData.profile){
						 $("#publishEnv").val(selectData.profile);
					 }else{
						 $("#publishEnv").val('');
					 }  
					 
				}, 
				loadBeforeSend : function(xhr, settings) {
					 $("#publishEnv").val('');
				}, 
				beforeRequest : function(){
					$("#propertyPrdGrid").setGridWidth($(document.body).width()-360);
				} 
			});
			
		
			
		},  
		//查询数据 
		gridReload : function(params) {
			 
			var moduleId = $("#currentModuleId").val();
			//设置参数
			jQuery("#moduleMainGrid").jqGrid('setPostData',{ 
				moduleId : moduleId
			});
			
			jQuery("#moduleMainGrid").jqGrid('setGridParam', {
				datatype:'xml',
				url :$.ghHash.get("ctx")+ "/config/property/property.do?action=findPropertyList&random="+ Math.random(),
				page : 1
			});
			
			jQuery("#moduleMainGrid").trigger("reloadGrid");
			
		},
		reloadProperty : function() {
			jQuery("#moduleMainGrid").jqGrid('setGridParam', {
	            page : 1
	        }).trigger('reloadGrid'); 
		},
		//参数验证
		reValidate:function(){
			//去除左右空格
			return true;
		},
		 
		//查询数据 
		gridPropertyPrdReload : function(params) {
			
			//设置参数
			jQuery("#propertyPrdGrid").jqGrid('setPostData',{ 
				propertyId : params.propertyId,
				version : params.version
			});
			
			jQuery("#propertyPrdGrid").jqGrid('setGridParam', {
				datatype:'xml',
				url :$.ghHash.get("ctx")+ "/config/property/property.do?action=findPublishList&random="+ Math.random(),
				page : 1
			});
			
			jQuery("#propertyPrdGrid").trigger("reloadGrid");
			
		},
		// 
		reloadPropertyPrd : function() {
			jQuery("#propertyPrdGrid").jqGrid('setGridParam', {
	            page : 1
	        }).trigger('reloadGrid'); 
		},
		
		//参数验证
		rePropertyPrdValidate:function(){
			//去除左右空格
		 
			return true;
		},
		
		//修改属性信息
		modifyProperty: function(propertyId) {
			$("#moduleMainGrid").jqGrid('setSelection', propertyId, true);
			var modifyPropertyUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/property/property.do?action=modifyPage&random="+ Math.random()+"&propertyId="+propertyId);
			window.open(modifyPropertyUrl);
		},
		//删除属性信息
		deleteProperty: function(propertyId) {
			
			$("#moduleMainGrid").jqGrid('setSelection', propertyId, true);
			
			if(null!=propertyId && propertyId.length>0){
				var option = {
						title : "请确认",
						msg : "确定删除这个配置属性吗？",
						confirm : function(){
							$.ajax({
						        url: $.ghHash.get("ctx")+ "/config/property/property.do?action=deleteProperty",
						        type : "post",
						        async : true,
						        dataType:"json",
						        data: {propertyId:propertyId}, 
						        success: function(data){
						        	common.showMsgDialog(data.resultMessage); 
						        }, 
						        error: function(){
						        	common.showMsgDialog("删除属性出现异常！"); 
						        },
						        complete: function(){
						        	//刷新下面的属性生产列表
						        	 ModuleMain.reloadProperty();
						        }   
						      });
						}
				 };
			     common.showConfirmFixDialog(option);
			}else{
				 common.showMsgDialog("删除参数不全，不能进行删除属性！");
			} 
			
		},
		
		//查看历史记录发布
		hisViewProperty: function(propertyId) {
			if(propertyId){
				$("#moduleMainGrid").jqGrid('setSelection', propertyId, true);
				var viewPrdUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/property/property.do?action=viewHisListPage&random="+ Math.random()+"&propertyId="+propertyId);
				window.open(viewPrdUrl);
			}
		},
		// 
		hisViewPrdProperty: function(publishId, propertyId, profile) {
			$("#propertyPrdGrid").jqGrid('setSelection', publishId, true);
			if(propertyId && profile){
				var viewPrdUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/property/property.do?action=viewHisListPage&random="+ Math.random()+"&propertyId="+propertyId+"&profile="+profile);
				window.open(viewPrdUrl);
			} 
		},
		 
		//停止 属性
		stopPropertyByEnv: function(publishId, propertyId) {
			$("#propertyPrdGrid").jqGrid('setSelection', publishId, true);
			if( null!=publishId && publishId.length>0  && publishId!='undefined' && null!=propertyId && propertyId.length>0 && propertyId!='undefined' ){
				var option = {
						title : "请确认",
						msg : "确定停用这个配置属性吗？",
						confirm : function(){
							$.ajax({
						        url: $.ghHash.get("ctx")+ "/config/publish/publish.do?action=stopProperty",
						        type : "post",
						        async : true,
						        dataType:"json",
						        data: {publishId:publishId}, 
						        success: function(data){
						        	common.showMsgDialog(data.resultMessage); 
						        }, 
						        error: function(){
						        	common.showMsgDialog("停用属性出现异常！"); 
						        },
						        complete: function(){
						        	//刷新下面的属性生产列表
						        	ModuleMain.reloadPropertyPrd(); 
						        	
						        }   
						      });
						}
				 };
			     common.showConfirmFixDialog(option);
			}else{
				 common.showMsgDialog("停用参数不全，不能进行停用！");
			} 
		}
}

 
$(document).ready(function() {
	//加载model树
	zTree = $.fn.zTree.init($("#moduleTree"), setting); 
	rMenu = $("#rMenu");
	
	ModuleMain.init();
	
	resizeAll();

  	if(navigator.userAgent.indexOf("MSIE 6.0") > 0) {
   		if (jQuery.browser.msie) {
   		    $a = jQuery('.ui-jqgrid .ui-jqgrid-bdiv');
   		    $a.css('padding', '0 0 15px 0');
   		      var myheight = jQuery('#gridId').jqGrid('getGridParam','height');
   		    if( myheight == '100%'){
   		        $a.css('overflow-y', 'hidden');
   		    }
   		 }
   	}
});

function resizeAll(){
	
	$("#moduleFieldset").height($(document.body).height()-100);  
	$("#moduleTree").height($(document.body).height()-135);  
 
	$("#propertyUlall").height($(document.body).height()-125);  
	 
	$("#propertyUlall").width($(document.body).width()-337);
	
	$("#moduleMainGrid").setGridWidth($(document.body).width()-360);
	$("#propertyPrdGrid").setGridWidth($(document.body).width()-360);
	
}

$(window).resize(function(){
	resizeAll();
});