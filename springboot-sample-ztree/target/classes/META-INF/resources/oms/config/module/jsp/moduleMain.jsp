<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/common/jsp/taglib.jsp"%>
<%@ include file="/common/jsp/include.jsp"%>

<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/default/thirt/thirty.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/skin/default/zTreeStyle3.2/zTreeStyle.css" />

	<script type="text/javascript" src="${ctx}/common/js/lib/jquery.ztree.all-3.2.min.js"></script>
	<script type="text/javascript" src="${ctx}/oms/config/module/js/moduleMain.js?v201621122"></script>

	<style type="text/css">
		.ztree li a:hover {text-decoration:none;}
		.ztree li span.button.add {margin-left:2px; margin-right: -1px; background-position:-144px 0; vertical-align:top; *vertical-align:middle}
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
	<input id="currentModuleId" name="currentModuleId" type="hidden" value=""/>
	<table width="100%" style="width: 100%" border="0">
		<tr>
			<td>
				<table style="width: 95%; height: 100%;" border="0">
					<tr>
						<td height="10px">&nbsp;</td>
					</tr>
				    <tr>
						<td>
							<table border="0" cellpadding="0" cellspacing="0" style="height: 455px; width: 100%; margin-left:0px; table-layout: fixed;">
						 		   <tr>
						 				<td style="width: 270px;">
					 						<fieldset id="moduleFieldset" style="width:240px;">
												 <legend title="Module列表配置">Module列表配置</legend>
												   <table border="0" style="width: 217px;">
						 						     <tr>
						 								<td width="217px;">
									 					     <ul id="moduleTree" class="ztree"
									 					     		style="overflow: auto;
																	border: 1px solid #7F9DB9;
																	width:217px;
																	margin-left: 2px;
																	margin-top: 2px;
																	margin-bottom:2px;
																	margin-right: 2px;">
															 </ul>
						 								</td>
						 						     </tr>
					 							</table>
					 					    </fieldset>
						 				</td>
						 				<td>
											 <table border="0">
												 <tr>
													<td>
													 <ul id="propertyUlall" class="ztree"
															style="overflow:auto; border: 1px solid #7F9DB9;
																	margin-left: 2px; margin-top: 2px; margin-bottom:2px; margin-right: 2px;" >

															 <table border="0" style="width: 100%;">
																  <tr>
																	   <td style="padding-left: 2px; text-align: center;line-height: 25px;font-size: 14px;font-weight: bold;">
																			  属性定义列表
																		</td>
																  </tr>
																  <tr>
																	  <td>
																		 <table style="margin-left: 0px;" class="inputTable3col">
																			<tr>
																				<td>
																					<table id="moduleMainGrid"></table>
																					<div id="moduleMainPager"></div>
																				</td>
																			</tr>
																		</table>
																	 </td>
																  </tr>

																	<tr>
																	   <td style="padding-left: 2px;">

																				<table style="width: 100%;" border="0" class="inputTable3col">
																					<tr>
																						<td style="width: 150px;">
																								<button id="addProperty" buttonId="CORE_SYS_URL_MAN_PAGE003_BTN001" class="ui-btn-modify">
																									新增属性
																								</button>
																						</td>
																						<td style="width: 100px;">

																							<button id="publishProperty" buttonId="CORE_SYS_URL_MAN_PAGE003_BTN001" class="ui-btn-modify">
																								发布属性
																							</button>
																						</td>
																						<td>
																							  <font color="red">请先选择需要发布的环境：</font>
																							 <select name="publishEnv" id="publishEnv" style="width: 100px;">
																									<option value="">请选择  </option>
																									 <option value="dat">dat环境  </option>
																									 <option value="uat">uat环境  </option>
																									 <option value="stg">stg环境  </option>
																									 <option value="pre">pre环境  </option>
																									 <option value="prd">prd环境  </option>
																							  </select>

																						</td>


																						<td>

																							 &nbsp;
																						</td>

																					</tr>
																				</table>


																		</td>
																	</tr>

																	<tr>
																	   <td style="padding-left: 2px; text-align: center; padding-top: 10px; padding-bottom: 10px;line-height: 25px;font-size: 14px;font-weight: bold;">
																			  生产环境属性列表
																		</td>
																	</tr>
																	<tr>
																	  <td>
																		 <table style="margin-left: 0px;" class="inputTable3col">
																			<tr>
																				<td>
																					<table id="propertyPrdGrid"></table>
																					<div id="propertyPrdPager"></div>
																				</td>
																			</tr>
																		</table>
																	 </td>
																  </tr>


															  </table>
														   </ul>
													</td>
												 </tr>
											</table>
						 				</td>
						 		   </tr>
							   </table>
						   </td>
					 </tr>

				</table>
			</td>

		</tr>
	</table>


	<div id="rMenu">
		<ul class="contextMenu">
			<li class="add" id="m_add" onmouseover="this.style.backgroundColor='#ffefa2'" onmouseout="this.style.backgroundColor=''" onclick="addTreeNode();"><a>增加栏目</a></li>
			<li class="edit" id="m_update" onmouseover="this.style.backgroundColor='#ffefa2'" onmouseout="this.style.backgroundColor=''" onclick="updateTreeNode();"><a>修改栏目</a></li>
			<li class="delete" id="m_remove" onmouseover="this.style.backgroundColor='#ffefa2'" onmouseout="this.style.backgroundColor=''" onclick="removeTreeNode();"><a>删除栏目</a></li>
			<li class="refuse" id="m_reset" onmouseover="this.style.backgroundColor='#ffefa2'" onmouseout="this.style.backgroundColor=''" onclick="resetTree();"><a>刷新栏目</a></li>
		</ul>
	</div>


</body>