/**
 * @preserve jquery.GuoHuaLife.Component 1.0 beta1
 * $Date: 2010-12-01 $
 * $Rev: 1.05 $
 *
 * Copyright (c) 2010 
 *   Sam Xiao 
 *   Ebiz-interactive (http://www.ebiz-interactive.info/)
 */



/**
 * 自动完成组件
 * 
 * 
 */
// 创建一个闭包
(function($) {   
	$.fn.ghDatepicker = function(options) {
		
		var opts = $.extend({}, $.fn.ghDatepicker.defaults, options); 
		return this.each(function() {    
			var $this = $(this);
			var o = $.meta ? $.extend({}, this.opts, $this.data()) : opts;   
			if(o.time == true){
				$(this).datetimepicker(o);
			}else {
				$(this).datepicker(o);
			}
			this.readOnly = "readOnly";
			$(this).keydown(function(e){
		        if (e.keyCode == 46 || e.keyCode == 8) {//8退格键,46delete键
		            //Delete and backspace clear text 
		            $(this).val(''); //Clear text
		            $(this).datepicker("hide"); //Hide the datepicker calendar if displayed
		            $(this).blur(); //aka "unfocus"
		        }
		
		        //Prevent user from manually entering in a date - have to use the datepicker box
		        e.preventDefault();//取消默认的事件

	    	});
		});
	}  
	$.fn.ghDatepicker.defaults = { 
		time: false,
		showSecond: false,
		showMillisec: false, 
		dateFormat: "yy-mm-dd",
		prevText: "上月", 
		nextText: "下月",
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		dayNames: ['日', '一', '二', '三', '四', '五', '六'],
		monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		timeText: '时间',
		hourText: '小时',
        minuteText: '分钟',
        secondText: '秒',
		currentText: '今天',
		closeText: '关闭',
		changeMonth: true,
		changeYear: true,
		showOn: "button",
		buttonImage: "../../skin/default/css/images/calendar.gif",
		buttonImageOnly: true,
		yearRange: '-100:+10'
	};   
	
})(jQuery);