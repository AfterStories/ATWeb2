$(document).ready(function(){


$("#WinBtn").click(function(){

   window.location="http://www.aretalk.com/Download/AreTalkStudent/AreTalkStudentv0.01.exe"
 
})
$("#iOSBtn").click(function(){
   window.location="https://itunes.apple.com/us/app/aretalk/id1225491507"
 
})
$("#AndroidBtn").click(function(){
   window.location="https://play.google.com/store/apps/details?id=com.aretalk"
 
})
$("#FrameworkBtn").click(function(){
   window.location="https://www.microsoft.com/zh-cn/download/details.aspx?id=30653"
 
})
$("#FlashBtn").click(function(){
   window.location="http://get2.adobe.com/cn/flashplayer/otherversions/"
 
})




    var Language = getCookie("Language");

    $("header").load("lib/header/header.html",function(){

        $("#appBtn").find(".botterLine").addClass("curpage");
        
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
            CreateCookie("Language", curLang, 30);
            $("#langIcon").attr("src",'img/'+curLang+'.png')
            event.stopPropagation(); //停止冒泡
        });


window.onscroll=function(){

    var topScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//滚动的距离,距离顶部的距离

    if(topScroll > 100){ 
        $("#header").addClass('headerFloat').removeClass("headerTop");
    }else{
        $("#header").addClass('headerTop').removeClass("headerFloat");
    };

};


$(".headerNav").mouseover(function(){
  $(this).find(".botterLine").addClass("activeLine");
});
$(".headerNav").mouseout(function(){
 $(this).find(".botterLine").removeClass("activeLine");
});



});//load


$("footer").load("lib/footer/footer.html",function(){

});



});//ready



layui.use('layer', function(){
    var layer = layui.layer;
});


//返回顶端
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
