

 
		var zTree = null; 
 
		var settingModulePath = {
				view: { 
					selectedMulti: false,
					dblClickExpand: false
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				async : {
					enable : true,
					url: rootPath+"config/module/module.do?action=initModuleTree&random="+ Math.random(),
					autoParam:["id", "name=n", "level=lv"],
					otherParam:{"otherParam":"zTreeAsyncTest"},
					dataFilter: filter
				},
				
				callback: {
					beforeClick: beforeModulePathClick, 
					onClick: onModulePathClick,
					onAsyncError: onAsyncError, 
					onAsyncSuccess: onAsyncSuccess
				}
		};


		function beforeModulePathClick(treeId, treeNode, clickFlag) {
		    return true;
		} 
 

		function onModulePathClick(event, treeId, treeNode, clickFlag) {
            if(treeNode && treeNode.id>0){
            	$("#moduleId").val(treeNode.id);
    			$("#modulePathSel").val(treeNode.name);
            }else{
            	$("#moduleId").val('');
    			$("#modulePathSel").val('');
            } 
			hideModulePathMenu();
		}
  
		function filter(treeId, parentNode, childNodes) {
			if (!childNodes) return null;
				for (var i=0, l=childNodes.length; i<l; i++) {
				  childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			}
			return childNodes;
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
		         		} 
		         		zTree.expandNode(nodesel, true, false, false, null);
					}
				}
			}
			
		}
		 

		function showModulePathMenu() { 
			var resultObj = $("#modulePathSel");
			var resultOffset = $("#modulePathSel").offset();
			$("#modulePathContent").css({left:(resultOffset.left-5) + "px", top:(resultOffset.top + resultObj.outerHeight()-10) + "px"}).slideDown("fast");
			$("body").bind("mousedown", onBodyModulePathDown);
		}
		function hideModulePathMenu() {
			$("#modulePathContent").fadeOut("fast");
			$("body").unbind("mousedown", onBodyModulePathDown);
		}
		function onBodyModulePathDown(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "modulePathContent" || $(event.target).parents("#modulePathContent").length>0)) {
				hideModulePathMenu();
			}
		}

  
