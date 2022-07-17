
$(function(){ 
if($.browser.msie&&$.browser.version=="6.0"&&$("html")[0].scrollHeight>$("html").height()) $("html").css("overflowY","scroll"); 
}); 
		
		$(".page-title").live("click",function(){
			var img = $(this).find("img");
			if($(img).attr("src").indexOf("open")>-1){
				$(this).parent().next().show("blind");
				$(img).attr("src",$(img).attr("src").replace("open","close"));
			}else{
				$(this).parent().next().hide("blind");
				$(img).attr("src",$(img).attr("src").replace("close","open"));
			}
			
		});