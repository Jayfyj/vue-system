
// //获取SessionId
// function getSessionId(cookieName) {
//     // var c_name = 'JSESSIONID';
//     // if (document.cookie.length > 0) {
//     //     c_start = document.cookie.indexOf(c_name + "=")
//     //     if (c_start != -1) {
//     //         c_start = c_start + c_name.length + 1
//     //         c_end = document.cookie.indexOf(";", c_start)
//     //         if (c_end == -1) c_end = document.cookie.length
//     //         return unescape(document.cookie.substring(c_start, c_end));
//     //     }
//     // }
//     var strCookie = document.cookie;
//     var arrCookie = strCookie.split("; ");
//     for (var i = 0; i < arrCookie.length; i++) {
//         var arr = arrCookie[i].split("=");
//         if (cookieName == arr[0]) {
//             return arr[1];
//         }
//     }
//     return "";
// }



// //获取路由链接的参数的值
// function getUrlParam(name,testUrl) {
//     if(testUrl!=""&&testUrl!=null&&testUrl!=undefined){
//         var url = testUrl
//     }else{
//         var url = location.href
//     }
//     // console.log(url)
//     return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) ||
//         null
// }


// var common = {};
// common.install = function(Vue, options) {
//     Vue.prototype.$getSessionId = getSessionId;
//     Vue.prototype.$getUrlParam = getUrlParam

// };
// export {
//     common
// }