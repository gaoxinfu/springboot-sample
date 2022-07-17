<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<head>

 	<script type="text/javascript" src="${ctx}/oms/config/property/js/propertyHisMain.js"></script>
 	
	<script type="text/javascript">
		$(document).ready(function() {
			PropertyHisMain.init();
			
		  	if(navigator.userAgent.indexOf("MSIE 6.0") > 0) {
		   		if (jQuery.browser.msie) {
		   		    $a = jQuery('.ui-jqgrid .ui-jqgrid-bdiv');
		   		    $a.css('padding', '0 0 15px 0');
		   		      var myheight = jQuery('#gridId').jqGrid('getGridParam','height');
		   		    if( myheight   == '100%'){
		   		        $a.css('overflow-y', 'hidden');
		   		    }
		   		 }
		   	}

		   	
		});
</script>

	<style type="text/css">
	.ui-jqgrid .ui-jqgrid-bdiv {
		position: absoluted;
		margin: 0;
		padding: 0;
		overflow-y: hidden;
		text-align: left;
	}
	</style>
	
</head>
<body>
	<table width="100%" style="width: 100%">
		<tr>
			<td id="mainTableLeftTd">
				<table width="100%" id="mainTable" style="width: 100%">
					
					<tr>
						<td height="30px">
							&nbsp;
						</td>
					</tr>
					
					<tr>
						<td>
							<table>
								<tr>
									<td class="pageTitle01">
										<img src="${ctx}/skin/${coreCurrentSkin }/css/images/close.png" id="traImg" onclick="common.hideTR('tra','traImg')" />
									</td>
									<td class="pageTitleText">
										请输入查询条件
									</td>
								</tr>
							</table>
						</td>
					</tr>
					
					<tr id="tra">
						<td>
							<table class="inputTable3col" id="queryConditionTable">
								<tr class="tableTr">
								 
									  <td class="inputTitle3col">
									  		所属环境
									     <input id="propertyId" name="propertyId" value="${propertyId}" type="hidden" />
									  </td>
									  <td class="inputBox3col">
						                 <select <c:if test="${fn:toLowerCase(isSelect) == 'no'}">disabled="disabled"</c:if> name="profile" id="profile" style="width: 180px;">
						               	     <option value="">请选择</option>
						               	     <option <c:if test="${fn:toLowerCase(profile) == 'dat'}"> selected="selected" </c:if> value="dat">DAT </option>
							               	 <option <c:if test="${fn:toLowerCase(profile) == 'uat'}"> selected="selected" </c:if> value="uat">UAT </option>
						                   	 <option <c:if test="${fn:toLowerCase(profile) == 'stg'}"> selected="selected" </c:if> value="stg">STG </option>
						                   	 <option <c:if test="${fn:toLowerCase(profile) == 'pre'}"> selected="selected" </c:if> value="pre">PRE </option>
						                   	 <option <c:if test="${fn:toLowerCase(profile) == 'prd'}"> selected="selected" </c:if> value="prd">PRD </option>
						                 </select>
	                                  </td>
	                                
								</tr> 
								 
								<tr>
									<td class="inputTitle3col_btn" colspan="4">
										<button id="query" buttonId="CORE_SYS_USER_MAN_PAGE001_BTN001" class="ui-btn-search">
											查 询
										</button>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table>
								<tr>
									<td class="pageTitle01">
										<img src="${ctx}/skin/${coreCurrentSkin }/css/images/close.png"
											id="trbImg" onclick="common.hideTR('trb','trbImg');" />
									</td>
									<td class="pageTitleText">
										查询结果
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr id="trb">
						<td>
							<table class="inputTable3col">
								<tr>
									<td>
										<table id="propertyHisListGrid"></table>
										<div id="propertyHisListPager"></div>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					
				    <tr>
						<td style="padding-left: 35px;">
							<button id="back" class="ui-btn-close">关 闭</button>
						</td> 
					</tr> 
					
				</table>
			</td>
		</tr>
	</table>
</body>