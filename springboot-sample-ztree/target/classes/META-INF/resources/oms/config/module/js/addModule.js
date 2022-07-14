var AddModule = {
		
	closePageRef:function(){
		window.opener.resetTree();
		window.close();  
	},	
		
	init:function(){ 
			 
		$("#back").click( function() {
			
			AddModule.closePageRef();
		});
		
		$('#addModule').click(function(){
			 
			if(AddModule.reValidate()){
				
				var parentModuleId = $.trim($("#parentModuleId").val()); 
				
				var moduleCode = $.trim($("#moduleCode").val());  
				var moduleName = $.trim($("#moduleName").val());  
				 
				if(parentModuleId && moduleCode && moduleName){
					
					var option = {
							title : "确认",
							msg : "确定提交新增栏位信息记录吗？",
							confirm : function(){
								$.ajax({
							        url: $.ghHash.get("ctx")+ "/config/module/module.do?action=saveModule&random="+ Math.random(),
							        type : "post",
							        async : true,
							        dataType:"json",
							        data: { 
										//主键
										parentModuleId: parentModuleId, 
										//基本更新参数 
										moduleCode: moduleCode,   
										moduleName: moduleName
									}, 
							        success: function(data){
									    if(data){
									    	if(data.resultCode=='1'){//success
									    		 var option = {
								    				confirm : function(){
									    			 	AddModule.closePageRef();
								    				}
									    		 };
									    		 common.showMsgFixBackDialog("保存新增栏位信息成功。", option); 
									    	}else if(data.resultCode=='0'){
									    		common.showMsgDialog(data.resultMessage); 
									    	}else{
									    		common.showMsgDialog("保存新增栏位信息出现异常！"); 
									    	}
									    }else{
									    	common.showMsgDialog("保存新增栏位信息出现异常！"); 
									    }
							        }, 
							        error: function(){
							        	common.showMsgDialog("保存新增栏位信息出现异常！"); 
							        },
							        complete: function(){
							        	
							        }
							    });
							}
						};
					
						common.showConfirmFixDialog(option);
				}
				
			}
			 
		});
		
	},
	
	reValidate:function(){
		var iflag=false;
		  
		$("#moduleCode").val($.trim($("#moduleCode").val()));
		$("#moduleName").val($.trim($("#moduleName").val())); 
		
		var parentModuleId = $.trim($("#parentModuleId").val()); 
		
		var moduleCode = $.trim($("#moduleCode").val());  
		var moduleName = $.trim($("#moduleName").val());  
	 
		if(null==parentModuleId || ''==parentModuleId){
			common.showMsgDialog("所属父栏位不存在，不能进行修改！");
			return false;
		}  
		if(!moduleCode){
			common.showMsgDialog("栏位编码不能为空！");
			return false;
		}   
		if(!moduleName){
			common.showMsgDialog("栏位名称不能为空！");
			return false;
		}    
		
		return true;
		 
	}
}