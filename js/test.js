var protocol;
var username;
var PhoneNumber;
var fromValue;
var PhoneArea;
var secondDomain = {};

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

//国籍
  $.ajax({
        type:'GET',
        data:{},       
        url: AjaxURL+'/AreTalkServer/Api/AreTalk/getCountryInfo.action',
        success:function(data) {
              for (var i = 0;i<data.data.countryInfo.length; i++) {
               var countryInfo = '<option value="'+data.data.countryInfo[i].countryId+'">'+data.data.countryInfo[i].countryNameSelf+'</option>';
               $('#motherlandId').append(countryInfo);
               $('#LivelandId').append(countryInfo);

                  var form = layui.form;
                  form.render();
                }
            },
        error: function () {
      }                        
}); 



form.on('checkbox(protocol)', function(data){ 
  protocol = data.elem.checked;
});//勾选条款



form.on('submit(subBtn)', function(data){
  fromValue = data.field;
   //当前容器的全部表单字段，名值对形式：{name: value}    
    console.log(fromValue)
     submit()
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



function submit(){

fromValue.phone = fromValue.phone.replace(/\b(0+)/gi,"");//去掉开头为0的
/*
if (!fromValue.protocol) {
    alert("请您阅读后确认同意并勾选《服务条款》")
    return;
}*/
console.log(fromValue);


$.ajax({
        type:'POST',
        data:fromValue,
        url: AjaxURL+'',
        success:function(data) {
            if(data.data.status=="success"){
              alert("Success，Please wait for the AreTalk teacher to contact you");              
            }else{
              layer.msg('error',{time:1500});
            }

            },
        error: function () {                  
              layer.msg('error',{time:1500});
                }                        
});

};




});