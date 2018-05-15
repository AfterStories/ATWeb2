var wait=60;  


var username;
var PhoneNumber;
var fromValue;
var PhoneArea;
var teacherHeadImgId
var Sessionid;

layui.use(['layer', 'form','laydate'], function(){

  var layer = layui.layer;
  var form = layui.form;
  var laydate = layui.laydate;
  var start = {istoday: false};


form.verify({
  username: function(value, item){ //
    //value：表单的值、item：表单的DOM对象
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
  

  ,pass: [
    /^[\S]{1,50}$/
    ,'不能出现空格'
  ] 
}); 

  
  //执行一个laydate实例
  laydate.render({
    elem: '#Tbirthday' //指定元素
  });

form.on('submit(sendFrom)', function(data){

//  console.log(data.field) ;当前容器的全部表单字段，名值对形式：{name: value}
  fromValue = data.field;

    var KnowLang = [];var level= [];
    $(".KnowLang").each(function(index, obj) {
      KnowLang.push(
        $(this).children("option:selected").val()
      );

      level.push(
        $(this).parents(".addBox").find("select:last").children("option:selected").val()
      );

})
    var WhereFrom =  fromValue.fromcity+fromValue.fromdetail;
    var WhereLive =  fromValue.livecity+fromValue.livedetail;

    fromValue.KnowLangArry = KnowLang;
    fromValue.levelArry = level;
    fromValue.WhereFrom = WhereFrom;
    fromValue.WhereLive = WhereLive;

    fromValue.password = hex_md5(fromValue.Tpassword);
    fromValue.userName = fromValue.userName.toLowerCase();
    fromValue.phoneNo = fromValue.phoneNo.replace(/\b(0+)/gi,"");


/*  delete fromValue["files[]"]; 
  delete fromValue["livecity"]; 
  delete fromValue["livedetail"];
  delete fromValue["fromcity"];
  delete fromValue["fromdetail"];*/


console.log(fromValue)

teacherHeadImgId = $(".col-lg-7").attr("value");

  if (teacherHeadImgId) {

    if (fromValue.countryId) {}
     register()

   
  }else{
    alert("没有上传头像");
    return; 
  }



});


var i =2;
$("#addKnowLang").click(function(){
var addUseLang = '<div class="addBox"><div class="layui-inline"><label class="layui-form-label">掌握语言</label><div class="layui-input-inline input-short"><select class="KnowLang" name="KnowLang'+i+'" lay-verify="required"><option value="">请选择你掌握语言</option><option value="1">英语</option><option value="2">汉语</option><option value="3">日语</option></select></div></div><div class="layui-inline input-right"><label class="layui-form-label">等级</label><div class="layui-input-inline input-short"><select class="KnowLangLv" name="KnowLangLv'+i+'" lay-verify="required"><option value="">请选择</option><option value="1">初级</option><option value="2">中级</option><option value="3">高级</option></select></div></div><img class="clearLang" src="images/jian.png" /></div>';
 $("#KnowLangFrom").append(addUseLang);
 form.render();
  i = i+1;

 $(".clearLang").click(function(){
 $(this).parent().remove();
 form.render();
 i =i-1;
 })

})

var j = 2;
$("#addTeachUseLang").click(function(){
var addTeachUseLang = '<div class="addBox"><div class="layui-inline"><label class="layui-form-label">语言课程</label><div class="layui-input-inline input-short"><select class="lessonLang" name="lessonLang'+j+'" lay-verify="required"><option value="">请选择你掌握语言</option><option value="1">英语</option><option value="2">汉语</option><option value="3">日语</option></select></div></div><div class="layui-inline input-right"><label class="layui-form-label">使用语言</label><div class="layui-input-inline input-short"><select name="UseLang" name="UseLang'+j+'" lay-verify="required"><option value="">请选择</option><option value="1">英语</option><option value="2">汉语</option><option value="3">日语</option></select></div></div><img class="clearLang" src="images/jian.png" /></div>';
 $("#baseInfoFromuse").append(addTeachUseLang);
 form.render();
j =j+1

 $(".clearLang").click(function(){
 $(this).parent().remove();
 form.render();
 j = j-1;
})


})










$(document).ready(function(){ 

  var Language = getCookie("Language");
if (Language) {
  console.log(Language)
}else{
  Language = "en"
}



$("#header").load("lib/header/header.html",function(){
    

    $("header").load("lib/header/header.html",function(){
        $("#homeBtn").find(".botterLine").addClass("curpage");

        if (Language) {
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});
            CreateCookie("Language", Language, 30);
        }else{
            Language = "en";
            console.log(Language);
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});
            CreateCookie("Language", Language, 30);
        }

        $('#LangChoose').change(function(event){
            var curLang = $(this).children('option:selected').val();
            $("body").cloudLang({lang: curLang, file: "lib/lang/lang-resource.xml"});
            $("#langIcon").attr("src",'img/'+curLang+'.png')
            CreateCookie("Language", curLang, 30);
            event.stopPropagation(); 
        });


      window.onscroll=function(){

        var topScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//滚动的距离,距离顶部的距离
        if(topScroll > 100){ //当滚动距离大于250px时
            $("#header").addClass('headerFloat').removeClass("headerTop");
        }else{//当滚动距离小于250的时候让导航栏恢复原状
            $("#header").addClass('headerTop').removeClass("headerFloat");
        }
      };


        $(".headerNav").mouseover(function(){
          $(this).find(".botterLine").addClass("activeLine");
        });
        $(".headerNav").mouseout(function(){
         $(this).find(".botterLine").removeClass("activeLine");
        });
        


});//load 

    

});

$("footer").load("lib/footer/footer.html",function(){   


})




//区号
$.ajax({                    
        type:'GET',
        data:{},       
        url: AjaxURL+'/AreTalkServer/Verify/getCountryAreacode.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.areacode.length; i++) {
               var areacode = '<option value="'+data.data.areacode[i].countryId+'">'+data.data.areacode[i].countryName+' +'+data.data.areacode[i].areaCode+'</option>';               $('#PhoneNmuAre').append(areacode);                              
                  var form = layui.form;
                  form.render();
                }
            },
        error: function () {                  

      }                        
}); 

