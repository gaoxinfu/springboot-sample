
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

var ModifyPrdProperty = {
		
	closePageRef:function(){
		window.opener.PropertyUatMain.reloadUatListGrid(); 
		window.close();  
	},	
		
	init:function(){ 
			 
		$("#back").click( function() {
			ModifyPrdProperty.closePageRef();
		});
		
		$('#modfiyPrdProperty').click(function(){
			
			 //去除左右空格 
			$("#content").val($.trim($("#content").val()));
			
			if(ModifyPrdProperty.reValidate()){
				
				var propertyId=$.trim($("#propertyId").val());
				var profile=$.trim($("#profile").val());
				var content=$.trim($("#content").val());
				 
				if(propertyId && profile && content){
					
					var option = {
							title : "确认",
							msg : "确定提交修改发布环境配置信息记录吗？",
							confirm : function(){
								$.ajax({
									url: $.ghHash.get("ctx")+ "/config/publish/publish.do?action=publishProperty&random="+ Math.random(),
							        type : "post",
							        async : true,
							        dataType:"json",
							        data: { 
										//主键
										propertyId: $("#propertyId").val(), 
										profile: $("#profile").val(), 
										//基本更新参数
										content: $("#content").val()  
									}, 
							        success: function(data){
									    if(data){
									    	if(data.resultCode=='1'){//success
									    		 var option = {
								    				confirm : function(){
									    			   ModifyPrdProperty.closePageRef();
								    				}
									    		 };
									    		 common.showMsgFixBackDialog("重新发布配置信息成功。", option); 
									    	}else if(data.resultCode=='0'){
									    		common.showMsgDialog(data.resultMessage); 
									    	}else{
									    		common.showMsgDialog("重新发布配置信息出现异常！"); 
									    	}
									    }else{
									    	common.showMsgDialog("重新发布配置信息出现异常！"); 
									    }
							        }, 
							        error: function(){
							        	common.showMsgDialog("重新发布配置信息出现异常！"); 
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
		var profile = $.trim($("#profile").val()); 
		var content = $.trim($("#content").val());  
 
		if(null==propertyId || ''==propertyId || null==profile || ''==profile){
			common.showMsgDialog("参数不全，不能进行修改！");
			return false;
		}
		if(!content){
			common.showMsgDialog("属性值不能为空！");
			return false;
		}   
		
		return true;
		 
	}
}