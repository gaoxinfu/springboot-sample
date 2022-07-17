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
	$.fn.ghTree = function(options) {
		
		var opts = $.extend({}, $.fn.ghTree.defaults, options); 
		this.each(function() {    
			var $this = $(this);
			var o = $.meta ? $.extend({}, this.opts, $this.data()) : opts;   
			$this.jstree(o);
		});
		$(".treeNodeParent").live("click",function(){
			var tree = $(this).parents().find(".treeDiv");
			if(tree.jstree("is_open",this)){
				tree.jstree("close_node",this);
			}else{
				tree.jstree("open_node",this);
			}
		});
		$($(this)[0]).jstree("set_focus");
		return ;
	}  
	$.fn.ghTree.defaults = {
		"plugins" : [ "themes", "html_data"]
	};   
	
})(jQuery);