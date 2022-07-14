<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title></title>
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.layout.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.jqgrid.css"  />
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/jquery-ui-1.8.6.custom.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/styles.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.mulLine.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/css/ui/ui.temp.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/${coreCurrentSkin}/zTreeStyle/zTreeStyle.css" />
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
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.tree.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.hash.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.common.js"></script>
	<!-- 注释原因:  未在系统内找到相关的资源 
	<script type="text/javascript" src="${ctx}/common/js/ghlib/Common.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/ghlib/CCodeOperate.js"></script>
	-->
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.mulLines.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.checkSelect.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.rightDrawer.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.menuTree.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghValidator.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.popselect.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.orgnization.js"></script>
    <script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.ghZtree.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/ghlib/jquery.ghComponent.comorg.js"></script>
	<script type="text/javascript" src="${ctx}/common/js/${coreCurrentSkin }/common.js"></script>
	<!-- 注释原因:  未在系统内找到相关的资源 
	<script type="text/javascript" src="${ctx}/main.js"></script>
	-->
	<!-- 用于ie6的滚动条问题 -->
	<script type="text/javascript" src="${ctx}/common/js/lib/scroll.js"></script>
	
	<script type="text/javascript"> 
		var SessionTimeoutNotify = {
		  sessionTimeout: 1000*60*59, // 59 min
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
		});
	</script>	
	

	 <decorator:head /> 
	 <script type="text/javascript">
			$(document).ready(function () {
			   common.initMessage(${messageList});
			});
		</script>
	</head>
	
	
	
	<body marginwidth="0" marginheight="0" topmargin="0" leftmargin="0" style="overflow:auto">
		<decorator:body />		
	</body>
</html>
