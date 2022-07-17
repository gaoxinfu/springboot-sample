/**
 * 国华验证组件
 */

(function($) {   
	 $.validator.addMethod("validateManageCom", function(value, element) {
			if(value == ""){
				return true;
			}
			return this.optional(element) || $(element).ghAutoComplete("isValidate",value);
		}, "无效的机构编号");
	 $.validator.addMethod("nativeDigits", function(value, element) {
			return this.optional(element) || (/^\d+$/.test(value) && value > 0 );
		}, "请输入正整数");
	 $.validator.addMethod("maxLengthC", function(value, element , param) {
			return this.optional(element) || (getLength($.trim(value), element) <= param );
		}, "请输入长度不大于{0}的字符");
    $.validator.addMethod("isIdCardNo", function(value, element) { 
	    	return  this.optional(element) || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value)||/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/.test(value);
	    
	}, "请正确输入您的身份证号码");
  
    $.validator.addMethod("isMobile", function(value, element) {       
	    var length = value.length;   
	    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
	    return this.optional(element) || (length == 11 && mobile.test(value));       
	}, "请正确填写您的手机号码");
		   
    $.validator.addMethod("isRole", function(value, element) {       
	    var roleName = /^R_[a-zA-Z0-9)]{1,}$/;
	    return this.optional(element) || (roleName.test(value));       
	}, "角色名称必须以‘R_’为前缀");
    
    $.validator.addMethod("isEmail", function(value, element) {       
	    var roleName = /^[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+(\,[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+)*$/;
	    return this.optional(element) || (roleName.test(value));       
	}, "email只能是字母,数字,下划线.且必须有@和.同时格式要规范 ");
    
    $.validator.addMethod("isRole", function(value, element) {   
	    var roleName = /^R_[a-zA-Z]{1,}_([\u0391-\uFFE5]|[a-zA-Z0-9_]){1,}$/;
	    return this.optional(element) || (roleName.test(value));       
	}, "角色名称必须R_系统名称_为前缀");
    
	$.fn.ghValidator = function(options) {
		
		var opts = $.extend({}, $.fn.ghValidator.defaults, options); 
		
		return this.each(function() {    
			var $this = $(this);
			var o = $.meta ? $.extend({}, this.opts, $this.data()) : opts;  
			
			 $(this).validate(o);
		});
	}  
	
	$.fn.ghValidator.defaults = {
			errorPlacement: function(error, element) {
		          error.appendTo(element.parent());
			},
			errorLabelContainer: "#errormsg", 
			wrapper: 'span'      
		};   
	
})(jQuery);
//--------add by leilei解决中文长度问题-------------------------
String.prototype.lenChinese   =   function(){return   this.replace(/[^\x00-\xff]/g, "**").length;}
 function getLength (value, element) {
	switch (element.nodeName.toLowerCase()) {
	case 'select':
		return $("option:selected", element).lenChinese;
	case 'input':
		if (/radio|checkbox/i.test(element.type))
			return this.findByName(element.name)
					.filter(':checked').lenChinese;
	}
	return value.lenChinese;
}
 //--------add by leilei-------------------------