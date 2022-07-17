/**
 * 非空校验
 */
function emptyCheck(id,errTip){
	var value=$('#'+id).val();
    if(value!=null){
    	value = $.trim(value);
    }
	if(value==""){
		common.showMsgDialog(errTip);
		return false;
	}
	return true;
}

/**
 * 电子邮箱格式校验
 */
function checkEmail(id,errTip){
	var value=$('#'+id).val();
	//var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!reg.test(value)){
    	common.showMsgDialog(errTip);
    	return false;
    }else{
    	return true;
    }
}

/**
 * 身份证生日性别校验
 */
function sexBirth(id,errTip1,errTip2,date,sex){
    // 非空
    var errTip2_1='证件号码不能为空';
    // 格式
    var errTip2_2='身份证格式错误';
	if(idNoCheck(id,errTip1)){
		var val=$('#'+id).val();
    	 var idYear = val.substr(6,4);
		 var idMonth = val.substr(10,2);
		 var idDay = val.substr(12,2);
		 $('#'+date).val(idYear+'-'+idMonth+'-'+idDay);
		 var idSex = (parseInt(val.substr(16,1))+1)%2;
		 $('#'+sex).val(idSex);		 
		 return true;
	}else{
		return false;
	}
}

/**
 * 姓名中文校验
 */
function checkName(id,errTip){
	var value=$('#'+id).val();
	var reg = /^[\u4e00-\u9fa5]+$/ ;
    if(!reg.test(value)){
    	common.showMsgDialog(errTip);
    	return false;
    }else{
    	return true;
    }
}

/**
 * 身份证校验
 */
var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
        21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
        33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
        42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
        51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
        63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
       };  

function idNoCheck(id,errTip){ 
var card = $('#'+id).val();
if(card!=null){
	card = $.trim(card).toUpperCase();
}
//是否为空  
if(card === '')  
{   
	common.showMsgDialog('身份证号不能为空');
    return false;  
}  
//校验长度，类型  
if(isCardNo(card) === false)  
{  
	common.showMsgDialog(errTip);
    return false;  
}  
//检查省份  
if(checkProvince(card) === false)  
{   
	common.showMsgDialog(errTip); 
    return false;  
}  
//校验生日  
if(checkBirthday(card) === false)  
{   
    common.showMsgDialog(errTip);  
    return false;  
}  
//检验位的检测  
if(checkParity(card) === false)  
{  
	common.showMsgDialog(errTip);  
    return false;  
}   
return true;  
};  


//检查号码是否符合规范，包括长度，类型  
isCardNo = function(card)  
{  
//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
var reg = /(^\d{17}(\d|X)$)/;  
if(reg.test(card) === false)  
{  
    return false;  
}  

return true;  
};  

//取身份证前两位,校验省份  
checkProvince = function(card)  
{  
var province = card.substr(0,2);  
if(vcity[province] == undefined)  
{  
    return false;  
}  
return true;  
};  

//检查生日是否正确  
checkBirthday = function(card)  
{  
var len = card.length;  
//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
if(len == '15')  
{  
    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;   
    var arr_data = card.match(re_fifteen);  
    var year = arr_data[2];  
    var month = arr_data[3];  
    var day = arr_data[4];  
    var birthday = new Date('19'+year+'/'+month+'/'+day);  
    return verifyBirthday('19'+year,month,day,birthday);  
}  
//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
if(len == '18')  
{  
    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;  
    var arr_data = card.match(re_eighteen);  
    var year = arr_data[2];  
    var month = arr_data[3];  
    var day = arr_data[4];  
    var birthday = new Date(year+'/'+month+'/'+day);  
    return verifyBirthday(year,month,day,birthday);  
}  
return false;  
};  

//校验日期  
verifyBirthday = function(year,month,day,birthday)  
{  
var now = new Date();  
var now_year = now.getFullYear();  
//年月日是否合理  
if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)  
{  
    //判断年份的范围（0岁到100岁之间)  
    var time = now_year - year;  
    if(time >= 0 && time <= 100)  
    {  
        return true;  
    }  
    return false;  
}  
return false;  
};  

//校验位的检测  
checkParity = function(card)  
{  
//15位转18位  
//card = changeFivteenToEighteen(card);  
var len = card.length;  
if(len == '18')  
{  
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
    var cardTemp = 0, i, valnum;   
    for(i = 0; i < 17; i ++)   
    {   
        cardTemp += card.substr(i, 1) * arrInt[i];   
    }   
    valnum = arrCh[cardTemp % 11];   
    if (valnum == card.substr(17, 1))   
    {  
        return true;  
    }  
    return false;  
}  
return false;  
};  


/**
 * 年龄区间
 */
