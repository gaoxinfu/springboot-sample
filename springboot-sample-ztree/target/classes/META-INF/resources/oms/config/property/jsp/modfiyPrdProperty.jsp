<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<head>
 	<script type="text/javascript" src="${ctx}/oms/config/property/js/modfiyPrdProperty.js"></script>
 	
	<script type="text/javascript">
	   $(document).ready(function(){
		   ModifyPrdProperty.init(); 
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
										请填写修改属性值
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
										     标识
										</td>
										<td width="88%" class="inputBox3col_text">
											${propertyId}
											<input id="propertyId" name="propertyId" value="${propertyId}" type="hidden" />
										</td>  
									</tr>
									
									<tr class="tableTr">
										<td width="12%" class="inputTitle3col">
										     所属环境
										</td>
										<td width="88%" class="inputBox3col_text">
											${profile}
										    <input id="profile" name="profile" value="${profile}" type="hidden" />
										</td>  
									</tr>
									 
									<tr class="tableTr">
										<td width="12%" class="inputTitle3col">
											 属性值
										</td>
										<td width="88%" class="inputBox3col_text">
											<textarea id="content" name="content" class="ui-guohua-input-text"  style="width: 90%; height: 100px;" maxlength="8000"/><c:out value="${publishPropertyDto.content}"></c:out></textarea>
											<a href="#" onclick="showJsonEdit();">JSON编辑</a>
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
							<button id="modfiyPrdProperty" buttonId="CORE_SYS_URL_MAN_PAGE003_BTN001" class="ui-btn-modify">
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