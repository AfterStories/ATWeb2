
$(document).ready(function(){ 

var Language = getCookie("Language");
if (Language) {
  console.log(Language);
}else{
  Language = "en";
}


layui.use(['layer', 'form'], function(){
  var layer = layui.layer;
  var form = layui.form;


form.verify({
  username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }

  }
 
  //我既支持了上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{1,50}$/
    ,'不能出现空格'
  ] 
});      



    form.on('submit(teacherlogin)', function(data){

    console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}


    var userName = data.field.userName;
    var password = hex_md5(data.field.password);

   

     $.ajax({
         type: "GET",
         async: false,
         url: AjaxURL+"/AreTalkServer/Web/Login/login.action",
         data: {userName:userName,password:password,userType:0},
         beforeSend: function(xhr) {
         xhr.withCredentials = true;
         },
         success: function (data) {

             var uid = userName.toLowerCase();
             CreateCookie('uid', uid, 30);
             CreateCookie(userName, userName, 30);
             CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);
    
         if(data.data.status=="success"){

             layer.msg("登陆成功",{time:1500});
             location.replace("../Teacher/admin/index.html?LoginedName="+userName);

         }else{
                layer.msg("用户名或密码错误，请重试");
              }                        
           
             },
         error: function (a,b,c) {
                layer.msg("网络超时，请重试");
              }
     });

         




        
});

});        
    $("header").load("lib/header/header.html",function(){


        if (Language) {
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});
            CreateCookie("Language", Language, 30);
        }else{
            Language = "en";
            console.log(Language);
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});
            CreateCookie("Language", Language, 30);
        }

        $('#LangChoose').change(function(){
            var curLang = $(this).children('option:selected').val();
            $("body").cloudLang({lang: curLang, file: "lib/lang/lang-resource.xml"});
            $("#langIcon").attr("src",'img/'+curLang+'.png')
            CreateCookie("Language", curLang, 30);

            event.stopPropagation(); //阻止向上冒泡

        });




$(".headerNav").mouseover(function(){
  $(this).find(".botterLine").addClass("activeLine");
});
$(".headerNav").mouseout(function(){
 $(this).find(".botterLine").removeClass("activeLine");
});



});



});


function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

}   
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}


        
