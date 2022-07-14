/*
 * id：要使用Auto Complete控件的ID
 * displayId：用来显示信息的ID
 * result：请求的路径/界面加载时传入的下拉列表内的数据
 * isCache：true使用下拉列表数据，false每次查询时请求的url
 * dropDownWidth: 下拉框的宽度
 */
var MyAutoComplete = {
		
		getAutoComplete : function(id, displayId, result, isCache, dropDownWidth){
	
			if(isCache){
				
				$("#"+id).autocomplete(result, {
					minChars: 0,
					width: dropDownWidth,
					//scrollHeight: 100,
					formatItem: function(row, i, max) {
						return row.label + "-" + row.value;
					},
					formatMatch: function(row, i, max) {
						return row.label + "-" + row.value;
					},
					formatResult: function(row) {
						return row.label;
					}
				}).result(function(event, data, formatted) {
					$("#"+displayId).val(data.value);
				}).click(function(event, data, formatted){
					$("#"+displayId).val("");
				});
	
			}else{
				
				$("#"+id).autocomplete(result, {
					minChars: 0,
					width: dropDownWidth,
					//scrollHeight: 100,
					dataType: "json",
					parse: function(data) {
						return $.map(data, function(row) {
							return {
								data: row,
								value: row.value,
								result: row.label
							}
						});
					},
					formatItem: function(row, i, max) {
						return row.label + "-" + row.value;
					},
					formatMatch: function(row, i, max) {
						return row.label + "-" + row.value;
					},
					formatResult: function(row) {
						return row.label;
					}
				}).result(function(event, data, formatted) {
					$("#"+displayId).val(data.value);
				}).click(function(event, data, formatted){
					$("#"+displayId).val("");
				});
				
			}
		}
		
}