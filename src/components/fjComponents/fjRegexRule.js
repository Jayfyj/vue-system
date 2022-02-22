var regexRule ={

    //1.用户名正则 4到16位（字母，数字，下划线，减号）
    REX_USER_ID:/^[a-zA-Z0-9_-]{4,16}$/,
  
    //2.密码强度正则 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    REX_PASSWORD_STRONG:/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
  
    //3.整数正则
    REX_INTEGER:/^\d+$/,
    
    //4.数字正则 可以是整数也可以是浮点数
    REX_NUMBER:/^\d*\.?\d+$/,
  
    //5.Email正则
    REX_EMAIL:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  
    //6.手机号码正则
    REX_PHONE: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
  
    //7.身份证号正则
    REX_ID:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  
    //8.URL正则
    REX_URL:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  
    //9.十六进制颜色正则
    REX_COLOR:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  
    //10.日期正则 带横杠的
    REX_DATE:/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
  
    //11.QQ号正则，5至11位
    REX_QQ:/^[1-9][0-9]{4,10}$/,
  
    //12.微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
    REX_WX:/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
  
    //13.车牌号正则
    REX_CARNUM:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  
    //14.包含中文正则
    REX_CHINSES:/[\u4E00-\u9FA5]/,
  
    //15.判断中文姓名(1到10个字)
    REX_REX_CHINSES: /^[\u4e00-\u9fa5]{1,10}$/,
  
    //16.判断英文姓名(1到30个字)
    REX_REX_ENGLISHNAME: /^[a-zA-Z]{1,30}$/,
  
    //17.判断（一个正数，最多两个小数点）
    REX_INTEGER_ONE_POINT_TWO: /(^([1-9]|0)$|^([1-9]|0)\.\d{1,2}$)/,
  
    //18.判断（最多三个正数，最多五个小数点）
    REX_INTEGER_THREE_POINT_FIVE: /(^([1-9]\d{0,2}|0)$|^([1-9]\d{0,2}|0)\.\d{1,5}$)/,
  
    //19.判断（最多四个正数，最多两个小数点）
    REX_INTEGER_FOUR_POINT_TWO: /(^([1-9]\d{0,3}|0)$|^([1-9]\d{0,3}|0)\.\d{1,2}$)/,
  
    //20.正数和小数，无限制
    REX_INTEGER_POINT: /(^([1-9]\d*|0)$|^([1-9]\d*|0)\.\d+$)/,
  
    //21.判断小数点后面都是零
    REX_PONIT_ZERO: /(^([1-9]\d*|0)\.0+$)/,
  
  }
  
// //验证手机号码
// var checkTelephone = (rule, value, callback) => {
//     var str = value;
//     if (str == "") {
//         callback(new Error("请输入手机号码"));
//     } else if (!regexRule.REX_PHONE.test(str)) {
//         callback(new Error("请输入正确手机号码"));
//     } else {
//         callback()
//     }
// };


//验证名字
var checkName = (errorMessage)=>{
    return(rule, value, callback) => {
        errorMessage = errorMessage || "请输入正确的姓名"
        var str = value;
        if (str == "") {
            callback(new Error("请输入姓名"));
        } else 
        if (!regexRule.REX_REX_CHINSES.test(str) && !regexRule.REX_REX_ENGLISHNAME.test(str)) {
            callback(new Error(errorMessage));
        } else {
            callback()
        }
    }
};

// //验证手机号码
var checkTelephone = (errorMessage) =>{ 
    return(rule, value, callback) => {
        errorMessage = errorMessage || "请输入正确的电话号码"
        var str = value;
        if (str == "") {
            callback(new Error("请输入电话号码"));
        } else if (!regexRule.REX_PHONE.test(str)) {
            callback(new Error(errorMessage));
        } else {
            callback()
        }
    }
};

//验证身份证
var checkiDentifyNumber  = (errorMessage) =>{ 
    return(rule, value, callback) => {
        errorMessage = errorMessage || "请输入正确证件号码";
        var str = value;

        if (str == "") {
            callback(new Error("请输入证件号码"));
        } else {
            let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
            //如果通过该验证，说明身份证格式正确，但准确性还需计算
            if (regIdCard.test(value)) {
                if (value.length == 18) {
                    var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                    var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                    var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                    for (var i = 0; i < 17; i++) {
                        idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
                    }
                    var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
                    var idCardLast = value.substring(17); //得到最后一位身份证号码
                    //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                    if (idCardMod == 2) {
                        if (idCardLast == "X" || idCardLast == "x") {
                            callback()
                        } else {
                            callback(new Error(errorMessage));
                        }
                    } else {
                        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                        if (idCardLast == idCardY[idCardMod]) {
                            callback()
                        } else {
                            callback(new Error(errorMessage));
                        }
                    }
                }
            } else {
                return callback(new Error(errorMessage))
            }

        }
    }
};

//整数
var checkInt  = (errorMessage) =>{ 
    return(rule, value, callback) => {
        // errorMessage = errorMessage || "请输入正确证件号码";
        var str = value;
        // console.log(regexRule.pointZero.test(str))
        if (str == "") {
            callback("请输入整数");
        } else if (value != undefined) {
            if (!regexRule.REX_INTEGER.test(str)) {
                callback(new Error("errorMessage"));
            } else {
                callback()
            }
        } else {
            callback();
        }
    }
};

export default {
    regexRule,
    checkName,
    checkTelephone,
    checkiDentifyNumber,

    checkInt
}