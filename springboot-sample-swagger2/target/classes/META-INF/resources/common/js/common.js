var common = {
		ctx:'',
		projectWebRootName:'',
		//页面初始化方法	
		init:function(){
	
			common.projectWebRootName = $.ghCommon.getWebRootName(common.ctx);
		    common.reFreshWindow();
		    
		    common.adjustHeight();
		
			common.normalMouse();
			
			$(window).resize(function(){
				common.reFreshWindow();
			    common.adjustHeight();	
			});
			$(window).scroll(function(){
				common.reFreshWindow();
			    common.adjustHeight();	
			});
			
			common.changeTabStyle();
	    },	
		// 收起展开按钮
			hideTR : function (trid,myImg){
	        $("#"+trid).toggle();
			if(myImg!=null)
			{
				if($("#"+myImg).attr("src").indexOf("open")>-1){
					$("#"+myImg).attr("src",$("#"+myImg).attr("src").replace("open","close"));	
				}else{
					$("#"+myImg).attr("src",$("#"+myImg).attr("src").replace("close","open"));
				}
			}	
	    },
		//判断是否为ie6
		isIE6:function(){
			var browser_ver = $.browser.version;
			var accurate_value = browser_ver.substr(0,1);
			return $.browser.msie && accurate_value == '6';
		},
		//判断是否为ie6
		isIE8:function(){
			var browser_ver = $.browser.version;
			var accurate_value = browser_ver.substr(0,1);
			return $.browser.msie && accurate_value == '8';
		},
		changeTabStyle:function(){
			//if(!common.isIE6()){
			//	$("#mainDiv").css('width','90.5%');
			//}
			common.reFreshWindow();
		    common.adjustHeight();	
		},
		// 自适应窗口大小
		reFreshWindow : function () {
			common.topDiv();
		},
		//顶部浮动栏
	    topDiv : function() {
	    	document.getElementById("pagetab").style.top=(document.documentElement.scrollTop)+"px";
		},
		//设定中间主体内容区的高度
		adjustHeight:function(){
			var myClientHeight = document.documentElement.clientHeight-10+"px";
			var myClientWidth = document.documentElement.clientWidth-10+"px";
			document.getElementById("mainDiv").style.height = myClientHeight;
			document.getElementById("mainDiv").style.width = myClientWidth;
			
		},
		//解决鼠标闪烁的问题
		normalMouse:function(){
			if   (document.all)   {  
				document.execCommand("BackgroundImageCache", false, true); 
				}
		},
		//克隆对象
		clone:function(jsonObj, newName) {
		    var buf;
		    if (jsonObj instanceof Array) {
		        buf = [];
		        var i = jsonObj.length;
		        while (i--) {
		            buf[i] = common.clone(jsonObj[i], newName);
		        }
		        return buf;
		    }else if (typeof jsonObj == "function"){
		        return jsonObj;
		    }else if (jsonObj instanceof Object){
		        buf = {};
		        for (var k in jsonObj) {
			        if (k!="parentNode") {
			            buf[k] = common.clone(jsonObj[k], newName);
			            if (newName && k=="name") buf[k] += newName;
			        }
		        }
		        return buf;
		    }else{
		        return jsonObj;
		    }
		},
	
	/**
	*  公共表单ajax提交方法
	*/
	ajaxSubmit: function(divId, action, param){
		var jspId = $("#jspId").val();
		var buttonId = $("#buttonId").val();
		var titleName = $("#titleName").val();
		action += "&jspId=" + jspId + "&buttonId=" + buttonId + "&titleName=" + titleName;
		$.ajax({
			datatype: 'html',
			url: action + '&random=' + Math.random(),
			type: "post",
			data: param,
			
			success: function(data){
				$("#"+divId).html(data);

			}	
		});
	},
	
	/**
	*  公共表单ajax提交方法,functionID为自定义的方法，作为回调
	*/
	ajaxSubmitDfCallBack: function(functionId, action, param){
		$.ajax({
			datatype: 'html',
			url: action + '&random=' + Math.random(),
			type: "post",
			data: param,
			success: function(data){
				functionId(data);
			}	
		});
	},
	
	appendSelectElement : function(fromSelectObj, toSelectObj) {
		$.each(fromSelectObj, function(i, v) {
			var id = $(v).val();
			var text = $(v).text();
			var append = true;
			$.each(toSelectObj.find("option"), function(i, v) {
				if (id == $(v).val()) {
					append = false;
					return false;
				}
			});
			if (append) {
				var optionStr = "<option value='" + id + "'>" + text + "</option>";
				toSelectObj.append(optionStr);
			}
		});
	},


	removeSelectElement : function(toSelectObj) {
		$.each(toSelectObj, function(i, v) {
			$(v).remove();
		});
	},
	
	moveSelectElementUp : function(selectObj) {
		 var nowIndex = parseInt(selectObj.attr('selectedIndex'));
		 if (nowIndex==-1){
		 	alert("请先选择要移动的项!");
		 	return;
		 }
		 if(selectObj.children().eq(nowIndex).value!=""){
		 	if(nowIndex-1>=0){
				tempValue=selectObj.children().eq(nowIndex-1).val();
				tempName=selectObj.children().eq(nowIndex-1).text();
				selectObj.children().eq(nowIndex-1).val(selectObj.children().eq(nowIndex).val());
				selectObj.children().eq(nowIndex-1).text(selectObj.children().eq(nowIndex).text());
				selectObj.children().eq(nowIndex).val(tempValue);   
				selectObj.children().eq(nowIndex).text(tempName);
		 		selectObj.children().eq(nowIndex).removeAttr("selected");
		 		selectObj.children().eq(nowIndex-1).attr('selected','selected');
		 	}
		 }

	},
	
	moveSelectElementDown : function(selectObj) {
		var nowIndex = parseInt(selectObj.attr('selectedIndex'));
		if (nowIndex==-1){
			alert("请先选择要移动的项!");
			return;
		}
		if(selectObj.children().eq(nowIndex).value!=""){
			if(nowIndex+1<selectObj.children().length){
				tempValue=selectObj.children().eq(nowIndex+1).val();
				tempName=selectObj.children().eq(nowIndex+1).text();
				selectObj.children().eq(nowIndex+1).val(selectObj.children().eq(nowIndex).val());
				selectObj.children().eq(nowIndex+1).text(selectObj.children().eq(nowIndex).text());
				selectObj.children().eq(nowIndex).val(tempValue);   
				selectObj.children().eq(nowIndex).text(tempName);
				selectObj.children().eq(nowIndex).removeAttr("selected");
			 	selectObj.children().eq(nowIndex+1).attr('selected','selected');
			}
		}
	},
	
	/**
	*  公共表单提交方法
	*/
	formSubmit : function(formId,url) {
		var jspId = $("#jspId").val();
		var buttonId = $("#buttonId").val();
		var titleName = $("#titleName").val();
		url += "&jspId=" + jspId + "&buttonId=" + buttonId + "&titleName=" + titleName;
		url = encodeURI(url);
		$("#" + formId).attr("action",url);
		if($("#" + formId).validate().form()){
			$.ghBlockUI.active();
			$("#" + formId).submit();
		}
	},
	
	/**
	*  公共页面跳转方法
	*/
	localHref : function(url) {
		var jspId = $("#jspId").val();
		var buttonId = $("#buttonId").val();
		var titleName = $("#titleName").val();
		url += "&jspId=" + jspId + "&buttonId=" + buttonId + "&titleName=" + titleName;
		url = encodeURI(url);
		window.location = url;
	},
	
	/**
	*  公共父类页面跳转方法
	*/
	localBadHref : function(url) {
		var jspId = $("#jspId").val();
		var buttonId = $("#buttonId").val();
		var titleName = $("#titleName").val();
		url += "&jspId=" + jspId + "&buttonId=" + buttonId + "&titleName=" + titleName;
		url = encodeURI(url);
		window.opener.location = url;
	},
	
	/**
	*  公共页面弹出式跳转方法
	*/
	localalterHref : function(url) {
		var jspId = $("#jspId").val();
		var buttonId = $("#buttonId").val();
		var titleName = $("#titleName").val();
		url += "&jspId=" + jspId + "&buttonId=" + buttonId + "&titleName=" + titleName;
		url = encodeURI(url);
		window.open(url);
	},
	
	
	/**
	*  中文
	*/
	isChinese : function(s) {
		s = common.trim(s);
		var p = /^[\u0391-\uFFE5]+$/;
		return p.test(s);
	},
	
	/**
	*  是否位数字
	*/
	isDigital : function(id) {
		$("#"+id).val($.trim($("#"+id).val()));
		var s = $("#"+id).val();
		var p = /^[0-9]*$/;
		return p.test(s);
	},
	
	
	/**
	*   字符处理;
	*	去左右空格;
	*/
	trim : function(s) {
		return common.rtrim(common.ltrim(s)); 
	},
	
	/**
	*  去左空格;
	*/
	ltrim : function(s) {
		return s.replace( /^\s*/, ""); 
	},
	
	/**
	*  去右空格;
	*/
	rtrim : function(s) {
		return s.replace( /\s*$/, ""); 
	},
	
	/**
	*  去右空格;
	*/
	isEnglish : function(s) {
		s = common.trim(s);
		var p = /^[A-Za-z0-9]+$/;
		return p.test(s);
	},
	
	/**
	*  获取组装URL方法
	*/
	getLocalHref : function(url,searchId,detailUrl) {
		var jspId = $("#jspId").val();
		var buttonId = $("#buttonId").val();
		var titleName = $("#titleName").val();
		url += "&jspId=" + jspId + "&buttonId=" + buttonId + "&titleName=" + titleName;
		
		var searchCondition = $("#" + searchId).val();
		if(searchCondition != "" && searchCondition!= undefined){
			url += "&conditionId=" + searchCondition;
		}
		if(detailUrl != "" && detailUrl!= undefined){
			url += "&detailUrl=" + detailUrl;
		}
		url = encodeURI(url);
		return url;
	},
	
	/**
	*  jqGrid获取组选中的值
	*/
	selectRowValue : function(gridID){
		 var selectValue = $("#"+gridID).jqGrid('getGridParam','selarrrow');
		 return selectValue;
	},
	
	/**
	*  jqGrid获取组选中行，指定列的值
	*/
	selectRowShowCollValue : function(gridID, colName, id){
		var selectValue = $("#"+gridID).jqGrid('getGridParam','selarrrow');
		var alertString = '';
		if (selectValue) { 
			//var list = ids.split(",");
			$.each(selectValue,function(i,id){
				var ret = $("#"+gridID).jqGrid('getRowData',id); 
				$.each(ret,function(index, value){
					//alertString += index + "=" + value + '\n';
					
					if(index == colName){
						alertString += value +",";;
					}
					
				});
			});
		}
		var selectColName = alertString.substring(0,alertString.length-1);
		return selectColName;
	},
	
	initHtml : function (jspId,errorType) {		
		//初始化JspId
		$("#jspId").val(jspId);
		//初始化ButtonId
		$(".ghButton").click(function() {
			$("#buttonId").val($(this).attr("buttonId"))
		});	
		//初始化错误显示类型
		$("#showType").val(errorType);
	},
	
	setCondition : function (conditions) {
		var conditionArray = conditions.split(",");
		for (var i = 0; i < conditionArray.length; i++){
			var condition = conditionArray[i].split(":");
			var filedKey = condition[0];
			var filedValue = condition[1];
			$("#" + filedKey).val(filedValue);
		}
	},
	
	getBookmarkDateUrl : function (url, rowDate, tableDatil) {
		var dateArray = new Array();
		var rsDate = "";
		for(var i in rowDate){
			dateArray.push(rowDate[i]);
		}
		$.each(tableDatil, function(idx, item) {
			var fieldId = item.fieldId;
			var fieldName = item.fieldName;
			var fieldValue = dateArray[idx];
			if(fieldValue == null || fieldValue == ""){
				fieldValue = " ";
			}
			rsDate += fieldName + ':' + fieldValue + ",";
		});
		url += "&bookmarksDate=" + rsDate.substring(0,rsDate.length-1);
		return url;
	},
	
	initMessage : function (messageJson) {
		var errorMsg = "";
		var showErrorType = $("#showType").val();
		$.each(messageJson, function(idx, item) {
			errorMsg += (idx+1) + ": " + item + "<br>";
		});
		if(showErrorType == "1"){
			common.showButtonMessage(errorMsg);
		}else if(showErrorType == "2"){
			common.showAlertMessage(errorMsg);
		}
	},
	
	showButtonMessage : function (messageInfo) {
		
		if(messageInfo != ""){
			//显示消息框
			common.messageButtonState = 'up';
			$("#divMessage").show();
		 	$("#errorShowArea").html(messageInfo);
		}
	},
	
	showAlertMessage : function (messageInfo) {
		if(messageInfo != ""){
			$("#errorDialogArea").html(messageInfo);
			$("#errorDialogArea").dialog('destroy');
			$("#errorDialogArea").dialog({
				resizable: false,
				modal: true,
				buttons: {
					"确定": function() {
						$(this).dialog('close');
					}
				}
			});
		}
	},
	
	refresh : function () {
		top.location.href = top.location.href;
	},
	
	initIframeHight : function (obj) {
		obj.style.height= document.documentElement.clientHeight - 20 ;
	},
	initButtonIcon :function () {
		//查询按钮样式
		$(".ui-btn-search").button( {
			icons : {
				primary : "ui-icon-search"
			}
	    });
		
		//添加按钮样式
	   $(".ui-btn-add").button({
		   icons : {
			   primary : "ui-icon-plus"
		   }
	   });
	   
	   //删除按钮样式
	   $(".ui-btn-delete").button({
		   icons : {
			   primary : "ui-icon-trash"
		   }
	   });
	   
	   //复制按钮样式
	   $(".ui-btn-copy").button({
		   icons : {
			 primary : "ui-icon-copy"
		   }
	   });
		
	   //关闭按钮样式
	   $(".ui-btn-close").button({
		   icons : {
			 primary : "ui-icon-close"
		   }
	   });
	   
	   //修改面页保存按钮在样式
	   $(".ui-btn-modify").button({
		   icons : {
		       primary: "ui-icon-disk"
		   }
	   });
	   
	   //重载按钮在样式
	   $(".ui-btn-refresh").button({
		   icons : {
		        primary: "ui-icon-refresh"
		   }
	   });
	   
	  //重置按钮样式
	 
	   $(".ui-btn-reset").button({
		   icons : {
		        primary: "  ui-icon-cancel"
		   }
	   });
	   
	 //下载按钮样式
		 
	   $(".ui-btn-down").button({
		   icons : {
		        primary: "  ui-icon-disk"
		   }
	   });
	},
	
	/**
	 * 显示确认模式窗口
	 */
	showConfirmDialog : function(option){
		$("#dialog_div").dialog("destroy");
		var msg = option.msg;
		$("#dialog_div").html("<span style='padding-left: 5px;padding-top: 5px;color:blue;font-size:15px;'>" + msg + "</span>");
		$("#dialog_div").attr("title",option.title);
		$("#dialog_div").dialog({
			resizable: false,
			modal: true,
			buttons: {
				"确定": function() {
					option.confirm();
					$(this).dialog('close');
				},
				"取消": function() {
					$(this).dialog('close');
				}
			}
		});		
	},
	
	/**
	 * 显示普通模式窗口
	 */
	showMsgDialog : function(msg1){
		BlockUI.inactive();
		$("#dialog_div").dialog("destroy");
		var msg = msg1;
		$("#dialog_div").html("<span style='padding-left: 5px;padding-top: 5px;color:blue;font-size:15px;'>" + msg + "</span>");
		$("#dialog_div").attr("title","提示信息");
		$("#dialog_div").dialog({
			resizable: false,
			modal: true,
			closeOnEscape:false, 
			open : function(event,ui){$(".ui-dialog-titlebar-close").hide();}, 
			buttons: {
				"确定": function() {
					$(this).dialog('close');
				}
			}
		});		
	},
	
	/**
	 * 显示普通模式窗口
	 */
	showMsgFixDialog : function(msg1, url){
		BlockUI.inactive();
		$("#dialog_div").dialog("destroy");
		var msg = msg1;
		$("#dialog_div").html("<span style='padding-left: 5px;padding-top: 5px;color:blue;font-size:15px;'>" + msg + "</span>");
		$("#dialog_div").attr("title","提示信息");
		$("#dialog_div").dialog({
			resizable: false,
			modal: true,
			closeOnEscape:false, 
			open : function(event,ui){$(".ui-dialog-titlebar-close").hide();}, 
			buttons: {
				"确定": function() {
					$(this).dialog('close');
					common.localHref(url);
				}
			}
		});		
	},
	
	/**
	 * 显示普通模式窗口
	 */
	showMsgFixBackDialog : function(msg1, option){
		BlockUI.inactive();
		$("#dialog_div").dialog("destroy");
		var msg = msg1;
		$("#dialog_div").html("<span style='padding-left: 5px;padding-top: 5px;color:blue;font-size:15px;'>" + msg + "</span>");
		$("#dialog_div").attr("title","提示信息");
		$("#dialog_div").dialog({
			resizable: false,
			modal: true,
			closeOnEscape:false, 
			open : function(event,ui){$(".ui-dialog-titlebar-close").hide();}, 
			buttons: {
				"确定": function() {
					$(this).dialog('close');
					option.confirm();
				}
			}
		});		
	},
	
	/**
	 * 显示确认模式窗口
	 */
	showConfirmFixDialog : function(option){
		$("#dialog_div").dialog("destroy");
		var msg = option.msg;
		$("#dialog_div").html("<span style='padding-left: 5px;padding-top: 5px;color:blue;font-size:15px;'>" + msg + "</span>");
		$("#dialog_div").attr("title",option.title);
		$("#dialog_div").dialog({
			resizable: false,
			modal: true,
			closeOnEscape:false, 
			open : function(event,ui){$(".ui-dialog-titlebar-close").hide();}, 
			buttons: {
				"确定": function() {
					$(this).dialog('close');
					BlockUI.active();
					option.confirm();
				},
				"取消": function() {
					$(this).dialog('close');
				}
			}
		});		
	},
	/**
	 * 为grid增加表头的函数
	 */
	groupJqGirdThead:function(jqGirdID, theadId){
		$("table", "#" + jqGirdID).addClass("width_auto");
		$("thead tr", "#" + jqGirdID).before( $("#" + theadId + " table thead").html() );
		$("#" + theadId).remove();
	},
	/**
	 * 新的调用Dialog UI的function,每次调用时，重新生成Dialog
	 */
	ajaxDialogUI : function(dialogObj, url, async) {
		if (async != false) {
			async = true;
		}
		$.ajax({
				datatype : 'html',
				url : url + '&random=' + Math.random(),
				async : async,
				success : function(html) {
					$("#dialog_open_div").html(html);
					dialogObj
					$("#dialog_open_div").dialog("open");
				},
				beforeSend : function() {
					BlockUI.active();
				},
				complete : function() {
					BlockUI.inactive();
				}
			})
	},	
	
	initOpenDialog : function(option){
		
		$("#dialog_open_div").html("");
		$("#dialog_open_div").dialog("destroy");
		$("#dialog_open_div").attr("title", option.title);
		
		var dialog = $("#dialog_open_div").dialog({
			resizable: false,
			modal: true,
			width: 400,
			zIndex: 2,
			buttons: {
				"保存": function() {  
					BlockUI.active();
					option.confirm();
				},
				"取消": function() {
					$(this).dialog("close");
					
				}
			}	
		});
	} 
	
	
}