var NewBlockUI = {

	active: function(){
	    var url= "../skin/internet/css/images/loading.gif";
		$.blockUI({
			message: "<img  src=\'"+url+"\'/>",
			showOverlay: true, 
			css: { 
	            border: 'none', 
	            backgroundColor: '#FFFFFF',
	            cursor: 'wait'
	        },
	        overlayCSS:  {	
        		backgroundColor: '#FFFFFF',
        		opacity: 0
            }
		})
	},
		
	inactive: function(){
		$.unblockUI();
	}
}