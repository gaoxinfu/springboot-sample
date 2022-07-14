/**
 * @preserve jquery.GuoHuaLife.Component 1.0 beta1
 * $Date: 2011-06-27 $
 * $Rev: 1.05 $
 *
 * Copyright (c) 2011 
 *   wang jianhua 
 *   Ebiz-interactive (http://www.ebiz-interactive.info/)
 */


/**
 * 表格控件
 */
// 创建一个闭包

(function($) {   
	$.fn.ghGrid = function(options) {
		
		var opts = $.extend({}, $.fn.ghGrid.defaults, options); 
		
		return this.each(function() {
			
			var o = $.meta ? $.extend({}, this.opts, $this.data()) : opts;   
			
			var myJqGrid = $(this).jqGrid(o);
			
			if(o.autoAdjust)
			{
			 $.fn.ghGrid.autoAdjust(myJqGrid,o.adjustTarget,o.adjustWidth,o.shrinkToFit);
			}
			
		});
		
	},  
	$.fn.ghGrid.defaults = { 
			datatype: "local", 
			height: 'auto',
			shrinkToFit : false,
			viewrecords : false,
			autowidth:false,
			multiselect: false,
			autoAdjust:false,
			adjustTarget:null,
			adjustWidth:0
	},
	$.fn.ghGrid.autoAdjust = function(source,adjustTarget,adjustWidth,shrinkToFit)
	{
		source.jqGrid('setAdjustGridWidth',source,adjustTarget,adjustWidth,shrinkToFit);
		
		setTimeout(function () {$.fn.ghGrid.autoAdjust(source,adjustTarget,adjustWidth,shrinkToFit);}, 10);
	};   
	
})(jQuery);