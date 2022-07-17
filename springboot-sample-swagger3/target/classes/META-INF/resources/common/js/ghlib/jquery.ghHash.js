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
 * 国华hash组件
 *
 * 
 */
var GhHash = {
    set: function(id, obj) {
    	this[id] = obj;
	},

	get: function(id) {
		return this[id];
	}
}