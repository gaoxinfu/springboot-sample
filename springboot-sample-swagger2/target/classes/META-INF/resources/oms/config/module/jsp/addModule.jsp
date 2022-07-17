<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<head>
 	<script type="text/javascript" src="${ctx}/oms/config/module/js/addModule.js"></script>
 	
	<script type="text/javascript">
	   $(document).ready(function(){
		   AddModule.init(); 
	   });
	</script> 
</head>
<body>
	<table width="100%" style="width: 100%">
		<tr>
			<td id="mainTableLeftTd">
				<table width="100%" id="mainTable" style="width: 100%">
					<tr>
						<td height="40px">
							&nbsp;
						</td>
					</tr>
					
					<tr>
						<td>
							<table>
								<tr>
									<td class="pageTitle01">
										<img src="${ctx}/skin/${coreCurrentSkin }/css/images/close.png"
											id="traImg" onclick="common.hideTR('tra','traImg')" />
									</td>
									<td class="pageTitleText">
										请填写新增栏目数据
									</td>
								</tr>
							</table>
						</td>
					</tr>
					 
					<tr id="tra">
							<td>
								<table class="inputTable3col">
								 
									 <tr class="tableTr"> 
										<td width="12%" class="inputTitle3col">
										          栏目编码
									        <input id="parentModuleId" name="parentModuleId" value="${parentModuleId}" type="hidden" />
										</td>
										<td width="88%"  colspan="3"  class="inputBox3col_text">
											<input id="moduleCode" class="ui-guohua-input-text" name="moduleCode" value="" type="text" style="width:400px;"  maxlength="100"/> 
										</td> 
									</tr>  
								    <tr class="tableTr"> 
										<td width="12%" class="inputTitle3col">
										        栏目名称
										</td>
										<td width="88%"  colspan="3"  class="inputBox3col_text">
											<input id="moduleName" class="ui-guohua-input-text" name="moduleName" value="" type="text" style="width:400px;"  maxlength="100"/> 
										</td> 
									</tr>  
								</table>
								
						    </td>
					    </tr>
					<tr>
						<td>
							&nbsp;
						</td>
					</tr>
					<tr>
						<td style="padding-left: 30px;">
							&nbsp;
							<button id="addModule" buttonId="CORE_SYS_URL_MAN_PAGE003_BTN001" class="ui-btn-modify">
								确 定
							</button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<button id="back" buttonId="CORE_SYS_URL_MAN_PAGE003_BTN002" class="ui-btn-close">
								关闭
							</button>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>