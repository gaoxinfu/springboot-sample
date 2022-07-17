<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script type="text/javascript" src="${ctx}/common/js/${coreCurrentSkin }/common.js"></script>
</head>
<body>
	<iframe id="mainFrame" frameborder="0" scrolling="auto" marginwidth="0" marginheight="0" height="10" onload="common.initIframeHight(this)" width="100%" src="${contextUrl}" >
	</iframe>
</body>
</html>