var PropertyHisMain = {
		 
		init:function(){
		
			$(window).resize(function(){
				$("#propertyHisListGrid").setGridWidth($(document.body).width()*0.92);
			});
   
			 
			$("#back").click( function() { 
				if(window.opener && window.opener.ModuleMain){
					 window.opener.ModuleMain.reloadPropertyPrd();
				}else if(window.opener && window.opener.PropertyUatMain){
					 window.opener.PropertyUatMain.reloadUatListGrid();
				}
	        	window.close();  
			});
			
			$("#propertyHisListGrid").jqGrid({
				mtype : "GET",
				datatype : "local",  
				height: 'auto',
				autowidth : true,
				multiselect : true,
				shrinkToFit : false,
				adjustTarget : 'queryConditionTable',
				colNames : [ '历史ID',  '栏目ID',  '属性ID', '属性名称', '属性项编码', '属性路径','属性环境','操作类型','版本' , '修改时间', '修改人', '操作'],
				colModel : [ {name : 'historyId', index:'historyId',  width : 80, resizable : true,  sortable:false,align : 'center' },
				             {name : 'moduleId', index:'moduleId', hidden: true},
				             {name : 'propertyId', index:'propertyId', hidden: true},
				             {name : 'name', index : 'name', width : 100, resizable : true,  sortable:false,align : 'center' },
				             {name : 'code', index : 'code', width : 100, resizable : true,  sortable:false,align : 'center' },
				             
				             {name : 'path',index : 'path',width : 150,resizable : true, sortable:false,align : 'center'},
				             {name : 'profile',index : 'profile',width : 80,resizable : true, sortable:false,align : 'center'},
				             {name : 'operType',index : 'operType',width : 80,resizable : true, sortable:false,align : 'center'},
				             {name : 'version',index : 'version',width : 150,resizable : true, sortable:false,align : 'center'},
					           
				        
				             {name : 'modifiedDate',index : 'modifiedDate',width : 150,resizable : true, sortable:false,align : 'center'},
				             {name : 'modifiedUser', index : 'modifiedUser', width : 60, resizable : true, sortable:false, align : 'center' },
				             {name : 'setRollbackOper', index : 'setRollbackOper', width : 80, resizable : false,  sortable:false,align : 'center' }
//				             {name : 'setHistoryDetail', index : 'setHistoryDetail', width : 80, resizable : false,  sortable:false,align : 'center' } 
				            ],
				rowNum : 10,
				rowList : [ 10, 30, 50 ], 
				pager : '#propertyHisListPager',
				emptyrecords: '无记录返回！',
				viewrecords : true,
				rownumbers:true,
				multiselect : false,
				xmlReader : {
					repeatitems : false,
					root : "object",
					row : "PublishHistoryDto",
					page : 'page',
					total : 'total',
					records : 'records',
					id : "historyId"
				},
				gridComplete: function(){ 
					
					var ids = $("#propertyHisListGrid").jqGrid('getDataIDs');				
					for(var i=0;i < ids.length;i++){ 
						 
						var rowArray = $("#propertyHisListGrid").jqGrid('getRowData',ids[i]);			
						var setRollbackOper = '<a href=\"#\" onclick=\"PropertyHisMain.rollbackProperty(\''+rowArray.historyId+'\', \''+rowArray.propertyId+'\')\">'+'回滚'+'</a>'; 
						var setHistoryDetail = '<a href=\"#\" onclick=\"PropertyHisMain.getHistoryProperty(\''+rowArray.historyId+'\', \''+rowArray.propertyId+'\')\">'+'详情'+'</a>';
						$("#propertyHisListGrid").jqGrid('setCell', ids[i], 'setRollbackOper', setRollbackOper+" | "+setHistoryDetail);
						 
//						$("#propertyHisListGrid").jqGrid('setCell', ids[i], 'setHistoryDetail', setHistoryDetail);
					}
					
				}, 
				onSelectRow : function(id){
					 
				}, 
				beforeRequest : function(){
					$("#propertyHisListGrid").setGridWidth($(document.body).width()*0.92);
				}
			});
			
			//查询数据
			$('#query').click(function(){
				if(PropertyHisMain.reValidate()){
					PropertyHisMain.gridReload();
				} 
			});
			
		},
		 
		//查询数据 
		gridReload : function() {
			//设置参数
			jQuery("#propertyHisListGrid").jqGrid('setPostData',{ 
				propertyId : $("#propertyId").val(), 
				profile : $("#profile").val()
			});
			jQuery("#propertyHisListGrid").jqGrid('setGridParam', {
				datatype:'xml',
				url :$.ghHash.get("ctx")+ "/config/property/property.do?action=findPublishHisList&random="+ Math.random(),
				page : 1
			});
			jQuery("#propertyHisListGrid").trigger("reloadGrid");
		},
		
		
		//参数验证
		reValidate:function(){
			//去除左右空格 
			var propertyId = $("#propertyId").val();
			if(!propertyId){
				common.showMsgDialog("没有指定查询属性标识，不能进行查询！");
				return false;
			}
			return true;
		},
 
		rollbackProperty: function(historyId, propertyId) {
			
			$("#propertyHisListGrid").jqGrid('setSelection', historyId, true); 
			
			if( null!=historyId && historyId.length>0  && historyId!='undefined' &&  null!=propertyId && propertyId.length>0  && propertyId!='undefined'){
				var option = {
						title : "请确认",
						msg : "确定回滚这个配置属性吗？",
						confirm : function(){
							$.ajax({
						        url: $.ghHash.get("ctx")+ "/config/publish/publish.do?action=rollbackProperty",
						        type : "post",
						        async : true,
						        dataType:"json",
						        data: {historyId:historyId}, 
						        success: function(data){
						        	common.showMsgDialog(data.resultMessage); 
						        }, 
						        error: function(){
						        	common.showMsgDialog("回滚属性出现异常！"); 
						        },
						        complete: function(){
						        	//刷新父页面的属性生产列表
						        	if(window.opener && window.opener.ModuleMain){
										 window.opener.ModuleMain.reloadPropertyPrd();
									}else if(window.opener && window.opener.PropertyUatMain){
										 window.opener.PropertyUatMain.reloadUatListGrid();
									}
						        	window.close();  
						        }   
						      });
						}
				 };
			     common.showConfirmFixDialog(option);
			}else{
				 common.showMsgDialog("回滚参数不全，不能进行停用！");
			}  
			
		},
       getHistoryProperty: function(historyId,propertyId){
    	   $("#moduleMainGrid").jqGrid('setSelection', historyId, true);
			var modifyPropertyUrl = common.getLocalHref($.ghHash.get("ctx") +"/config/property/property.do?action=queryPublishHistory&random="+ Math.random()+"&historyId="+historyId+"&propertyId="+propertyId);
			window.open(modifyPropertyUrl);
		},
 }
