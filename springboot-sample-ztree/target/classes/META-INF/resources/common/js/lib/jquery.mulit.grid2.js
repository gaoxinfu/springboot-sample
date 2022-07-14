(function ($) {  
 
	var remove_tr = function($remove_tr, settings){
		var $remove_td = $("<td class='muline' style='padding-left: 10px; width:40px;'></td>");
		var $remove_sub = $('<span style="cursor: pointer;" class="ui-icon ui-icon-circle-minus"></span>');
		$remove_sub.click(function(){ 
			$remove_tr.remove(); 
		});
		$remove_td.append($remove_sub);
		$remove_tr.append($remove_td);
	}
	
	var add_tr = function($add_tr, settings){
		var $add_td = $("<td class='muline' style='padding-left: 10px; width:40px;'></td>");
		var $add_sub = $('<span style="cursor: pointer;" class="ui-icon ui-icon-circle-plus"></span>');
		$add_sub.click(function(){ 
			//if($add_td.parent()){
			//	var tdp = $add_td.parent();
			add_new_tr($add_tr, settings, null, false);
			//}
		});
		$add_td.append($add_sub);
		$add_tr.append($add_td);
	}
	
	
    var add_new_tr = function($insertObj, settings, data, isLast) {
    	    var columns = settings.columns;
    		var $add_tr=$('<tr></tr>');
    		  
        	$.each(columns, function(i, column){
        		
        		var _colum_id = settings.table_id+"_"+column.name+"_"+settings._startIndex;
        		
        		var $td = null; 
        		var $content = null;
        		
        		if(column.hidden){//隐藏
        			$td  = $('<td align="left" valign="middle" class="muline" style="width:0px;"></td>');
        			$content = $('<input type="hidden">');
        			$content.attr("name", column.name); 
        			$content.attr("id", _colum_id); 
        		}else{
        			if(!column.width){
            			$td  = $('<td align="left" valign="middle" class="muline" style="width:100px;"></td>');
        			}else{
        				$td  = $('<td align="left" valign="middle" class="muline" style="width:'+column.width +';"></td>');
        			} 
        			if(column.editor && column.editor.html){//可编辑
        			    $content = $(column.editor.html);
        			    $content.attr("name", column.name); 
                		$content.attr("id", _colum_id); 
        			}else{//只读
        				$content = $('<span>&nbsp;</span>');
        			}
        		}
        		
        		if(data){
        			var $type = $content.attr("type");
        	 
        			var input_val = data[column.dataIndex];
        			if(typeof(input_val) == 'undefined' || null==input_val || 'null' == input_val || 'NULL'==input_val){
        				input_val = "";
        			}
            		if($type=='text' || $type=='select-one' || $type=='hidden'){
            			$content.val(input_val);
            		}else if($type=='textarea'){
            			$content.text(input_val);
            		}else{
            			$content.html(input_val);
            		}
        		}
        		
        		$td.append($content); 
        		
        		if(column.editor && column.editor.json){
        			var edit_a = $('<a style="position:relative;" href="#">JSON编辑</a>&nbsp;&nbsp;');
        			edit_a.click(function() {
        				if(column.editor.editCallBack){
        					column.editor.editCallBack(_colum_id);
        				} 
        			});
        			$td.append(edit_a); 
				}else if(column.editor && column.editor.select){
					var edit_a = $('<a style="position:relative;" href="#">选择'+column.text+'</a>&nbsp;&nbsp;');
					edit_a.click(function() {
        				if(column.editor.editCallBack){
        					column.editor.editCallBack(_colum_id);
        				} 
        			});
        			$td.append(edit_a); 
				}
        		
        		//if(column.editor && column.editor.date){//如果是日期类型，加日期控件
        		///	$content.ghDatepicker();
        		//	$(":input", $content).ghDatepicker();
        		//}
        		$add_tr.append($td);
        		if(column.hidden){
        			$td.hide();
        		}
        	});
        	
        	
        	
        	if(settings.isAdded){
        		add_tr($add_tr, settings);
        	}
        	if(settings.isSubtraction){
        		remove_tr($add_tr, settings);
        	}
        	
        	if(isLast){
        		$insertObj.append($add_tr);
        	}else{
        		$insertObj.before($add_tr);
        	}
        	
        	settings._startIndex++;
        	return $add_tr;
    }
    
	
    $.fn.mulitEditTable = function (options) {  
        var me = this;  
        var settings = me.data("mulitEditTable");
       
        if (null == settings || typeof settings === "undefined") {
            var defaults = {
                _startIndex : 1,
            	isPlus: true,//是否隐藏头加号
            	isSubtraction: true,//是否隐藏减号
            	isAdded: true,//是否每行加号
            	width : '100%',
            	columns :[],//表格头 
            	datas : []//数据
                //onEvent: function() {}
            }; 
            settings = $.extend({}, defaults, options);
            settings.datas = jQuery.parseJSON(settings.datas);
            settings.table_id = me.attr("id");
            me.data("mulitEditTable", settings);
        } else {
            settings = $.extend({}, settings, options);
            settings.datas = jQuery.parseJSON(settings.datas);
            settings.table_id = me.attr("id");
        }
          
        //初始化方法  
        me.init = function(){  

        	me.addClass("muline").attr("border",0).attr("cellspacing",0).attr("cellpadding",0);
       	 
    	    me.wrap('<div class="mulLine_table_div" style="width:'+settings.width+';"></div>');
    		var $new_title_tr = $('<tr class="muline_tr"></tr>');
    		//循环创建表头
    		$.each(settings.columns, function(i,item){
    			var $new_title_td  = null;
    			if(!item.width){
    			    $new_title_td  = $('<td class="mulinetitle" style="width:0px;" >'+ item.text+'</td>');
    			}else{
    			    $new_title_td  = $('<td class="mulinetitle" style="width:'+item.width +';" >'+ item.text+'</td>');
    			} 
    			$new_title_tr.append($new_title_td);
				if(item.hidden){
					$new_title_td.hide();
				}
    		});
    		if(settings.isAdded){
    			$new_title_tr.append('<td class="mulinetitle" style="width:30px;">&nbsp;&nbsp;</td>');
    		}
    		if(settings.isSubtraction){
    			$new_title_tr.append('<td class="mulinetitle" style="width:30px;">&nbsp;&nbsp;</td>');
    		}
    		
    		me.append($new_title_tr);
			if(settings.isPlus){
				$plus_div = $('<div style="padding: 3px 4px;"></div>');
				$plus_div_span = $('<span id="'+me[0].id+'_add_plus" class="ui-icon ui-icon-circle-plus" style="cursor: pointer;"></span>');
				$plus_div.append($plus_div_span);
				$plus_div.insertAfter(me);
				//添加加事件
				$plus_div_span.click(function(){
					add_new_tr(me, settings, null, true);
				});
			}
			//加载数据
			if(settings.datas){
				$.each(settings.datas,function(i, data){
					add_new_tr(me, settings, data, true);
				});
			}
			/*if(settings.width){
				$mulLine_table_div.css("width", settings.width);
			}else{
				if($mulLine_table_div.parent()[0].scrollWidth){
					$mulLine_table_div.css("width", $mulLine_table_div.parent()[0].scrollWidth);
        		}
			}*/
			
          
        }  
          
  
        /**   
         *  
         */  
        me.addRow = function(data){  
        	if(typeof(data) == "string" ){
        		add_new_tr(me, settings, jQuery.parseJSON(data), true);
        	}else if(typeof(data) == "object" ){
        		add_new_tr(me, settings, data, true);
        	}else{
        		add_new_tr(me, settings, null, true);
        	}
        }   
        
        
        /**   
         *  
         */  
        me.rowspan = function(index){  
        	return this.each(function(){   
        		var that = me;   
        		$('tr', this).each(function(row) {   
	        		$('td:eq('+index+')', this).filter(':visible').each(function(col) {   
	        			
	        			//console.log($(this).html()+" = "+$(that).html());
	        			
		        		if (that!=null && $(this).html() == $(that).html()) {  
		        			
			        		rowspan = $(that).attr("rowSpan");   
			        		if (rowspan == undefined) {   
				        		$(that).attr("rowSpan",1);   
				        		rowspan = $(that).attr("rowSpan"); 
			        		}   
			        		rowspan = Number(rowspan)+1;   
			        		$(that).attr("rowSpan",rowspan);   
			        		$(this).hide();   
		        		} else {   
		        			that = this;   
		        		}   
	        		});   
        		});   
           });   
       } 
       
        //自动执行初始化函数  
        me.init();  
          
        //返回函数对象  
        return this;  
    };  
})(jQuery);  
  