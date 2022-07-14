/**
 * @preserve jquery.GuoHuaLife.Component 1.0 beta1
 * $Date: 2010-12-01 $
 * $Rev: 1.05 $
 *
 * Copyright (c) 2010 
 *   
 * Ebiz-interactive (http://www.ebiz-interactive.info/)
 */

/**
 * 国华公共js组件
 *
 * 
 */
(function($) { 
	$.ghHash = {
	    set: function(id, obj) {
	    	this[id] = obj;
		},
	
		get: function(id) {
			return this[id];
		}
	}
})(jQuery); 