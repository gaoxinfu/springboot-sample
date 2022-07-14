function getContent(){
	return $("#content").val();
}


function setContent(jsonText){
	return $("#content").val(jsonText);
}

function showJsonEdit(){
	var showJsonEditUrl = common.getLocalHref($.ghHash.get("ctx") +"/common/js/jsoneditor/editJson.jsp?noLayout=true&random="+ Math.random());
	window.open(showJsonEditUrl);
}

var AddProperty = {
		
	closePageRef:function(){
		window.opener.ModuleMain.reloadProperty();
		window.close();  
	},	
 
	init:function(){ 
			 
		$("#back").click( function() {
			AddProperty.closePageRef();
		});
		
		$('#addProperty').click(function(){
			 
			if(AddProperty.reValidate()){
				
				var moduleId=$.trim($("#moduleId").val());
				var code=$.trim($("#code").val());
				var name=$.trim($("#name").val());
				var content=$.trim($("#content").val());
				 
				if(moduleId && code && name && content){
					
					var option = {
							title : "确认",
							msg : "确定提交新增配置信息记录吗？",
							confirm : function(){
								$.ajax({
							        url: $.ghHash.get("ctx")+ "/config/property/property.do?action=saveProperty&random="+ Math.random(),
							        type : "post",
							        async : true,
							        dataType:"json",
							        data: { 
										//主键
										moduleId: moduleId, 
										//基本更新参数
										code: code,   
										name: name,   
										content: content
									}, 
							        success: function(data){
									    if(data){
									    	if(data.resultCode=='1'){//success
									    		 var option = {
								    				confirm : function(){
									    			 	AddProperty.closePageRef();
								    				}
									    		 };
									    		 common.showMsgFixBackDialog("保存新增配置信息成功。", option); 
									    	}else if(data.resultCode=='0'){
									    		common.showMsgDialog(data.resultMessage); 
									    	}else{
									    		common.showMsgDialog("保存新增配置信息出现异常！"); 
									    	}
									    }else{
									    	common.showMsgDialog("保存新增配置信息出现异常！"); 
									    }
							        }, 
							        error: function(){
							        	common.showMsgDialog("保存新增配置信息出现异常！"); 
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
		  
		$("#code").val($.trim($("#code").val()));
		$("#name").val($.trim($("#name").val()));
		$("#content").val($.trim($("#content").val()));
		
		var moduleId = $.trim($("#moduleId").val()); 
		
		var code = $.trim($("#code").val());  
		var name = $.trim($("#name").val());  
		var content = $.trim($("#content").val());  
 
		if(null==moduleId || ''==moduleId){
			common.showMsgDialog("所属栏位不存在，不能进行修改！");
			return false;
		}  
		if(!code){
			common.showMsgDialog("属性编码不能为空！");
			return false;
		}   
		if(!name){
			common.showMsgDialog("属性名称不能为空！");
			return false;
		}   
		if(!content){
			common.showMsgDialog("属性值不能为空！");
			return false;
		}   
		
		return true;
		 
	}
}