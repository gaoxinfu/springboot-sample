<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>
<head>

	<link rel="stylesheet" type="text/css" href="${ctx}/skin/default/zTreeStyle3.2/zTreeStyle.css" />
	<script type="text/javascript"> var rootPath = '<%=request.getContextPath()%>'+'/'; </script> 
	<script type="text/javascript" src="${ctx}/common/js/lib/jquery.ztree.all-3.2.min.js"></script>
 	<script type="text/javascript" src="${ctx}/oms/config/property/js/propertyUatMain.js"></script>
 	
	<script type="text/javascript">
		$(document).ready(function() {
			
			zTree = $.fn.zTree.init($("#modulePathTree"), settingModulePath); 
			
			PropertyUatMain.init();
			
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
    .modulePathZtree{ width:250px;  margin-top: 0px; border: 1px solid #7F9DB9; position:relative; background: #F7F9F9; height:265px;overflow:auto; }   
	.modulePathZtree li span.noline_docu {width:0px;} 
	 	
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
									             栏目选择
									  </td>
									  <td class="inputBox3col">
									  	  <input id="moduleId" name="moduleId" type="hidden" value=""/>
									  	  <input id="modulePathSel" type="text" readonly="readonly" value="" onclick="showModulePathMenu(); return false;" style="width: 180px; cursor: hand;" class="ui-guohua-input-text"/>
										  <div id="modulePathContent" class="menuContent" style="display:none; position: absolute; z-index: 85555">
												<ul id="modulePathTree" class="modulePathZtree ztree" style="background-color: #F7F9F9;" ></ul>
										  </div>
	                                  </td>
	                                   
	                                   <td class="inputTitle3col">
									             所属环境
									     <input id="profileAll" name="profileAll" value="${profile}" type="hidden" />
									  </td>
									  <td class="inputBox3col">
									      <select name="profile" id="profile" style="width: 180px;">
									      		<option value="">请选择</option>
												<c:forEach var="profileValue" items="${fn:split(profile,',')}" varStatus="pProfile">
												    <option value="${profileValue}">${profileValue} </option>
												</c:forEach>
						               	  </select>
	                                  </td>
	                           </tr>      
	                           <tr class="tableTr">    
	                                   <td class="inputTitle3col">
									             属性编码
									  </td>
									  <td class="inputBox3col">
									  	    <input id="code" name="code" type="text" value="" style="width: 180px;" class='ui-guohua-input-text'/>
	                                  </td>
	                                   
	                                   <td class="inputTitle3col">
									             属性名称
									  </td>
									  <td class="inputBox3col">
									       <input id="name" name="name" type="text" value="" style="width: 180px;" class='ui-guohua-input-text'/>
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
										<table id="propertyUatListGrid"></table>
										<div id="propertyUatListPager"></div>
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
											id="trbImgdetail" onclick="common.hideTR('trbdetail','trbImgdetail');" />
									</td>
									<td class="pageTitleText">
										详细属性定义
									</td>
								</tr>
							</table>
						</td>
					</tr>
					
					
					<tr id="trbdetail">
						<td>
							<table class="inputTable3col" id="queryConditionTable">
								<tr class="tableTr">
									  <td class="inputTitle3col">
									             属性名称
									  </td>
									  <td id="nameViw" class="inputBox3col">
									  	 
	                                  </td> 
	                           </tr>  
	                           <tr class="tableTr">
	                                  <td class="inputTitle3col">
									             属性编码
									  </td>
									  <td id="codeViw" class="inputBox3col">
									      
	                                  </td>
	                           </tr>  
	                           <tr class="tableTr">
									  <td class="inputTitle3col">
									             属性路径
									  </td>
									  <td id="pathViw" class="inputBox3col">
									  	 
	                                  </td> 
	                           </tr>  
	                            <tr class="tableTr">
	                                  <td class="inputTitle3col">
									             版本
									  </td>
									  <td id="versionViw" class="inputBox3col">
									      
	                                  </td>
	                           </tr>  
	                           <tr class="tableTr" style="height: 50px;">
									  <td class="inputTitle3col">
									             属性内容
									  </td>
									  <td id="contentViw" class="inputBox3col">
									  	 
	                                  </td> 
	                           </tr>  
							</table>
						</td>
					</tr>
					
				</table>
			</td>
		</tr>
	</table>
</body>