<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div id="pagetab" class="status-bar div">
	<table width="100%"
		style="cellpadding: 0px; cellspacing: 0px; text-decoration: none; white-space: nowrap;">
		<tr>
			<td width="1%">
				<img style="padding-top: 2px" src="${ctx}/skin/${coreCurrentSkin }/css/images/circle.gif"/>
			</td>
			<td width="90%" >
				<font class="red">当前位置：</font>${titleName}
			</td>
		</tr>
	</table>
</div>


<script type="text/javascript">
$(document).ready(function () {
	adjustStyle();
});
function isIE6(){
	var browser_ver = $.browser.version;
	var accurate_value = browser_ver.substr(0,1);
	return $.browser.msie && accurate_value == '6';
}
function adjustStyle(){
	if(isIE6()){
		$("#pagetab").css('position','absolute');
	}else{
		$("#pagetab").css('position','fixed');
	}
}
</script>