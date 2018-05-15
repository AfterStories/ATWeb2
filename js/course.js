$(document).ready(function(){
    var Language = getCookie("Language");


    $("header").load("lib/header/header.html",function(){


    $("#courseBtn").find(".botterLine").addClass("curpage"); 


        if (Language){

            $("#LangChoose").val(""+Language+"");

            $("#langIcon").attr("src",'img/'+Language+'.png');
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});

            $("#theMainpic2").attr("src",'img/coursesystem_'+Language+'.png');
        }else{
            Language = "en";
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});
            CreateCookie("Language", Language, 30);
            
        }

        $('#LangChoose').change(function(event){
            curLang = $(this).children('option:selected').val();
            CreateCookie("Language", curLang, 30);
            ;
            
            $("body").cloudLang({lang: curLang, file: "lib/lang/lang-resource.xml"});
            $("#langIcon").attr("src",'img/'+curLang+'.png');

            $("#theMainpic2").attr("src",'img/coursesystem_'+curLang+'.png');

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
$(window).trigger('scroll');
/*触发滚动事件，避免刷新的时候显示回到顶部按钮 

*/  
