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
	var dtoField = ""; //dto属性名称 默认为空

	var elementId = "";
	// 下拉列表弹出层
	$.fn.mulLine = function(options, haveTitle) {
		var opts = $.extend({}, $.fn.mulLine.defaults, options);
	
		if (typeof (options) == 'string') {
			switch (options.toLowerCase()) {
			case "deloneline":
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
		loadMulLine(this);
		initDate(this, opts, opts.isHaveTitle);

		return this.each(function() {
			var $this = $(this);
			var id = $this.attr("id");
			// 新增行
			$("#addOneLine" + id).click(function(event) {
				addNewLine2(id, opts, opts.isHaveTitle);
				reNameFiled2(id, opts, opts.isHaveTitle);
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

		if (opts.dtoField != undefined) {
			dtoField = opts.dtoField;
		}
	}

	$.fn.mulLine.defaults = {
		checkType : '',
		hiddenPlus : '',
		hiddenSubtraction : '',
		lineData : '',
		initDate : ''
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

		var tal = '<div class="mulLine_table_div"><table id="'
				+ idName
				+ '" class="muline" border="0" cellSpacing="0" cellPadding="0"></table></div>';

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
		var row = $("<tr class = 'muline_tr'></tr>");

		// 增加选择框
		// var checkTd = $("<td class=mulinetitle style='width:50px'></td>");
		// var checkText = "请选择";
		// checkTd.append(checkText);
		// row.append(checkTd);
		$.each(lineJsonDate, function(idx, item) {

			var style = "width:" + item.wigth + ";";
			if (item.style != null) {
				style = item.style;
			}

			var titleName = item.title;
			var boxWidth = item.wigth;
			var td = $("<td  class='mulinetitle' style='" + style + "'></td>");
			td.append(titleName);
			row.append(td);
		});

		if (hiddenSubtraction == '0') {
			// 插入删除按钮
			var operTd = $("<td class='mulinetitle'  style='border: none;width:50px' nowrap='nowrap'></td>");
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
		var checkTd = $("<td class='muline' style='PADDING-LEFT: 0px;BORDER-TOP: #E3F1FC 1pt solid; align:center'></td>");
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
				+ '" onclick="javascript:$(this).mulLine(\'delOneline\',\''
				+ havaTitle + '\')"></span>');

		delTd.append(delText);
		row.append(delTd);

	}

	// 初始化数据
	function initDate(obj, opts, havaTitle) {
		var dates = opts.initDate;
		var initdate = eval(dates);
		// 循环行数据
		$.each(initdate, function(idx, initDateItem) {
			// 循环列数据
			initNewLine(initDateItem, obj.attr("id"), havaTitle);
		});
		$(".delBt").button({
			icons : {
				primary : "ui-icon-search"
			}
		});
		reNameFiled2(obj.attr("id"), opts, havaTitle);
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

	function getFieldName(fieldName){
		if(dtoField && dtoField != ""){
			return dtoField + "[__XX__]." + fieldName;
		}else {
			return fieldName;
		}
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

		$
				.each(
						lineJsonDate,
						function(idx, item) {
							var type = item.type;
							var fieldName = getFieldName(item.fieldName);
							var fileName = item.fieldName;
							var sqlFieldName = item.sqlFieldName;
							var fieldValue = getValue(sqlFieldName, initItem);
							var readonly = "";
							if (item.readonly != undefined) {
								readonly = item.readonly;
							}
							var inputClass = "";
							if(item.inputClass){
								inputClass = item.inputClass;
							}
							var boxWidth = "";
							if(item.wigth){
								boxWidth = item.wigth;
							}
							var inputContext = "";

							var style = "";
							if (item.style != null) {
								style = item.style;
							}

							if (readonly == '0') {
								readonly = "readonly='readonly'";
							}
							var td = $("<td align='left' nowrap='nowrap' valign='middle' class='muline' style='width:"
									+ boxWidth + "px; " + style + "'></td>");

							switch (type) {
							case "1": // 二次验证
								inputContext += "<input type='text' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='1' name='"
										+ fieldName
										+ "' "
										+ readonly
										+ " id='"
										+ fileName
										+ "Id_X' value='"
										+ fieldValue + "' />";
								break;
							case "2": // 输入框
								inputContext += "<input type='text' class='"
										+ inputClass + "' plugType='2' name='"
										+ fileName + "' " + readonly + " id='"
										+ fileName + "Id_X' value='"
										+ fieldValue + "' />";
								inputContext += "<input type='hidden'  readonly='readonly'  id='"
										+ fileName + "-label_Id_X'/>";
								break;
							case "3": // 下拉选项
								inputContext += "<select type='select' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='3' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X' selectValue='" + fieldValue + "'/>";
								break;
							case "4": // 普通输入框
								inputContext += "<input type='text' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='4' name='"
										+ fieldName
										+ "' "
										+ readonly
										+ " id='"
										+ fileName
										+ "Id_X' value='"
										+ fieldValue + "' />";
								break;
							case "5": // 日期
								inputContext += "<input type='text' style='vertical-align: middle;width:"
										+ (boxWidth - 30)
										+ "px;' class='"
										+ inputClass
										+ "' plugType='5' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X' value='" + fieldValue + "' />";
								break;
							case "6": // 普通下拉选项
								inputContext += "<select type='select' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='6' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X' selectValue='"
										+ fieldValue
										+ "' />";
								break;
							case "7": // 密码域
								inputContext += "<input type='password' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='7' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X' value='" + fieldValue + "' />";
								break;
							case "8": // 单选按钮
								inputContext += "<input type='radio' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='8' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X' />";
								break;
							default:
								inputContext += "<span id='seqNo'/>";
								break;
							}
							td.append(inputContext);
							row.append(td);
						});

		if (hiddenSubtraction == '0') {
			addDel(row, eleId, havaTitle);
		}

		tableObj.append(row);
	}

	function addNewLine2(id, opts, havaTitle) {
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

		$
				.each(
						JsonDate,
						function(idx, item) {
							var type = item.type;
							var fieldName = getFieldName(item.fieldName);
							var fileName = item.fieldName;
							var inputClass = "";
							if(item.inputClass){
								inputClass = item.inputClass;
							}
							var boxWidth = "";
							if(item.wigth){
								boxWidth = item.wigth;
							}
							var inputContext = "";
							var td = $("<td align='left'  class='muline' nowrap='nowrap' valign='middle' style='width:"
									+ boxWidth + "'></td>");

							switch (type) {
							case "1": // 二次验证
								inputContext += "<input type='text' style='width:"
										+ boxWidth
										+ "px;'  class='"
										+ inputClass
										+ "' plugType='1' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X'/>";
								break;
							case "2": // 输入框
								inputContext += "<input type='text' class='"
										+ inputClass + "' plugType='2' name='"
										+ fieldName + "' id='" + fileName
										+ "Id_X'/>";
								inputContext += "<input type='hidden' readonly='readonly'  id='"
										+ fileName + "-label_Id_X'/>";
								break;
							case "3": // 下拉选项
								inputContext += "<select type='select' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='3' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X'/>";
								break;
							case "4": // 普通输入框
								inputContext += "<input type='text' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='4' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X'/>";
								break;
							case "5": // 日期
								inputContext += "<input type='text' style='vertical-align: middle;width:"
										+ (boxWidth - 50)
										+ "px;' class='"
										+ inputClass
										+ "' plugType='5' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X'/>";
								break;
							case "6": // 普通下拉选项
								inputContext += "<select type='select' style='width:"
										+ boxWidth
										+ "px;' style='width:"
										+ boxWidth
										+ "px;'  class='"
										+ inputClass
										+ "' plugType='6' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X'/>";
								break;
							case "7": // 密码域
								inputContext += "<input type='password' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='7' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X'/>";
								break;
							case "8": // 单选按钮
								inputContext += "<input type='radio' style='width:"
										+ boxWidth
										+ "px;' class='"
										+ inputClass
										+ "' plugType='8' name='"
										+ fieldName
										+ "' id='"
										+ fileName
										+ "Id_X' />";
								break;
							default:
								inputContext += "<span id='seqNo'/>";
								break;
							}
							td.append(inputContext);
							row.append(td);
						});
		if (hiddenSubtraction == '0') {
			addDel(row, id, havaTitle);
		}
		row.appendTo(tableObj);
		$(".delBt").button({
			icons : {
				primary : "ui-icon-search"
			}
		});
	}

	function delOneLine(obj) {
		obj.parent().parent().remove();
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
	
	function isPlugType(plugType){
		if(plugType == '1' || plugType == '2' || plugType == '3' || plugType == '4' || plugType == '5' || plugType == '6' || plugType == '7' || plugType == '8' ){
			return true;
		}else{
			return false;
		}
	}

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
				var colIdx2 = 0;
				ntd.each(function(colIdx) {
				
					var inputObj = $(this).children();
					var plugType = inputObj.attr("plugType");
					if (plugType && isPlugType(plugType)) {
						// var newName =
						// inputObj.attr("name").replace("[X]","["+(rowIdx-1).toString()+"]");
						var inputVal = inputObj.attr("selectValue");
						if(!inputVal || inputVal == ''){
							inputVal = inputObj.val();
						}
						inputObj.attr("selectValue","");
						//重命门id
						var oldId = inputObj.attr("id");
						var newId = oldId.substring(0,
								oldId.lastIndexOf("_") + 1)
								+ (rowIdx - 1).toString();
						inputObj.attr("id", newId);
						//重命门name
						if(dtoField && dtoField != ""){
							oldName = inputObj.attr("name");
							newName = oldName.replace("__XX__",rowIdx - 1);
							inputObj.attr("name", newName);
						}
						colIdx2 = colIdx2 + 1;
						initPlugin(newId, inputObj.attr("plugType"), inputObj
								.attr("name"), rowIdx - 1, inputVal, opts, colIdx2);
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

	}
	function reNameFiled3(id) {

		var tableObj = $('#' + id);

		var nTr = $('tr', tableObj);
		var indx = 1;
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
					var inputObj = $(this).children();
					var plugType = inputObj.attr("plugType");
					if (plugType && isPlugType(plugType)) {
						//重命名name
						if(dtoField && dtoField != ""){
							var oldName = inputObj.attr("name");
							var reg = new RegExp("\\[.*?\\]","g");
							var newName = oldName.replace(reg, "[" + (rowIdx - 1) + "]");
							inputObj.attr("name",newName);
						}					
					}
				});
			}
		});

	}

	function initPlugin(id, type, name, index, initValue, opts, colIdx) {
		var dateFormat = "";
		var JsonDate = opts.lineData;
		var filedFormat;
		$.each(JsonDate, function(idx, item) {
			var filedType = item.type;
			var filedName = item.fieldName;
			if (item.dateFormat && colIdx == idx) {
				filedFormat = item.dateFormat;
			}
		});
		switch (type) {
		case "1": // 二次验证
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
		case "2": // 自动完成
			var source = "";
			var height = "";
			var width = "";
			var twoInput = "";
			$.each(filedFormat, function(idx, item) {
				source = item.source;
				height = item.height;
				width = item.width;
				twoInput = item.twoInput;
			});

			$("#" + id).ghAutoComplete({
				source : source,
				height : height,
				width : width,
				twoInput : twoInput
			});
			break;
		case "3": // 下拉选项
			var dorpData = "";
			var url = "";
			var trigger = "";
			var event = "";
			var value = "value";
			var lable = "label";
			$.each(filedFormat, function(idx, item) {
				if (item.value != undefined){ 
					value = item.value;
				}
				if (item.lable != undefined){
					lable = item.lable;
				}
				if (item.source != undefined){
					dorpData = item.source;
				}
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
				  value : value,
				  lable : lable,
		   defaultValue : initValue
			});
			break;
		case "5": // 日期
			$("#" + id).ghDatepicker();
			break;
		case "6": // 普通下拉选项
			var options = "";
			var sourceDate = "";
			$.each(filedFormat, function(idx, item) {
				if (item.source != undefined) {
					sourceDate = item.source;
				}
			});
			$.each(sourceDate, function(index, value) {
				if (initValue == value.value) {
					options += '<option value="' + value.value + '" selected="selected">'
							+ value.lable + '</option>';
				} else {
					options += '<option value="' + value.value + '">'
							+ value.lable + '</option>';
				}
			});
			$("#" + id).html(options);
			break;
		}
	}
	// 闭包结束
})(jQuery);
