
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

var ModifyProperty = {
		
	closePageRef:function(){
		window.opener.ModuleMain.reloadProperty();
		window.close();  
	},	
		
	init:function(){ 
			 
		$("#back").click( function() {
			ModifyProperty.closePageRef();
		});
		
		$('#modfiyProperty').click(function(){
			
			 //去除左右空格 
			$("#content").val($.trim($("#content").val()));
			
			if(ModifyProperty.reValidate()){
				
				var propertyId=$.trim($("#propertyId").val());
				var content=$.trim($("#content").val());
				 
				if(propertyId && content){
					
					var option = {
							title : "确认",
							msg : "确定提交修改配置信息记录吗？",
							confirm : function(){
								$.ajax({
							        url: $.ghHash.get("ctx")+ "/config/property/property.do?action=updateProperty&random="+ Math.random(),
							        type : "post",
							        async : true,
							        dataType:"json",
							        data: { 
										//主键
										propertyId: $("#propertyId").val(), 
										//基本更新参数
										content: $("#content").val()  
									}, 
							        success: function(data){
									    if(data){
									    	if(data.resultCode=='1'){//success
									    		 var option = {
								    				confirm : function(){
								    			 		ModifyProperty.closePageRef();
								    				}
									    		 };
									    		 common.showMsgFixBackDialog("保存修改配置信息成功。", option); 
									    	}else if(data.resultCode=='0'){
									    		common.showMsgDialog(data.resultMessage); 
									    	}else{
									    		common.showMsgDialog("保存修改配置信息出现异常！"); 
									    	}
									    }else{
									    	common.showMsgDialog("保存修改配置信息出现异常！"); 
									    }
							        }, 
							        error: function(){
							        	common.showMsgDialog("保存修改配置信息出现异常！"); 
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
		  
		var propertyId = $.trim($("#propertyId").val()); 
		var content = $.trim($("#content").val());  
 
		if(null==propertyId || ''==propertyId){
			common.showMsgDialog("标识ID不存在，不能进行修改！");
			return false;
		}  
		if(!content){
			common.showMsgDialog("属性值不能为空！");
			return false;
		}   
		
		return true;
		 
	}
}