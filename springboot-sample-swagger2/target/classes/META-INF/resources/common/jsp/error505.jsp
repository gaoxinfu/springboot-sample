<%@ page contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="./taglib.jsp"%>
<%@ page isErrorPage="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
</head>
<body>
<table align="center">
	<tr>
		<td>【系统异常】</td>
		<td></td>
	</tr>
	<tr>
		<td colspan="3" align="left">
		<div id="detail" align="left"><c:out value="${exception}"></c:out>
		</div>
		</td>
	</tr>
</table>
</body>
</html>