
  //百度地图API功能
  function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=wSBwtQwFXVyaYgeD6x9cEp9EVPjGPzel&callback=init";
    document.body.appendChild(script);
  }
  
  function init() {
    var map = new BMap.Map("allmap");            // 创建Map实例
    var point = new BMap.Point(-0.024399,51.485401);  //  创建点坐标
    map.centerAndZoom(point,16);               
    map.enableScrollWheelZoom();     
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
 
    var opts = {
      width : 200,     // 信息窗口宽度
      height: 100,     // 信息窗口高度
      title : "House of Phoenix 25" , // 信息窗口标题
    }

  var infoWindow = new BMap.InfoWindow("address：House of Phoenix 25 Wharf Street London", opts);  // 创建信息窗口对象 
  marker.addEventListener("click", function(){          
    map.openInfoWindow(infoWindow,point); //开启信息窗口
  }); 



// ***************************************************************

    var map2 = new BMap.Map("allmap2");            // 创建Map实例
    var point = new BMap.Point(121.525194,38.858831);  //  创建点坐标
    map2.centerAndZoom(point,16);               
    map2.enableScrollWheelZoom();     
    var marker = new BMap.Marker(point);  // 创建标注
    map2.addOverlay(marker);              // 将标注添加到地图中
 
    var opts = {
      width : 200,     // 信息窗口宽度
      height: 100,     // 信息窗口高度
      title : "House of Phoenix 25" , // 信息窗口标题
    }

  var infoWindow = new BMap.InfoWindow("address：House of Phoenix 25 Wharf Street London", opts);  // 创建信息窗口对象 
  marker.addEventListener("click", function(){          
    map2.openInfoWindow(infoWindow,point); //开启信息窗口
  }); 



  }  
  

$(document).ready(function(){ 

    loadJScript()  //异步加载地图

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

  form.on('submit(contentUs)', function(data){
  data.field.type = "1";
  fromValue = data.field;

  
  console.log(fromValue) //当前容器的全部表单字段，名值对形式：{name: value}

     $.ajax({
      type: "POST",
      url: AjaxURL+"/AreTalkServer/Web/Api/submitMessage.action",
      data: fromValue,// 加country
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