//国籍、居住地
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



//证件类型
$.ajax({                    
        type:'GET',
        data:{},       
        url: AjaxURL+'/AreTalkServer/Web/Api/getCommonTable.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.idcardTyape.length; i++) {
               var certificate = '<option value="'+data.data.idcardTyape[i].id+'">'+data.data.idcardTyape[i].cardName+'</option>';
               $('#certificate').append(certificate);                              
                  var form = layui.form;
                  form.render();
                }
            },
        error: function () {                  

      }                        
}); 

//联系方式
$.ajax({                    
        type:'GET',
        data:{},       
        url: AjaxURL+'/AreTalkServer/Web/Api/getCommonTable.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.communicationChannel.length; i++) {
               var contactWay = '<option value="'+data.data.communicationChannel[i].terraceId+'">'+data.data.communicationChannel[i].terraceName+'</option>';
               $('#contactWay').append(contactWay);                              
                  var form = layui.form;
                  form.render();
                }
            },
        error: function () {                  

      }                        
}); 


//银行
/*$.ajax({                    
        type:'GET',
        data:{},       
        url: AjaxURL+'/AreTalkServer/Web/Api/getCommonTable.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.bankInfo.length; i++) {
               var bankInfo = '<option value="'+data.data.bankInfo[i].id+'">'+data.data.bankInfo[i].bankName+'</option>';
               $('#BankSelect').append(bankInfo);                              
                  var form = layui.form;
                  form.render();
                }
            },
        error: function () {                  

      }                        
}); */

//掌握语言
$.ajax({                    
        type:'GET',
        data:{},       
        url: AjaxURL+'/AreTalkServer/Web/Api/getCommonTable.action',
        success:function(data) {
          
              for (var i = 0;i<data.data.lang.length; i++) {
               var LangSelect = '<option value="'+data.data.lang[i].id+'">'+data.data.lang[i].name+'</option>';
               $('#motherLangSelect').append(LangSelect);
               $('#KnowLangSelect').append(LangSelect);
                  var form = layui.form;
                  form.render();
                }
            },
        error: function () {                  

      }                        
}); 

})//ready结束



}); //layui.use结束




var checkInfoValid;
function GetCode(){
  
  username = $("#username").val();
  PhoneNumber = $("#PhoneNumber").val().replace(/\b(0+)/gi,"");
  var PhoneLocaltion = $('#PhoneNmuAre option:selected').val();//Select选中的值


  if (username&&PhoneNumber){
      $.ajax({
          async:false,
              type:'POST',
              data:{userName:username,phoneNo:PhoneNumber,type:0},       
              url: AjaxURL+'/AreTalkServer/Web/Login/checkInfoValid.action',
              success:function(data) {
                 
                  if(data.data.status=="success"){
                    checkInfoValid = true;
                      console.log(data.data.status)
                      $.ajax({
                          async:false,                  
                          type:'POST',
                          data:{countryId:PhoneLocaltion,phoneNo:PhoneNumber,type:0},       
                          url: AjaxURL+'/AreTalkServer/Verify/sendPhoneNoVerifyCode.action',
                          success:function(data) {
                                if (data.data.status=="success") {  
                                   time()                                
                                   layer.msg('正在发送验证码，请查收手机短信',{time:1500});
                                   console.log('正在发送验证码，请查收手机短信')
                                }
                              },
                          error: function () {                  
            
                            }                        
                      }); 

                  }else if(data.data.status=="failed"){
                         console.log(data.data.status)
                        if (data.data.item=="userName") {
                            layer.msg('用户名已被注册',{time:1500});
                            console.log('用户名已被注册')
                        }else if(data.data.item=="phoneNo"){
                            layer.msg('手机号已注册',{time:1500});
                            console.log('手机号已注册')
                        }
                  }
                    

                  },
              error: function () {
              
              }                        
          }); 

  }else{
  
    layer.msg('用户名或手机号不得为空，请重试',{time:1500});
  }



}