var PropertyUatMain = {
		
		init:function(){

			$(window).resize(function(){
				$("#propertyUatListGrid").setGridWidth($(document.body).width()*0.92); 
			});
  
			$("#propertyUatListGrid").jqGrid({
				mtype : "GET",
				datatype : "local",  
				height: 'auto',
				autowidth : true,
				multiselect : true,
				shrinkToFit : false,
				adjustTarget : 'queryConditionTable',
				colNames : ['发布Id','栏目Id','属性Id','属性名称','属性编码','属性路径','属性环境','版本' ,'修改时间','修改者','操作'],
			    colModel :  [ 
			                  {name : 'publishId',index:'publishId',hidden:true},
			                  {name : 'propertyId',index:'propertyId',hidden:true},
			                  {name : 'moduleId',index:'moduleId',hidden:true},
			                  {name : 'name', index : 'name', width : 100, resizable : true,  sortable:false,align : 'center' },
			                  {name : 'code', index : 'code', width : 100, resizable : true,  sortable:false,align : 'center' },
			                  {name : 'path', index : 'path', width : 200, resizable : true,  sortable:false,align : 'center' },
			                  {name : 'profile', index : 'profile', width : 75, resizable : true,  sortable:false,align : 'center' },
			                  {name : 'version', index : 'version', width : 135, resizable : true,  sortable:false,align : 'center' },
			                  
			                  {name : 'modifiedDate', index : 'modifiedDate', width : 150, resizable : true,  sortable:false,align : 'center' },
			                  {name : 'modifiedUser', index : 'modifiedUser', width : 150, resizable : true,  sortable:false,align : 'center' },
			                  {name : 'operation', index : 'operation', width : 200, resizable : true,  sortable:false,align : 'center' }

				            ],
				rowNum : 10,
				rowList : [ 10, 30, 50 ], 
				pager : '#propertyUatListPager',
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
					id:'publishId'
				},
				gridComplete: function(){ 
					
					var ids = $("#propertyUatListGrid").jqGrid('getDataIDs');				
					for(var i=0;i < ids.length;i++){ 
						 
						var rowArray = $("#propertyUatListGrid").jqGrid('getRowData',ids[i]);			
						
						var setStopOper = '<a href=\"#\" onclick=\"PropertyUatMain.stopPropertyByEnv(\''+rowArray.publishId+'\', \''+rowArray.propertyId+'\')\">'+'停用'+'</a>'; 
						var viewPrdOper = '<a href=\"#\" onclick=\"PropertyUatMain.modifyPrdProperty(\''+rowArray.publishId+'\', \''+rowArray.propertyId+'\',\''+rowArray.profile+'\')\">'+'重新发布'+'</a>'; 
					   var viewPrdHisOper = '<a href=\"#\" onclick=\"PropertyUatMain.hisViewProperty(\''+rowArray.publishId+'\', \''+rowArray.propertyId+'\',\''+rowArray.profile+'\',\'no\')\">'+'历史版本'+'</a>'; 
						$("#propertyUatListGrid").jqGrid('setCell', ids[i], 'operation',  setStopOper+" | "+viewPrdOper+" | "+viewPrdHisOper);
						
					}
					
				}, 
				onSelectRow : function(id){
					 var selectData = $("#propertyUatListGrid").getRowData(id);
					 if(selectData){
						 PropertyUatMain.findPropertyById(selectData.propertyId, selectData.version);
					 }  
				}, 
				beforeRequest : function(){
					$("#propertyUatListGrid").setGridWidth($(document.body).width()*0.92);
					$("#nameViw").html('');
	        		$("#codeViw").html('');
	        		$("#pathViw").html('');
	        		$("#versionViw").html('');
	        		$("#contentViw").html('');
				}
			
			});
			
			//查询数据
			$('#query').click(function(){
				if(PropertyUatMain.reValidate()){
					PropertyUatMain.gridReload();
				} 
			});
		},

		//查询出属性定义表最新数据
		findPropertyById: function(propertyId, version) {
			if( null!=propertyId && propertyId.length>0  && propertyId!='undefined'){
					$.ajax({
					        url: $.ghHash.get("ctx")+ "/config/property/property.do?action=getPropertyJson",
					        type : "post",
					        async : true,
					        dataType:"json",
					        data: {propertyId:propertyId}, 
					        success: function(data){
					        	if(data){
					        		$("#nameViw").html(data.name);
					        		$("#codeViw").html(data.code);
					        		$("#pathViw").html(data.path);
					        		$("#contentViw").html(data.content);
					        		if(null!=version && ''!=version && version!=data.version){
					        			$("#versionViw").html('<font color="red">'+data.version+'</font>');
					        		}else{
					        			$("#versionViw").html(data.version);
					        		}
					        	}
					        }, 
					        beforeSend: function(){
					        	$("#nameViw").html('');
				        		$("#codeViw").html('');
				        		$("#pathViw").html('');
				        		$("#versionViw").html('');
				        		$("#contentViw").html('');
					        },
					        error: function(){
					        	common.showMsgDialog("过去属性定义出现异常！"); 
					        },
					        complete: function(){
					        	
					        }   
				     });
			}	 
		}, 
		//修改属性信息
		modifyPrdProperty: function(publishId, propertyId, profile) {
			$("#propertyUatListGrid").jqGrid('setSelection', publishId, true);
			if(null!=propertyId && ''!=propertyId && null!=profile && ''!=profile){
				var modifyPrdPropertyUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/property/property.do?action=modifyPrdProperty&propertyId="+propertyId+"&profile="+profile+"&random="+ Math.random());
				window.open(modifyPrdPropertyUrl);
			}
		},
		hisViewProperty: function(publishId, propertyId, profile, isSelect) {
			if(propertyId && profile && isSelect){
				$("#propertyUatListGrid").jqGrid('setSelection', publishId, true);
				var viewPrdUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/property/property.do?action=viewHisListPage&random="+ Math.random()+"&propertyId="+propertyId+"&profile="+profile+"&isSelect="+isSelect);
				window.open(viewPrdUrl);
			} 
		},
		//停止 属性
		stopPropertyByEnv: function(publishId, propertyId) {
			$("#propertyUatListGrid").jqGrid('setSelection', publishId, true);
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
						        	PropertyUatMain.reloadUatListGrid(); 
						        }   
						      });
						}
				 };
			     common.showConfirmFixDialog(option);
			}else{
				 common.showMsgDialog("停用参数不全，不能进行停用！");
			} 
		},
		reloadUatListGrid : function() {
			jQuery("#propertyUatListGrid").jqGrid('setGridParam', {
	            page : 1
	        }).trigger('reloadGrid'); 
		},
		//查询数据 
		gridReload : function() {
			 
			//设置参数
			jQuery("#propertyUatListGrid").jqGrid('setPostData',{
				moduleId : $("#moduleId").val(), 
				profile : $("#profile").val(),
				profileAll : $("#profileAll").val(),
				code : $("#code").val(),
				name : $("#name").val()
				
			});	
			jQuery("#propertyUatListGrid").jqGrid('setGridParam', {
				datatype:'xml',
				url :$.ghHash.get("ctx")+ "/config/property/property.do?action=findPublishUatList&random="+ Math.random(),
				page : 1
			});
			jQuery("#propertyUatListGrid").trigger("reloadGrid");
		},
		
		//参数验证
		reValidate:function(){
			//去除左右空格 
			var moduleId = $("#moduleId").val();
			if(!moduleId){
				common.showMsgDialog("请先选择栏目，不能进行查询！");
				return false;
			}
			return true;
		}
 
}
