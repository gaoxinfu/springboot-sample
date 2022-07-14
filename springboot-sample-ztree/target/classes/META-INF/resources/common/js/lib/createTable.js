
var hiddenPlus = false;//是否隐藏加号
var hiddenSubtraction = false;//是否隐藏减号
var tableTitle = [];//表格头
var addtableTitle = [];//增加的表格头，点加号的时候使用
var datas = [];//数据
var kinds = [];//类别
var date = false;//是否是日期格式，如果是加日期控件
var kindName = '';//用于区分类别的属性名称
var hideTd = false;//是否隐藏Td

//创建一个闭包
(function($) {
	
	$.fn.createTable = function(options){
		if(options.hiddenPlus != null){hiddenPlus=options.hiddenPlus;}
		if(options.hiddenSubtraction != null){hiddenSubtraction=options.hiddenSubtraction;}
		tableTitle = options.tableTitle;
		addtableTitle = options.addtableTitle;
		datas = jQuery.parseJSON(options.datas);
		kinds = options.kinds;
		if(options.date != null){date=options.date;}
		if(options.kindName != null){kindName=options.kindName;}
		//属性End
		
		var $table = $(this);
		$(this).addClass("muline").attr("border",0).attr("cellspacing",0).attr("cellpadding",0);
		$(this).wrap('<div  class="mulLine_table_div"></div>');
		var $titleTr = $('<tr class="muline_tr"></tr>');
		$.each(tableTitle,function(i,item){
			if(item.hideTd != null){hideTd=item.hideTd;}
			var $newTd = '';
			if(options.kinds && i== 0){//如果有分类，则第1列标题头占2列
				$newTd = $('<td class="mulinetitle" rowspan="1" style="width:'+item.width +';" colspan="2" >'+ item.title+'</td>');
			}else{
				$newTd = $('<td class="mulinetitle" style="width:'+item.width +';" >'+ item.title+'</td>');
			}
			$titleTr.append($newTd);
			if(hideTd){
				$newTd.hide();
			}
		});
		$(this).append($titleTr);
		if(!hiddenSubtraction){
			$titleTr.append('<td class="mulinetitle" style="width:30px;">&nbsp;</td>');
		}
		//创建标题头结束
		//创建分类Start
		if(kinds){
			$.each(kinds,function(i,kind){
				$.ghHash.set("tableKind"+kind.code,kind);//给GhHash里填值
				if(!datas){
					var $tr=$('<tr id="kindTr'+kind.code+'"></tr>');
					
					$tr.append($('<td  align="left" valign="middle" class="muline" style="width:'+kind.width+'">'+ kind.codename +'<input type="hidden" name="'+kindName+'" value="'+kind.code+'" /></td>'));
					addNewTr($tr,tableTitle);
					$table.append($tr);
					//给tr添加完元素加加号Start
					var $plus ='';
					if(!hiddenPlus){
						$plus = $('<span  class="ui-icon ui-icon-circle-plus" style="cursor: pointer;"></span>');
						var $firstTd = $("td:first-child",$tr);
						$firstTd.append($plus);
						$("span",$firstTd).click(function(){
							var $cloneTr = $('<tr id="kindTr'+kind.code+'"></tr>');
							var $rowSpanTd = $(this).parent();
							$rowSpanTd.attr("rowSpan",$rowSpanTd.attr("rowSpan") + 1);
							addNewTr($cloneTr,tableTitle);
							$cloneTr.append('<input type="hidden" name="'+kindName+'" value="'+kind.code+'" />');
							$cloneTr.insertAfter($(":last[id='kindTr"+kind.code+"']"));
							if(!hiddenSubtraction){
								removeTr($cloneTr, $rowSpanTd);
							}
						})
					}
					//给tr添加完元素加加号End
					if(!hiddenSubtraction){
						$tr.append('<td style="border-top:1pt solid #236E99;width:40px;"></td>');
					}
				}
			});
			//创建分类End
			//初始化值Start
			if(datas){
				$.each(datas,function(i,data){
					//alert(JSON.stringify($.ghHash))
					var code = data[kindName];
					var codename = $.ghHash.get("tableKind"+code).codename;
					var $tr=$('<tr id="kindTr'+code+'"></tr>');
					if($("#kindTr" + code).length == 0){
						$tr.append($('<td  align="left" valign="middle" class="muline" style="width:200px;">'+ codename +'</td>'));
						
						//给tr添加完元素加加号Start
						var $plus ='';
						if(!hiddenPlus){
							$plus = $('<span  class="ui-icon ui-icon-circle-plus" style="cursor: pointer;"></span>');
							var $firstTd = $("td:first-child",$tr);
							$firstTd.append($plus);
							$("span",$firstTd).click(function(){
								var $cloneTr = $('<tr id="kindTr'+code+'"></tr>');
								var $rowSpanTd = $(this).parent();
								$rowSpanTd.attr("rowSpan",$rowSpanTd.attr("rowSpan") + 1);
								addNewTr($cloneTr,tableTitle);
								$cloneTr.append('<input type="hidden" name="'+kindName+'" value="'+code+'" />');
								$cloneTr.insertAfter($(":last[id='kindTr"+code+"']"));
								if(!hiddenSubtraction){
									removeTr($cloneTr, $rowSpanTd);
								}
							})
						}
						//给tr添加完元素加加号End
						
					}else{
						 var $rowSpanTd = $("td:first-child",$("#kindTr" + code));
						 $rowSpanTd.attr("rowSpan",$rowSpanTd.attr("rowSpan") + 1);
					}
					addNewTr($tr,tableTitle,data);
					$tr.append('<input type="hidden" name="'+kindName+'" value="'+code+'" />');
					$table.append($tr);
					//初始化值End
				});
				//用于有的行没有减号start
				var $hasSubTr = $(".ui-icon-circle-minus").parent().parent();
				if($hasSubTr.length > 0){
					var tdLength = $("td",$hasSubTr[0]).length;
					$("[id^='kindTr']").append('<td style="border-top:1pt solid #236E99;"></td>');
					$("tr",$table).not(".muline_tr").not("[id^='kindTr']").each(function(){
						if($("td",$(this)).length < tdLength){
							$(this).append('<td style="border-top:1pt solid #236E99;"></td>');
						}
					});
				}
				//用于有的行没有减号end
			}
			//初始化值End
		}else{
			if(!hiddenPlus){
				$div = $('<div style="padding: 3px 4px;" ></div>');
				$plus = $('<span  class="ui-icon ui-icon-circle-plus" style="cursor: pointer;"></span>');
				$div.append($plus);
				$div.insertAfter($table);
				$plus.click(function(){
					var $tr=$('<tr></tr>');
					addNewTr($tr,tableTitle);
					$table.append($tr);
					removeTr($tr);
				});
			}
			//给tr添加完元素加加号End
			if(datas){
				$.each(datas,function(i,data){
					var $tr=$('<tr></tr>');
					addNewTr($tr,tableTitle,data);
					$table.append($tr);
				});
			}
		}
		if($(".mulLine_table_div").parent()[0].scrollWidth){
			$(".mulLine_table_div").css("width",$(".mulLine_table_div").parent()[0].scrollWidth);
		}
	};
// 闭包结束
})(jQuery);
function addNewTr($tr,tableTitle,data){
	if(data== null && addtableTitle != null){//用于初始化数据与新增的行不1至时
		tableTitle = addtableTitle;
	}
	if(data != null && data.addtableTitle){//用于在初始化时不同行使用的表单元素不一致时
		tableTitle = addtableTitle;
	}
	$.each(tableTitle,function(i,item){
		var $td = $('<td align="left" valign="middle" class="muline" style="width:'+item.width +';"></td>');
		var $content = $(item.content);
		$td.append($content);
		if(item.date){//如果是日期类型，加日期控件
			$content.ghDatepicker();
			$(":input",$content).ghDatepicker();
		}
		$tr.append($td);
		if(item.hideTd){
			$td.hide();
		}
	});
	if(data){//如果需要初始化值
		for(var key in data){
			var $temp = $("[id='"+key+"'],[name='"+key+"']", $tr);
			if($temp.length > 0){
				try{
					$temp.text(data[key]);
				}catch(exception){
					
				}
				try{
					if(data[key] != null){
						$temp.val(data[key]);
					}
				}catch(exception){
					
				}
			}
		}
		//alert(JSON.stringify(data))
		var hiddenSubtractionTemp = hiddenSubtraction;
		if(data.hiddenSubtraction != null){//给特殊需求留的口子，部分行可以删，部分行不能删
			hiddenSubtraction = eval(data.hiddenSubtraction);
		}
		if(!hiddenSubtraction){
			var $firstKindTr = $("[id='kindTr"+data[kindName]+"']");
			var $rowSpanTd = $("td:first-child",$firstKindTr);
			if(kinds == null || $firstKindTr.length > 0){//第1行不给删
				removeTr($tr,$rowSpanTd);
			}else{
				$tr.append('<td style="border-top:1pt solid #236E99;width:40px;"></td>');
			}
		}
		hiddenSubtraction = hiddenSubtractionTemp;//恢复值
	}
}
function removeTr($tr,$rowSpanTd){
	if(!hiddenSubtraction){
		var $td = $("<td class='muline' style='padding-left: 10px; border-right: none;width:40px;'></td>");
		var $sub = $('<span style="cursor: pointer;" class="ui-icon ui-icon-circle-minus"></span>');
		$sub.click(function(){
			if($rowSpanTd){
				$rowSpanTd.attr("rowSpan",$rowSpanTd.attr("rowSpan") - 1);
			}
			$tr.remove();
			
		});
		$td.append($sub);
		$tr.append($td);
	}
}

