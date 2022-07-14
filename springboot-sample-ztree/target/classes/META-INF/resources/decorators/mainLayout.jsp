<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title></title>
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.layout.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.jqgrid.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/jquery-ui-1.8.6.custom.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/styles.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.mulLine.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.temp.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/zTreeStyle/zTreeStyle.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/uploadify.css" />

		<!-- 加载js类库 -->
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/grid.locale-cn.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.ui.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.layout.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.jqGrid.min.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.jstree.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.blockUI.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.validate.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.validate.msg_zh_CN.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.bgiframe.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.ztree-2.6.js"></script>

		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghDatepicker.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghAutoComplete.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.dropDownList.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghBlockUI.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.twiceValidator.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.twiceValidator1.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.tree.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.hash.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.common.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghZtree.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.comorg.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.mulLines2.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.mulLines3.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.mulLines4.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.mulLines5.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.mulLines6.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.checkSelect.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.rightDrawer.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.menuTree.js"></script>
        <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghValidator.js"></script>
        <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.popselect.js"></script>
        <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.orgnization.js"></script>
        <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.workflowContent.js"></script>
        <script type="text/javascript" src="${ctx}/common/js/lib/swfobject.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery.uploadify.v2.1.0.min.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghJqgrid.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/lib/jquery-ui-timepicker.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/picker/WdatePicker.js"></script>
	
		<script type="text/javascript" src="${ctx}/common/js/common.js"></script>
		<!-- 用于ie6的滚动条问题 -->
		<script type="text/javascript" src="${ctx}/common/js/lib/scroll.js"></script>

		<!-- 加载自定义js -->
		<script type="text/javascript" src="${ctx}/common/js/main.js"></script>
		
		<script type="text/javascript" src="${ctx}/common/js/blockui.js"></script>
		<script type="text/javascript" src="${ctx}/common/js/newblockui.js"></script>
		<style>
			html{overflow-y:hidden;_overflow-y:hidden!important;}
		</style>
		<script type="text/javascript">
			var SessionTimeoutNotify = {
			  sessionTimeout: 1000*60*100, // 60 min
			  notify: function() {
			    alert("由于长时间没有操作，本次会话即将过期，页面没有保存的内容将会丢失！");
			    common.refresh();
			  },
			  refresh: function () {
			    if (this.timer) {
			      clearTimeout(this.timer);
			    }
			    this.timer= setTimeout(this.notify, this.sessionTimeout);
			  }
			}
			SessionTimeoutNotify.refresh();

			//在系统加载完毕后执行
			$(document).ready(function () {
		        $.ghHash.set("ctx","${ctx}");
		        common.ctx="${ctx}";

		        $("#errorDialogArea").dialog({		
					modal: true,		
					autoOpen: false,		
					height: 100		
				});
			});

			$(function(){
				common.init();
				//初始化按钮
				common.initButtonIcon();
				//resizePage();
				//common.rightDrawerCompand();
				//$('#rightDrawerContent').bgiframe({top: -5, left: -5});

			});
		</script>

		<decorator:head />
		<script type="text/javascript">
			$(document).ready(function () {
			   common.initMessage(${messageList});
			   initTitleButton();
			});
			
			function initTitleButton(){
				$("#butId1").click( function() {
					var iHeight = 500;
					var iWidth = 800;
					var url= $.ghHash.get("ctx")+"/viewWorkflow.do?decoratorName=window";
					localalterModeHref(url,iWidth,iHeight);					
				});
				
				$("#butId2").click( function() {
					var iHeight = 500;
					var iWidth = 800;
					var url= $.ghHash.get("ctx")+"/viewWorkflow.do?decoratorName=window";
					localalterModeHref(url,iWidth,iHeight);		
				});
				
				$("#butId5").click( function() {
					$("#helpDialogArea").dialog('open');
				});
			}
			
			function localalterModeHref(url,iWidth,iHeight) {
				if(iWidth == null || iWidth == undefined){
					iWidth = 0;
				}
				if(iHeight == null || iHeight == undefined){
					iHeight = 0;
				}
				var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
				var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
				var jspId = $("#jspId").val();
				var buttonId = $("#buttonId").val();
				var titleName = $("#titleName").val();
				url += "&jspId=" + jspId + "&buttonId=" + buttonId + "&titleName=" + titleName;
				url = encodeURI(url);
				window.open(url,'','height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
			}

		</script>
	</head>

	<body marginwidth="0" marginheight="0" topmargin="0" leftmargin="0" style="overflow: hidden;">
		<!-- 页面公共隐藏域 -->
		<%@ include file="/common/jsp/commonFormHeader.jsp"%>
		<!-- 页面公共隐藏域 -->
		<table width="100%"  style="margin: 0px; padding: 0px;">
			<tr>
				<td>
					<table width="100%" >
						<tr>
							<td>
								<!-- top层 start -->
								<%@ include file="/decorators/titleheader.jsp"%>
								<!-- top层 end -->
							</td>
						</tr>
						
						<tr>
							<td>
								<div id="mainDiv" class="mainDivStyle" style="width:99.9%">
									<decorator:body />
								</div>
							</td>
						</tr>
						
					</table>
				</td>
			</tr>
		</table>
		<div id="dialog_div"></div>
		<div id="dialog_open_div"></div>
		<div id="errorDialogArea" title="提示信息"></div>
	</body>

</html>