function checkAge(id,errTip){
	var val=$('#'+id).val();
	var productCode=$('#productCode').val();
	var columnCode = id.split("_")[0];
    var idYear = val.substr(6,4);
    var idMonth = val.substr(10,2);
    var idDay = val.substr(12,2);
    var date = idYear+'-'+idMonth+'-'+idDay;
	var b = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	var d = new Date();
    var nowYear = d.getFullYear();
			var month = b[3] * 1;
			var day = b[4] * 1;
			var nowY = d.getFullYear();
			var str=nowY
			+ '-' + (d.getMonth() + 1) + '-'
			+ d.getDate();
			var age = nowY - b[1];
			if (d.getMonth() + 1 < month) {
				age--;
			} else if (d.getMonth() + 1 == month
					&& d.getDate() < day) {
				age--;
			}
			var d1=new Date(Date.parse(date.replace(/-/g, "/")));
			var d2=new Date(Date.parse(str.replace(/-/g, "/")));
			var dayNum = (d2.getTime()-d1.getTime())/(1000*3600*24) + 1;
			if (dayNum <= 28) {
			age--;
			}
if(columnCode=='appntColumn'){
	if(productCode=="2"){
		if(age<18||age>65)
		{
			common.showMsgDialog(errTip);
			//$('#appMsg').html("<em>!</em>您的年龄必须在18周岁至65周岁之间");
			return false;
		}
	
	} else if (productCode=="49"||productCode=="147"||productCode=="148"||productCode=="168"||productCode=="169"){
		if(age<18||age>50)
		{
			common.showMsgDialog(errTip);
			//$('#appMsg').html("<em>!</em>您的年龄必须在18周岁至50周岁之间");
			return false;
		}
	} else if (productCode=="151"||productCode=="152"){
		if(age<20||age>50)
		{
			common.showMsgDialog(errTip);
			//$('#appMsg').html("<em>!</em>您的年龄必须在20周岁至50周岁之间");
			return false;
		}
	}else
	{
		if(age<18||age>70)
		{
			common.showMsgDialog(errTip);
			//$('#appMsg').html("<em>!</em>您的年龄必须在18周岁至70周岁之间");
			return false;
		}
	}
}else if(columnCode=='insuredColumn'){
	if (productCode=="55"){
		if(age<0||age>12)
		{
			common.showMsgDialog(errTip);
			//$('#appMsg').html("<em>!</em>被保人年龄必须在28天至12周岁之间");
			return false;
		}
	}else if (productCode=="151"||productCode=="152"){
		if(age<0||age>17)
		{
			common.showMsgDialog(errTip);
			//$('#appMsg').html("<em>!</em>被保人年龄必须在28天至17周岁之间");
			return false;
		}
	}
}

	return true;
}

/**
 * 性别校验
 */
function sexCheck(id,errTip1,errTip2){
	var flag0=$("input[type='radio'][value='0']").attr("checked");
	var flag1=$("input[type='radio'][value='1']").attr("checked");
	if(!flag0 && !flag1){
			$('#errappmsg').css('display', '');
		  $('#appMsg').html("<em>!</em>"+errTip1+"");
		return false;
	}
	var value;
	var idNo = $('#idNo').val();
	var idSex = (parseInt(idNo.substr(16,1))+1)%2;
	if(flag0){
		value = $('#sex0').val();
	}else{
		value = $('#sex1').val();
	}
	var sex = parseInt(value);
	if(sex!=idSex){
			$('#errappmsg').css('display', '');
		  $('#appMsg').html("<em>!</em>"+errTip2+"");
	    return false;
	}
	return true;
}

/**
 * 生日校验
 */
function birthCheck(id,errTip1,errTip2,errTip3,param1,param2){
	var value = $('#'+id).val();
    value = $.trim(value);
	if(value==""){
		$('#errappmsg').css('display', '');
		$('#appMsg').html("<em>!</em>"+errTip1+"");
		return false;
	}
	 var idNo = $('#idNo').val();
	 if (idNo.length != 18){
	 	$('#errappmsg').css('display', '');
		$('#appMsg').html("<em>!</em>身份证格式错误!");
        return false;
     }
	 var idYear = parseInt(idNo.substr(6,4));
	 var idMonth = parseInt(idNo.substr(10,2));
	 var idDay = parseInt(idNo.substr(12,2));
	 var birthStr = parseInt(value.split('-')[0]);
	 var monthStr = parseInt(value.split('-')[1]);
	 var dayStr = parseInt(value.split('-')[2]);
	 if(idYear!=birthStr || idMonth!=monthStr || idDay!=dayStr){
	 	$('#errappmsg').css('display', '');
		$('#appMsg').html("<em>!</em>"+errTip2+"");
		return false;
	 }

     return true;
}

/**
 * 地址长度校验
 */
function addrDetailCheck(id){
	var value = $('#'+id).val();
	value=value.replace(/[^\u4e00-\u9fa5]/gi,""); 
	if(value.length<8){
		common.showMsgDialog("地址长度不能少于8个汉字!");
		return false;
	}
	return true;
}

/**
 * 移动电话长度校验
 */
function checkMobile(id) {
	var value=$('#'+id).val();
	if(value.length==11){
		return true;
	}else{
		common.showMsgDialog("移动电话长度不符");
		return false;
	}
}

/**
 * 手机号码校验
 */
function checkMobile(id){
	var value = $('#'+id).val();
    value = $.trim(value);
   var reg=/^(13|15|18|14|17)\d{9}$/;
    if(!reg.test(value)){
		common.showMsgDialog("请输入合法的手机号码");
		return false;
	}else{
		return true;
	}
}