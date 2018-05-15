

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
        });

$(".headerNav").mouseover(function(){
  $(this).find(".botterLine").addClass("activeLine");
});
$(".headerNav").mouseout(function(){
 $(this).find(".botterLine").removeClass("activeLine");
});


});//load

$("footer").load("lib/footer/footer.html",function(){

});


var fromValue

layui.use(['layer', 'element','form'], function(){

  var layer = layui.layer;
  var form = layui.form;

  form.on('submit(Feedbackfrom)', function(data){
  data.field.type = "5";//Feedback
  fromValue = data.field;

  
  console.log(fromValue) //当前容器的全部表单字段，名值对形式：{name: value}

     $.ajax({
      type: "POST",
      url: AjaxURL+"/AreTalkServer/Web/Api/submitMessage.action",
      data: fromValue,
      success: function (data) { 

      if (data.data.status=="success"){
            alert("success") 
      }else{
        layer.msg("error, try again");
      }
                  
          },
      error: function (a,b,c) {
             layer.msg("error, try again");
           }
      });

     return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
});


});   





})//ready



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

