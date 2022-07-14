var ModifyModule = {
		
	closePageRef:function(){
		window.opener.resetPidTree();
		window.close();  
	},	
		
	init:function(){ 
			 
		$("#back").click( function() {
			ModifyModule.closePageRef();
		});
		
		$('#modifyModule').click(function(){
			 
			if(ModifyModule.reValidate()){
				
				var moduleId = $.trim($("#moduleId").val()); 
				var moduleName = $.trim($("#moduleName").val());  
				 
				if(moduleId && moduleName){
					
					var option = {
							title : "确认",
							msg : "确定提交修改栏位信息记录吗？",
							confirm : function(){
								$.ajax({
							        url: $.ghHash.get("ctx")+ "/config/module/module.do?action=updateModule&random="+ Math.random(),
							        type : "post",
							        async : true,
							        dataType:"json",
							        data: { 
										//主键
										moduleId: moduleId, 
										//基本更新参数  
										moduleName: moduleName
									}, 
							        success: function(data){
									    if(data){
									    	if(data.resultCode=='1'){//success
									    		 var option = {
								    				confirm : function(){
									    			     ModifyModule.closePageRef();
								    				}
									    		 };
									    		 common.showMsgFixBackDialog("保存修改栏位信息成功。", option); 
									    	}else if(data.resultCode=='0'){
									    		common.showMsgDialog(data.resultMessage); 
									    	}else{
									    		common.showMsgDialog("保存修改栏位信息出现异常！"); 
									    	}
									    }else{
									    	common.showMsgDialog("保存修改栏位信息出现异常！"); 
									    }
							        }, 
							        error: function(){
							        	common.showMsgDialog("保存修改栏位信息出现异常！"); 
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
		
		$("#moduleName").val($.trim($("#moduleName").val())); 
		
		var moduleId = $.trim($("#moduleId").val()); 
		var moduleName = $.trim($("#moduleName").val());  
		
		if(null==moduleId || ''==moduleId){
			common.showMsgDialog("栏位ID不存在，不能进行修改！");
			return false;
		}
		if(!moduleName){
			common.showMsgDialog("栏位名称不能为空！");
			return false;
		}
		
		return true;
		
	}
	
	
	
}