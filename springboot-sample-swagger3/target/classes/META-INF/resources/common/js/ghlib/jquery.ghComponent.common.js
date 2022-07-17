/**
 * common组件
 */
(function($) { 
	$.ghCommon = {
		submit : function(action,param,callback){
			$.ajax({
				datatype: 'xml',
				url: action + '&random=' + Math.random(),
				type: "post",
				data: param,
				success: function(data){
					if(callback){
						callback(data);
					}
				},
				beforeSend: function(){

				},
				complete: function() {

		        } 
			});			
		},
		getWebRootName : function(ctxName){
			if(ctxName=='/coreportal'){
				return "portal"; 
			}else if(ctxName=='/hr'){
				return "hr";
			}else if(ctxName=='/batch'){
				return "batch";
			}
			return ""; 
		}
	},
	
	$.ghResult = {
			
		/**
		 * 判断是否发生运行时异常
		 */
		hasException : function(data){
			if(data && $(data).find("TransResult > resultCode").text() == "-1"){
				return true;
			}
			return false;
		},
		
		/**
		 * 判断是否发生验证错误
		 */
		hasErrors : function(data){
			if(data && $(data).find("TransResult > validateErrors")){
				return true;
			}
			return false;
		},
		
		/**
		 * 判断交易处理是否成功
		 */
		isSuccess : function(data){
			if(data && $(data).find("TransResult > resultCode").text() == "1"){
				return true;
			}
			return false;			
		},
		
		/**
		 * 返回交易Object
		 */
		getResponseObj : function(data){
			if(data && $(data).find("Response > object")){
				return $(data).find("Response > object");
			}
			return ""; 
		},
		
		/**
		 * 显示交易处理结果
		 */
		showResultInfoDesc : function(data){
			//判断是否后台发生运行时异常
			if($.ghResult.hasException(data)){
				alert("后台发生异常");
				return false;
			}
			//显示处理结果信息
			if(data && $(data).find("TransResult > resultInfoDesc").text()){
				$("#globalMessageDiv").html("<span class='ui-icon ui-icon-info' style='float: left;'>" +
						" </span>&nbsp;<strong>" + $(data).find("TransResult > resultInfoDesc").text() + "</strong>");
			}
			//显示验证错误信息
			if(data && $.ghResult.hasErrors(data)){
				var resultHtml = "<span class='ui-icon ui-icon-info' style='float: left;'></span>"
				var errors = $(data).find("TransResult > validateErrors > ValidateError");
				$.each(errors,function(i,value){
					 resultHtml += "&nbsp;<strong>" + $(value).find("message").text() + "</strong>";
					 resultHtml += "<br/>"
				});
				$("#globalMessageDiv").html(resultHtml);
			}
		}
	}
	
})(jQuery);  