function register(){

$.ajax({
        type:'POST',
        data:{
              userType:0,
              userName:fromValue.userName,
              password:fromValue.password,
              phoneNo:fromValue.phoneNo,
              motherlandId:fromValue.motherLang,             
              email:fromValue.email,
              verifyCode:fromValue.IDcode,
              countryId:fromValue.countryId,//区号
              birthday:fromValue.Tbirthday,
              motherlandId:fromValue.motherlandId//国籍
        },       
        url: AjaxURL+'/AreTalkServer/Web/Login/register.action',
        success:function(data) {
            if(data.data.status=="success"){

               console.log("register 成功"); 
               Login(); 
             
            }else if(data.data.errCode=="5"){
              layer.msg('验证码错误请重试',{time:1500});
            }else {
               alert("register error,please try again")
            }

            },
        error: function () {                  
            
          console.log("register  error")
          layer.msg('验证码错误请重试',{time:1500});

      }                        
})


}




function Login() {
var TuserName = fromValue.userName;
var password = fromValue.password

 console.log(TuserName)
  console.log(password)

  $.ajax({
      type: "POST",
      url:AjaxURL+"/AreTalkServer/Web/Login/login.action",
      data: {userName:TuserName,password:password,userType:0},
      success: function (data) {
          console.log("Login 成功"); 

          Sessionid = data.data.JSESSIONID;
          CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);          
          UpLoadHeadImg();
          AddTeacherInfo();
          AddKnowLang();
          AddKnowLangLv();

          },

      error: function () {
          console.log("Login  error");
          alert("error,please try again")
          }
      });

}



function UpLoadHeadImg(){

  console.log("teacherHeadImgId:"+teacherHeadImgId);

    $.ajax({
        async:false,
        type:'POST',
        data: {avatarId:teacherHeadImgId},
        url: AjaxURL+"/AreTalkServer/Web/Api/uploadUserImage.action;jsessionid="+Sessionid,
        success:function(data) {
                console.log("上传头像图片ID成功")
        },
        error: function () {                  
                console.log("UpLoadHeadImg error");
                alert("error,please try again")
        }
      }); 
       
}



function AddTeacherInfo(){

  $.ajax({
      type: "POST",
      async:false,
      traditional: true,  
      url:AjaxURL+'/AreTalkServer/Web/Api/uploadTeacherInfo.action;jsessionid='+Sessionid,
      data: {realName:'AreTalkTeacher'/*fromValue.realname*/,
             cardType:fromValue.certificate,
             cardNum:fromValue.certificateNum,
             countryId:fromValue.motherlandId,
             streetInfo:fromValue.WhereFrom,
             homeCountryId:fromValue.LivelandId,
             homeStreetInfo:fromValue.WhereLive,
             communicationType:fromValue.contactWay,
             communicationId:fromValue.contactNum,
             bankId:'1'/*fromValue.bank*/,
             bankphoneNumber:'18888888888'/*fromValue.bankPhone*/,
             bankCardNum:'8888888888888888'/*fromValue.BankCardID  */          
           },
      success: function (data) {
              console.log("AddTeacherInfo 成功");
          },

      error: function (a, b, c) {
          console.log("a: " + JSON.stringify(a));
          console.log("b: " + JSON.stringify(b));
          console.log("c: " + JSON.stringify(c));
          console.log("AddTeacherInfo  error");
          alert("error,please try again")
          }
      });

}

function AddKnowLang(){

  $.ajax({
    async:false,
      type: "POST",
      url:AjaxURL+'/AreTalkServer/Web/Api/updateUserLang.action;jsessionid='+Sessionid,
      data: {
              langAddList:fromValue.KnowLangArry,
              langDeleteList:null
           },
      success: function (data) {
              console.log("AddKnowLang 成功");
          },

      error: function () {
          console.log("AddKnowLang  error");
          alert("error,please try again")
          }
      });

}


function AddKnowLangLv(){

  $.ajax({
      type: "POST",
      async:false,
      url:AjaxURL+'/AreTalkServer/Web/Api/updateUserLangLevel.action;jsessionid='+Sessionid,
      data: {
              langIdList:fromValue.KnowLangArry,
              langLevelList:fromValue.levelArry
           },
      success: function (data) {
              console.log("AddKnowLangLv 成功");
              window.location.href = "TeacherFinish.html";
          },
      error: function () {
          console.log("AAddKnowLangLv  error");
          alert("error,please try again")
          }
      });

}

function CreateCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"

}


function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
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