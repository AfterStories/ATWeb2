var protocol;
var PhoneNumber;
var fromValue;
var PhoneArea;
var wait=60;  
var userToken
$(document).ready(function(){

    var Language = getCookie("Language");

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





});//ready结束



//回到顶端
function backToTop() {  
    $('html,body').animate({  
        scrollTop: 0  
    }, 1000);  
}  

$(window).on('scroll', function () {/*当滚动条的垂直位置大于浏览器所能看到的页面的那部分的高度时，回到顶部按钮就显示 */  
    if ($(window).scrollTop() > $(window).height())  
        $("#TopButton").fadeIn();  
    else  
        $("#TopButton").fadeOut();  
});  
$(window).trigger('scroll');/*触发滚动事件，避免刷新的时候显示回到顶部按钮*/  



layui.use(['layer', 'form','laydate'], function(){

    var layer = layui.layer;
    var form = layui.form;


//获取电话区号
$.ajax({                    
        type:'GET',
        data:{},       
        url: AjaxURL+'/AreTalkServer/Verify/getCountryAreacode.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.areacode.length; i++) {
               var areacode = '<option value="'+data.data.areacode[i].countryId+'">'+data.data.areacode[i].countryName+' +'+data.data.areacode[i].areaCode+'</option>';
               $('#PhoneNmuAre').append(areacode);  

                  var form = layui.form;
                  form.render();
                  //更新全部
                }
            },
        error: function () {                  

      }                        
}); 


form.on('checkbox(protocol)', function(data){ 
  protocol = data.elem.checked;
});//勾选条款



form.on('submit(GetCode)', function(data){
  fromValue = data.field;

if (!fromValue.protocol) {
    alert("请您阅读后确认同意并勾选《服务条款》")
    return;
}

  fromValue.phoneNo = fromValue.phone.replace(/\b(0+)/gi,"");//去掉开头为0的
  GetCode(fromValue.countryId,fromValue.phoneNo);

});



form.on('submit(subBtn)', function(data){

  var verifyCode = data.field.verifyCode;

  if (verifyCode==""){
    alert("请填写手机短信验证码！")
    return;
  }


       $.ajax({//检查验证码是否正确
          async:false,
              type:'POST',
              data:{verifyCode:verifyCode,phoneNo:data.field.phone}, 
              url: AjaxURL+'/AreTalkServer/Verify/verifyCodeMotifyPassword.action',
              success:function(data) {
                 
              userToken = data.data.token
              $("#registerForm").hide(300);
              $("#resetForm").show(500);

                  },
              error: function () {
              
              }                        
          });



    
});

form.on('submit(newpasswordsubBtn)', function(data){

var newpassword = hex_md5(data.field.newpassword);

       $.ajax({//重置密码
          async:false,
              type:'POST',
              data:{password:newpassword,userToken:userToken},
              url: AjaxURL+'/AreTalkServer/Verify/motifyPassword.action',
              success:function(data) {
                 if (data.data.status == "success") {
                  alert("设置成功,请返回重新登录")
                  console.log(newpassword)
                  console.log(userToken)
                  

                  //window.location.href = "index.html"
                 }
                  
                  

                  },
              error: function () {
              
              }                        
          });



    
});



//表单验证
form.verify({

  agree: function(value, item){ //value：表单的值、item：表单的DOM对象

    if(!protocol){
      return ' 请您阅读后确认同意并勾选《服务条款》Please check the terms of service.';
    }
  },
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符 The username does not have a special character';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }
    if ( !/^[u4E00-u9FA5]+$/.test(value) ) {
       return '不允许使用中文';
    }    

  }
  
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{1,50}$/
    ,'不能出现空格 No space can be found'
  ] 

});  

      

});


function time(){

          if (wait == 0) { 
            $("#GetCode").removeAttr("disabled");           
            $("#GetCode").html("获取验证码");
            $("#GetCode").css("background-color", "#009688"); 
            wait = 60;  
        } else {  
            $("#GetCode").attr("disabled", "true");  
            $("#GetCode").css("background-color", "#9da2a7"); 
            $("#GetCode").html("重新发送"+ wait);  
            wait--;  
            setTimeout(function() {  
                time()  
            },  
            1000)  
        }  

}


function GetCode(countryId,PhoneNumber){

      $.ajax({
          async:false,
              type:'POST',
              data:{countryId:countryId,phoneNo:PhoneNumber,type:0},       
              url: AjaxURL+'/AreTalkServer/Verify/findPassword.action',
              success:function(data) {
                 
                  if(data.data.status=="success"){
                      
                      time()                                
                      layer.msg('正在发送验证码，请查收手机短信',{time:1500});
                      console.log('正在发送验证码，请查收手机短信')

                  }else if(data.data.status=="failed"){
                         console.log(data.data.status)
                          layer.msg('error,please try again',{time:1500});
                  }
                    

                  },
              error: function () {
                  layer.msg('error,please try again',{time:1500});
              }
          });
           

}