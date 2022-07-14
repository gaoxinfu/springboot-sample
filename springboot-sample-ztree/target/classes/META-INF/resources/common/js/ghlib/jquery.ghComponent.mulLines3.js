/**
 * 
 * 
 * 
 */
// 创建一个闭包
(function($) {

	var lineJsonDate = "";
	var checkType = '0'; // 单选or多选.0-多选;1-单选
	var hiddenPlus = '0'; // 新增,是否隐藏添加一行的标志：0为显示，1为隐藏
	var hiddenSubtraction = '0'; // 新增,是否隐藏删除一行的标志：0为显示，1为隐藏
	var initJsonDate = "";
	var isHaveTitle = '0'; // 0表示有，1表示无
	var initUrl = "";
	var elementId = "";
	var num = 0;
	var id_no = 0;
	var tempArray = new Array();

	// 下拉列表弹出层
	$.fn.mulLine3 = function(options, haveTitle) {
		var id_no = 0;
		var opts = $.extend({}, $.fn.mulLine3.defaults, options);
		if (typeof(options) == 'string') {
			switch (options.toLowerCase()) {
				case "deloneline" :
					return this.each(function() {
								delOneLine($(this));
								var $this = $(this);
								var id3 = $this.attr("id");
								id3 = id3.substring(10, id3.length);
								if (haveTitle == '0') {
									id3 = 'table' + id3;
								}

								reNameFiled3(id3);
							});
			}
		}

		var $this = $(this);
		elementId = $this.attr("id");
		initParm(opts);
		loadMulLine($this);
		initDate($this, opts);

		return this.each(function() {
					var $this = $(this);
					var id = $this.attr("id");
					// 新增行
					$("#addOneLine" + id).click(function(event) {
								addNewLine2(id, opts, opts.isHaveTitle);
								// reNameFiled2(id,opts,opts.isHaveTitle);
								var tmpId = 'table' + id;
								reNameFiled3(tmpId);
							});

				});
	};

	// 初始化公共参数
	function initParm(opts) {
		// 初始化行参数
		lineJsonDate = opts.lineData;
		if (opts.checkType != undefined) {
			checkType = opts.checkType;
		}

		if (opts.hiddenPlus != undefined) {
			hiddenPlus = opts.hiddenPlus;
		}

		if (opts.hiddenSubtraction != undefined) {
			hiddenSubtraction = opts.hiddenSubtraction;
		}

		if (opts.initDate != undefined) {
			initJsonDate = opts.initDate;
		}
		if (opts.isHaveTitle != undefined) {
			isHaveTitle = opts.isHaveTitle;
		}
		if (opts.initUrl != undefined) {
			initUrl = opts.initUrl;
		}
	}

	$.fn.mulLine3.defaults = {
		checkType : '',
		hiddenPlus : '',
		hiddenSubtraction : '',
		lineData : '',
		initDate : '',
		initUrl : ''
	};

	// 加载数据
	function loadMulLine(obj) {
		if (isHaveTitle == '0') {
			createTal(obj);
			// 添加控件
			insertAddPlug();
			// 添加表头
			addTitle();
		} else if (isHaveTitle == '1') {
			// 添加控件
			insertAddPlug2();
		}

	}

	// 创建table头
	function createTal(obj) {
		// var idName = elementId.attr("id")+"mulTab";

		var idName = "table";
		idName += elementId;
		var tal = '<div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="'+elementId+'Div"><table id="'
				+ idName
				+ '" class="muline" border="0" cellSpacing="0" cellPadding="0" ></table></div>';

		// var pos=$("#" + obj).position();
		// var A_top = pos.top;
		// $("#mulTab").css({"display":"block","z-index":"2","position":"absolute","top":A_top
		// +"px"});
		$(tal).insertAfter(obj);
	}

	// 增加新增按钮
	function insertAddPlug() {
		if (hiddenPlus == '0') {
			var tableObj = $('#table' + elementId);
			var addButton = '<div style="padding: 3px 4px;"><span style="cursor: pointer;" class="ui-icon ui-icon-circle-plus" id="addOneLine'
					+ elementId + '"></span></div>';
			$(addButton).insertAfter(tableObj);
			$(".addBt").button({
						icons : {
							primary : "ui-icon-search"
						}
					});
		}
	}

	function insertAddPlug2() {
		if (hiddenPlus == '0') {
			var tableObj = $('#' + elementId);
			var addButton = '<div style="padding: 3px 4px;"><span style="cursor: pointer;" class="ui-icon ui-icon-circle-plus" id="addOneLine'
					+ elementId + '"></span></div>';

			$(addButton).insertAfter(tableObj);
			$(".addBt").button({
						icons : {
							primary : "ui-icon-search"
						}
					});
		}
	}

	// 新增table标题
	function addTitle() {

		var tableObj = $('#table' + elementId);
		// var tableObj = $('#mulTab');
		var row = $("<tr class = 'ui-state-default ui-jqgrid-hdiv'></tr>");

		// 增加选择框
		// var checkTd = $("<td class=mulinetitle style='width:50px'></td>");
		// var checkText = "请选择";
		// checkTd.append(checkText);
		// row.append(checkTd);
		$.each(lineJsonDate, function(idx, item) {

					var style = "";
					if (item.style != null) {
						style = item.style
					}

					var titleName = item.title;
					var boxWidth = item.wigth;
					var td = $("<td class='mulinetitle' style='" + style
							+ ";width:" + boxWidth + "px'  nowrap></td>");
					td.append(titleName);
					row.append(td);
				});

		if (hiddenSubtraction == '0') {
			// 插入删除按钮
			var operTd = $("<td class='mulinetitle' style='border: none;'  nowrap></td>");
			var operText = "&nbsp;操作&nbsp;";
			operTd.append(operText);
			row.append(operTd);
		}
		tableObj.append(row);
	}

	// 创建选择框
	function addSelect(row) {
		// 新增选择框
		var checkText = "";
		var checkTd = $("<td class='muline' style=' align:center'></td>");
		if (checkType == 0) {
			checkText = "<input type='checkbox' name='checkSelect'/>";
		} else if (checkType == 1) {
			checkText = "<input type='radio' name='checkSelect'/>";
		}
		checkTd.append(checkText);
		row.append(checkTd);
	}

	// 创建删除按钮
	function addDel(row, tableId, havaTitle) {
		// 新增选择框
		var delText = "";
		var delTd = $("<td class='muline' style='padding-left: 10px; border-right: none;'></td>");
		delText = $('<span style="cursor: pointer;" class="ui-icon ui-icon-circle-minus" id="delOneLine'
				+ tableId
				+ '" onclick="javascript:$(this).mulLine3(\'delOneline\',\''
				+ havaTitle + '\')"></span>');

		delTd.append(delText);
		row.append(delTd);

	}

	// 初始化数据
	function initDate(obj, opts) {
		var initTempdate;
		if (initJsonDate != "") {
			initTempdate = eval(initJsonDate);
			dateLoad(initTempdate, obj, opts);
		} else if (initUrl != "") {
			var source = initUrl;
			source += '&random=' + Math.random();
			$.get(source, function(data) {
						initTempdate = eval(data);
						dateLoad(initTempdate, obj, opts);
					});
		}
	}

	function dateLoad(initTempdate, obj, opts) {
		// 循环行数据
		$.each(initTempdate, function(idx, initDateItem) {
					// 循环列数据
					initNewLine(initDateItem, obj.attr("id"), isHaveTitle);

				});
		$(".delBt").button({
					icons : {
						primary : "ui-icon-search"
					}
				});
		reNameFiled2(obj.attr("id"), opts, isHaveTitle);
	}

	function getValue(key, item) {
		var rsValue = "";
		$.each(item, function(fieldName, fieldValue) {
					if (key == fieldName) {
						rsValue = fieldValue;
						return;
					}
				});
		return rsValue;
	}

	// 新增行
	function initNewLine(initItem, eleId, havaTitle) {
		var tableObj;
		if (havaTitle == '0') {
			tableObj = $('#table' + eleId);
		} else if (havaTitle == '1') {
			tableObj = $('#' + eleId);
		}
		// var tableObj = $('#mulTab');
		var row = $("<tr></tr>");
		// 创建选择框
		// addSelect(row);
		$.each(lineJsonDate, function(idx, item) {
			var type = item.type;
			var fileName = item.fieldName;
			var sqlFieldName = item.sqlFieldName;
			var fieldValue = getValue(sqlFieldName, initItem);
			var inputClass = item.inputClass;
			var boxWidth = item.wigth;
			var inputContext = "";
			// alert(sqlFieldName+"==="+fieldValue+"==="+initItem);
			var style = "";
			if (item.style != null) {
				style = item.style
			}

			var td = $("<td class='muline' style='width:" + boxWidth + "px; "
					+ style + ";' nowrap ></td>");
			switch (type) {
				case "1" : // 二次验证
					inputContext += "<input type='text' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='1' name='" + fileName + "' id='"
							+ fileName + "Id_X' value='" + fieldValue + "' />";
					break;
				case "2" : // 输入框

					var tmpid = '';
					var tmpName='';
					if (typeof(fieldValue) == 'string') {
						tmpid = fieldValue;
					} else {
						tmpid = fieldValue.id;
						tmpName = fieldValue.name;
					}
					if (tmpid == 'null')
						tmpid = '';
					if (tmpName == 'null')
						tmpName = '';
					inputContext += "<input type='text' class='" + inputClass
							+ "' plugType='2' name='" + fileName + "' id='"
							+ fileName + "Id_X' value='" + tmpid + "' />";
					inputContext += "<input type='text' class='ui-widget-content ui-autocomplete-label' readonly='readonly'  id='"
							+ fileName
							+ "Id_X-label' value='"
							+ tmpName
							+ "' /> ";

					break;
				case "3" : // 下拉选项
					var tmpid = '';

					if (typeof(fieldValue) == 'string') {
						tmpid = fieldValue;
					} else {
						tmpid = fieldValue.id;
						tmpName = fieldValue.name;
					}
					inputContext += "<select type='select' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='3' selectValue='" + tmpid + "-"
							+ tmpName + "' name='" + fileName + "' id='"
							+ fileName + "Id_X'><option value='" + tmpid
							+ "' selected>" + tmpName + "</option></select>";
					break;
				case "4" : // 普通输入框
					inputContext += "<input type='text' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='4' name='" + fileName + "' id='"
							+ fileName + "Id_X' value='" + fieldValue + "' />";
					break;
				case "5" : // 日期
					inputContext += "<input type='text' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='5' name='" + fileName + "' id='"
							+ fileName + "Id_X' value='" + fieldValue + "' />";
					break;
				case "6" : // 普通下拉选项
					inputContext += "<select type='select' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='6' name='" + fileName + "' id='"
							+ fileName + "Id_X' selectValue='" + fieldValue
							+ "' />";
					break;
				case "7" : // 密码域
					inputContext += "<input type='password' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='7' name='" + fileName + "' id='"
							+ fileName + "Id_X' value='" + fieldValue + "' />";
					break;
				case "8" : // autocomplet with select img
					var tmpid = '';
					if (typeof(fieldValue) == 'string') {
						tmpid = fieldValue;
					} else {
						tmpid = fieldValue.id;
						tmpName = fieldValue.name;
					}
					inputContext += "  <input type='text' class='" + inputClass
							+ "' plugType='8' name='" + fileName + "' id='"
							+ fileName + "Id_X' value='" + tmpid + "' />";
					inputContext += "<input type='text' class='ui-widget-content ui-autocomplete-label' readonly='readonly'  id='"
							+ fileName
							+ "Id_X-label' value='"
							+ tmpName
							+ "'/>";
					inputContext += "<img id='" + fileName
							+ "Id_X-select' src=\"" + common.ctx + "/"
							+ common.projectWebRootName
							+ "/skin/default/css/images/search.png\"  ></img>";
					break;
				case "9" : // 单选按钮
					var tmpid = '';
					if (typeof(fieldValue) == 'string') {
						tmpid = fieldValue;
					}
					num += 1;
					var filevalue = fileName + "Id_" + num;
					inputContext += "<input type='radio' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='9' name='" + fileName + "' " + tmpid
							+ " id='" + fileName + "Id_X' value='" + filevalue
							+ "'/>";
					// alert(filevalue+"=="+num+"==="+tmpid+"==="+fileName);
					break;
				default :
					inputContext += "<span id='seqNo'/>";
					break;
			}
			td.append(inputContext);
			row.append(td);
		});

		if (hiddenPlus == '0') {
			addDel(row, eleId, havaTitle);
		}

		tableObj.append(row);
	}

	// 新增行
	function addNewLine2(id, opts, havaTitle) {
		var idArray = new Array();
		var tableObj;
		if (havaTitle == '0') {
			tableObj = $('#table' + id);
		} else {
			tableObj = $('#' + id);
		}

		// var tableObj = $('#table'+id);
		var row = $("<tr></tr>");

		var JsonDate = opts.lineData;
		// 创建选择框
		// addSelect(row);

		$.each(JsonDate, function(idx, item) {
			var type = item.type;
			var fileName = item.fieldName;
			var inputClass = item.inputClass;
			var boxWidth = item.wigth;
			var inputContext = "";
			var td = $("<td   class='muline' style='width:" + boxWidth
					+ ";' ></td>");
			var newID = "";
			switch (type) {
				case "1" : // 二次验证
					newID = getNewId(fileName);
					inputContext += "<input type='text' style='width:"
							+ boxWidth + "px;  '  class='" + inputClass
							+ "' plugType='1' name='" + fileName + "' id='"
							+ newID + "'/>";
					idArray.push(newID);
					break;
				case "2" : // 输入框
					newID = getNewId(fileName);
					var newIdLabel = newID + "-label";
					inputContext += "<input type='text' class='" + inputClass
							+ "' plugType='2' name='" + fileName + "' id='"
							+ newID + "'/>";
					inputContext += "<input type='text' class='ui-widget-content ui-autocomplete-label' readonly='readonly'  id='"
							+ newIdLabel + "'/> ";
					idArray.push(newID);
					break;
				case "3" : // 下拉选项
					newID = getNewId(fileName);
					inputContext += "<div id='" + newID
							+ "_div'><select style='width:" + boxWidth
							+ "px;' class='' plugType='3' name='" + fileName
							+ "' id='" + newID + "'></select></div>";
					idArray.push(newID);
					break;
				case "4" : // 普通输入框
					newID = getNewId(fileName);
					inputContext += "<input type='text' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='4' name='" + fileName + "' id='"
							+ newID + "'/>";
					idArray.push(newID);
					break;
				case "5" : // 日期
					newID = getNewId(fileName);
					inputContext += "<input type='text' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='5' name='" + fileName + "' id='"
							+ newID + "'/>";
					idArray.push(newID);
					break;
				case "6" : // 普通下拉选项
					newID = getNewId(fileName);
					inputContext += "<select type='select' style='width:"
							+ boxWidth + "px;' style='width:" + boxWidth
							+ "px;'  class='" + inputClass
							+ "' plugType='6' name='" + fileName + "' id='"
							+ newID + "'/>";
					idArray.push(newID);
					break;
				case "7" : // 密码域
					newID = getNewId(fileName);
					inputContext += "<input type='password' style='width:"
							+ boxWidth + "px;' class='" + inputClass
							+ "' plugType='7' name='" + fileName + "' id='"
							+ fileName + "newID'/>";
					idArray.push(newID);
					break;
				case "8" : // autocomplet with select img
					newID = getNewId(fileName);
					var newLabelID = newID + "-label";
					var newSelectID = newID + "-select";
					inputContext += "<input type='text' class='" + inputClass
							+ "' plugType='8' name='" + fileName + "' id='"
							+ newID + "'/>";
					inputContext += "<input type='text' class='ui-widget-content ui-autocomplete-label' readonly='readonly'  id='"
							+ newLabelID + "'/>";
					inputContext += "<img id='"
							+ newSelectID
							+ "' src=\""
							+ common.ctx
							+ "/"
							+ common.projectWebRootName
							+ "/skin/default/css/images/search.png\"  ></img> &nbsp";
					idArray.push(newID);
					break;
				case "9" : // 单选按钮
					newID = getNewId(fileName);
					// inputContext += "<input type='radio' style='width:"
					// + boxWidth
					// + "px;' class='"
					// + inputClass
					// + "' plugType='9' name='"
					// + fileName
					// + "' id='"
					// + newID
					// + "Id_X' />";
					if (id_no == "1") {
						inputContext += "<input type='radio' style='width:"
								+ boxWidth + "px;' class='" + inputClass
								+ "' plugType='9' name='" + fileName + "' "
								+ "checked " + " id='" + newID
								+ "Id_X' value='" + newID + "'/>";
					} else {
						inputContext += "<input type='radio' style='width:"
								+ boxWidth + "px;' class='" + inputClass
								+ "' plugType='9' name='" + fileName + "' "
								+ " id='" + newID + "Id_X' value='" + newID
								+ "'/>";
					}
					// alert(newID);
					break;
				default :
					inputContext += "<span id='seqNo'/>";
					break;
			}
			td.append(inputContext);
			row.append(td);
		});
		if (hiddenPlus == '0') {
			addDel(row, id, havaTitle);
		}
		// alert(row[0].outerHTML);
		row.appendTo(tableObj);
		
		$(".delBt").button({
					icons : {
						primary : "ui-icon-search"
					}
				});

		id_no++;
		// 初始化插件
		initPlugs(idArray, opts);
	}

	function delOneLine(obj) {
		obj.parent().parent().remove();
	}

	function initPlugs(idArray, opts) {
		$.each(idArray, function(idx, item) {
					var newId = item;
					var rowNo = newId.substring(newId.indexOf("_") + 1,
							newId.length);
					var newIdObj = $('#' + item);
					initPlugin(newId, newIdObj.attr("plugType"), newIdObj
									.attr("name"), rowNo, newIdObj
									.attr("selectValue"), opts);
				});
	}

	/*
	 * function batchDelOneLine(){ if(checkType == 0){ var checked =
	 * $("input[type='checkbox'][name='checkSelect']");
	 * $(checked).each(function(){ if($(this).attr("checked")==true){
	 * $(this).parent().parent().remove(); var $this = $(this); var id =
	 * $this.attr("id"); reNameFiled(id); } }); }else if(checkType == 1){ var
	 * checked = $("input[type='radio'][name='checkSelect']");
	 * $(checked).each(function(){ if($(this).attr("checked")==true){
	 * $(this).parent().parent().remove(); var $this = $(this); var id =
	 * $this.attr("id"); reNameFiled(id); } }); } }
	 */

	function reNameFiled2(id, opts, havaTitle) {
		if (id == '' || id == undefined) {
			id = elementId;
		}
		var tableObj;
		if (havaTitle == '0') {
			tableObj = $('#table' + id);
		} else {
			tableObj = $('#' + id);
		}
		var nTr = $('tr', tableObj);
		var indx = 1;
		nTr.each(function(rowIdx) {
			if (rowIdx > 0) {
				var ntd = $("td", nTr[rowIdx]);

				ntd.each(function(colIdx) {
					var childrenObjs = $(this).children();
					var firstChildrenObj = $(childrenObjs[0]);
					childrenObjs.each(function(eleIndex) {
								var inputObj = $(childrenObjs[eleIndex]);

								if (inputObj.attr("type") == 'text'
										|| inputObj.attr("type") == 'hidden'
										|| firstChildrenObj.attr("type") == 'select'
										|| inputObj.attr("type") == 'select-one'
										|| inputObj.attr("type") == 'password'
										|| childrenObjs[eleIndex].nodeName
												.toLowerCase() == 'img') {
									// var newName =
									// inputObj.attr("name").replace("[X]","["+(rowIdx-1).toString()+"]");
									var oldId = inputObj.attr("id");
									var pos = oldId.lastIndexOf("_X");
									var newId = oldId;
									if (pos > 0) {
										newId = oldId.substring(0, pos + 1)
												+ (rowIdx - 1).toString()
												+ oldId.substring(pos + 2);
									}

									if (eleIndex == 0) {

										firstNewId = newId
									}
									inputObj.attr("id", newId);
									// initPlugin(newId,inputObj.attr("plugType"),inputObj.attr("name"),rowIdx-1,inputObj.attr("selectValue"),opts);
								}
							});

					if (firstChildrenObj.attr("type") == 'text'
							|| firstChildrenObj.attr("type") == 'hidden'
							|| firstChildrenObj.attr("type") == 'select'
							|| firstChildrenObj.attr("type") == 'select-one'
							|| firstChildrenObj.attr("type") == 'password'
							|| childrenObjs[0].nodeName.toLowerCase() == 'img') {

						var oldId = firstChildrenObj.attr("id");
						var pos = oldId.lastIndexOf("_X");
						var newId = oldId;
						if (pos > 0) {
							newId = oldId.substring(0, pos + 1)
									+ (rowIdx - 1).toString()
									+ oldId.substring(pos + 2);
						}
						initPlugin(newId, firstChildrenObj.attr("plugType"),
								firstChildrenObj.attr("name"), rowIdx - 1,
								firstChildrenObj.attr("selectValue"), opts);
					}

					var seqObj = $("span", ntd[colIdx]);
					// 初始化序号
					if (seqObj.attr("id") == 'seqNo') {
						seqObj.html(indx);
						indx += 1;
					}
				});
			}
		});
		id_no = indx;
	}

	// 新增、删除重命名
	function reNameFiled3(id) {

		var tableObj = $('#' + id);
		var nTr = $('tr', tableObj);
		var indx = 1;
		var index = 1;
		nTr.each(function(rowIdx) {
					if (rowIdx > 0) {
						var ntd = $("td", nTr[rowIdx]);
						ntd.each(function(colIdx) {
									var seqObj = $("span", ntd[colIdx]);
									// 初始化序号
									if (seqObj.attr("id") == 'seqNo') {
										seqObj.html(indx);
										indx += 1;
									}
									// 修正radio 数列问题
									var radioObj = $("input", ntd[colIdx]);
									if (radioObj.attr("type") == 'radio') {
										radioObj
												.val("defaultOrgDepId_" + index);
										index += 1;
									}
								});
					}
				});
	}

	function initPlugin(id, type, name, index, initValue, opts) {
		var dateFormat = "";
		var JsonDate = opts.lineData;
		$.each(JsonDate, function(idx, item) {
					var filedType = item.type;
					var filedName = item.fieldName;
					if (filedType == type && filedName == name) {
						filedFormat = item.dateFormat;
					}
				});
	

		switch (type) {
			case "1" : // 二次验证
				var firstBG = "";
				var lastBG = "";
				var successBG = "";
				var alertMessage = "";

				$.each(filedFormat, function(idx, item) {
							firstBG = item.firstBG;
							lastBG = item.lastBG;
							successBG = item.successBG;
							alertMessage = item.alertMessage;
						});

				$("#" + id).twiceValidator({
							firstBG : firstBG,
							lastBG : lastBG,
							successBG : successBG,
							alertMessage : alertMessage
						});
				break;
			case "2" : // 自动完成
				var source = "";
				var height = "";
				var width = "";
				var twoInput = "";
				var popUrl = "";
				$.each(filedFormat, function(idx, item) {
							source = item.source;
							height = item.height;
							width = item.width;
							twoInput = item.twoInput;
							popUrl = item.popUrl;
						});
				if (twoInput == false) {
					$("#" + id).next().remove();
				}
				$("#" + id).ghAutoComplete({
							source : source,
							height : height,
							width : width,
							twoInput : twoInput
						});

				break;
			case "3" : // 下拉选项
				var dorpData = "";
				var url = "";
				var trigger = "";
				var event = "";
				var dataField = "";
				$.each(filedFormat, function(idx, item) {
							if (item.data != undefined) {
								dorpData = item.data;
							}
							if (item.url != undefined) {
								url = item.url;
							}
							if (item.trigger != undefined) {
								trigger = '#' + item.trigger + "Id_" + index;
							}
							if (item.event != undefined) {
								event = item.event;
							}
							if (item.dataField != undefined) {
								dataField = item.dataField;
							}
						});
				
				$("#" + id).dropDownList({
							trigger : trigger,
							data : dorpData,
							url : url,
							event : event,
							dataField : dataField,
							selectValue : initValue
						});

				break;
			case "5" : // 日期
				$("#" + id).ghDatepicker();
				break;
			case "6" : // 普通下拉选项
				var options = "";
				var sourceDate = "";
				$.each(filedFormat, function(idx, item) {
							if (item.source != undefined) {
								sourceDate = item.source;
							}
						});
				$.each(sourceDate, function(index, value) {
							if (initValue == value.value) {
								options += '<option value="' + value.value
										+ '" selected>' + value.lable
										+ '</option>';
							} else {
								options += '<option value="' + value.value
										+ '">' + value.lable + '</option>';
							}
						});
				$("#" + id).html(options);
				break;

			case "8" : // 自动完成
				var source = "";
				var height = "";
				var width = "";
				var twoInput = "";
				var popUrl = "";
				$.each(filedFormat, function(idx, item) {
							source = item.source;
							height = item.height;
							width = item.width;
							twoInput = item.twoInput;
							popUrl = item.popUrl;
						});
				if (twoInput == false) {
					$("#" + id).next().remove();
				}

				$("#" + id).ghAutoComplete({
							source : source,
							height : height,
							width : width,
							twoInput : twoInput
						});

				$("#" + id + "-select").popselect({
							valueInput : id,
							lableInput : id + '-label',
							position : 'left',
							source : popUrl

						});

				break;
			case "9" : // 自动完成
				$("#" + id).click(function() {
						});
				break;
		}
	}

	function getNewId(id) {
		var newId = id + "Id_" + id_no;
		return newId;
	}
	// 闭包结束
})(jQuery);
