/**
 * @preserve jquery.GuoHuaLife.Component 1.0 beta1
 * $Date: 2010-12-01 $
 * $Rev: 1.05 $
 *
 * Copyright (c) 2010 
 *   Sam Xiao 
 *   Ebiz-interactive (http://www.ebiz-interactive.info/)
 */

(function($) { 
	$.ghBlockUI  = {
		message: "请求处理中，请稍候.",
		
		active: function(){
			$.blockUI({ 
				message: $.ghBlockUI.message,
				showOverlay: true, 
				css: { 
					border: 'none', 
					padding: '15px', 
					backgroundColor: '#000', 
					'-webkit-border-radius': '10px', 
					'-moz-border-radius': '10px', 
					color: '#fff' 
				},
				overlayCSS:  {
					backgroundColor: '#b3b3b3'
				}
			})
		},
			
		inactive: function(){
			$.unblockUI();
		},
		
		setMessage: function(msg){
			$.ghBlockUI.message = msg;
		}
	}
})(jQuery);  