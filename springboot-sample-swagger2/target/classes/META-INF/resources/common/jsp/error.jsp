<%@ include file="./taglib.jsp"%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ page isErrorPage="true"%>
<%--============================================================================
说明：当处理请求发生错误时显示的错误页面
============================================================================--%>
<html>
	<head>
		<title>系统错误：不能正确处理请求</title>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK">
		<link rel="stylesheet" type="text/css" href="${ctx}/portal/skin/${coreCurrentSkin}/css/ui/ui.layout.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/portal/skin/${coreCurrentSkin}/css/ui/ui.jqgrid.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/portal/skin/${coreCurrentSkin}/css/ui/jquery-ui-1.8.6.custom.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/portal/skin/${coreCurrentSkin}/css/ui/styles.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/portal/skin/${coreCurrentSkin}/css/ui/ui.mulLine.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/portal/skin/${coreCurrentSkin}/css/ui/ui.temp.css" />
	</head>
	<body>
		<script language="javascript">
function showhide(layerId){
   if (document.getElementById){
        obj = document.getElementById(layerId);
        var isVisible = obj.style.display == "none";
        obj.style.display = isVisible ? "" : "none";
    }
}
</script>
		<%
		    Throwable error = exception;
		    if (null == error) {
		        error = (Throwable) request.getAttribute("exception");
		    }
		    if (null == error) {
		        error = (Throwable) request.getAttribute("error");
		    }
		    if (null != error) {
		%>
		<br><br><br>
		<div class="errormessage" align="center" class="errormessage" ondblclick="showhide('detail')"><font size="3" color="red">系统错误，请联系管理员，谢谢！</font></div>
		<div id="detail" align="left" style="display: none; border: 1px dashed gray; padding: 10px; margin: 10px">
			<pre>
<%
    error.printStackTrace(new java.io.PrintWriter(out));
%>
</pre>
		</div>
		<%
		    }
		    else {
		%>
		<div class="errormessage">
			错误页面没有接收到异常
		</div>
		<%
		    }
		%>
	</body>
</html>
