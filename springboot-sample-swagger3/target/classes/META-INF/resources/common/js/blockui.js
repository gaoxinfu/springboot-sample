var BlockUI = {

	active: function(){
		$.blockUI({ 
			message: "<h3>正在执行本次操作，请稍候.</h3>",
			showOverlay: true, 
			css: { 
	            border: 'none', 
	            padding: '15px', 
	            backgroundColor: '#000', 
	            '-webkit-border-radius': '10px', 
	            '-moz-border-radius': '10px', 
	            opacity: 0.5, 
	            color: '#fff',
	            cursor: 'wait'
	        },
	        overlayCSS:  {	
        		backgroundColor: '#000',         
        		opacity: 0 
        }
		})
	},
		
	inactive: function(){
		$.unblockUI();
	}
}