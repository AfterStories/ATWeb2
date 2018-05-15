
var protocol;
var sexinput ;
var username;
var PhoneNumber;
var fromValue;
var PhoneArea;
var wait=60;  
var extendCode;
var secondDomain = {};

$(document).ready(function(){


  var locationURL = 'https://weibo.com/CrushStories/home?leftnav=1'/*window.location.href;*/
  locationURL = locationURL.split(".")[0].split("//")[1];
  console.info(locationURL)
 


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



    $.ajax({
          type:'GET',
          data:{},       
          url: AjaxURL+'/AreTalkServer/Web/Api/getCommonTable.action',
          success:function(data) {

          for(item in data.data.promoterList){
              secondDomain[data.data.promoterList[item].secondDomain] = data.data.promoterList[item].extendCode
          }
            extendCode = secondDomain[locationURL];
           
            if(!extendCode){
              extendCode = null;
            }
             console.log(extendCode);
          },            
          
          error:function() {
                
          }   

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
                }
                  form.render(); //更新全部
            },
        error: function () {                  

      }                        
}); 




form.on('checkbox(protocol)', function(data){ 
  protocol = data.elem.checked;
});//勾选条款


form.on('submit(getCode)', function(data){
  GetCode(data.field.userName,data.field.phoneNo,data.field.countryId);
});  

form.on('submit(register)', function(data){
  fromValue = data.field;
   //当前容器的全部表单字段，名值对形式：{name: value}    
  register();
});




//表单验证
form.verify({

  agree: function(value, item){ //value：表单的值、item：表单的DOM对象

    if(!protocol){
      return ' 请您阅读后确认同意并勾选《服务条款》';
    }
  },
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }
    if ( /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value) ) {
       return '不允许使用中文';
    }    

  }
  
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{1,50}$/
    ,'不能出现空格'
  ] 

});  

      


function register(){

var IDcode = $("#IDcode").val();

fromValue.password = hex_md5(fromValue.password);
fromValue.userName = fromValue.userName.toLowerCase();
fromValue.phoneNo = fromValue.phoneNo.replace(/\b(0+)/gi,"");//去掉开头为0的
fromValue.extendCode = extendCode;
if (!fromValue.protocol) {
    alert("请您阅读后确认同意并勾选《服务条款》")
}
console.log(fromValue);


 $.ajax({                    
        type:'POST',
        data:fromValue,
        url: AjaxURL+'/AreTalkServer/Web/Login/register.action?userType=1',
        success:function(data) {
            if(data.data.status=="success"){          
              alert("success");
              window.location.href='index.html';
              
            }else{
              layer.msg('请重试',{time:1500});
            }

            },
        error: function () {                  
            
                }                        
        });

}






var checkInfoValid;
function GetCode(username,PhoneNumber,PhoneLocaltion){

      $.ajax({
          async:false,
              type:'POST',
              data:{userName:username,phoneNo:PhoneNumber,type:1},//type,T:0,stu:0
              url: AjaxURL+'/AreTalkServer/Web/Login/checkInfoValid.action',
              success:function(data) {
                  
                  if(data.data.status=="success"){
                    checkInfoValid = true;
                      
                      $.ajax({
                          async:false,                  
                          type:'POST',
                          data:{countryId:PhoneLocaltion,phoneNo:PhoneNumber,type:1},       
                          url: AjaxURL+'/AreTalkServer/Verify/sendPhoneNoVerifyCode.action',
                          success:function(data) {
                                if (data.data.status=="success") {
                                    time();
                                   layer.msg('正在发送验证码，请查收手机短信',{time:1500});
                                }
                              
                              },
                          error: function () {                  
            
                            }                        
                      }); 

                  }else if(data.data.status=="failed"){

                        if (data.data.item=="userName") {
                            layer.msg('用户名已被注册',{time:1500});
                        }else if(data.data.item=="phoneNo"){
                            layer.msg('手机号已注册',{time:1500});
                        }
                  }
                    

                  },
              error: function () {
              
              }                        
          }); 







}

function time(){
          if (wait == 0) { 
            $("#sendCode").removeAttr("disabled");           
            $("#sendCode").html("获取验证码");
            $("#sendCode").css("background-color", "#39b0ef"); 
            wait = 60;  
        } else {  
            $("#sendCode").attr("disabled", "true");  
            $("#sendCode").css("background-color", "#9da2a7"); 
            $("#sendCode").html("重新获取"+wait);  
            wait--;  
            setTimeout(function() {  
                time()  
            },  
            1000)  
        }  

}




});