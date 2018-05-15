
$(document).ready(function(){

  // 首页老师轮播图
var mySwiper = new Swiper ('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000,//3秒切换一次
    },
    initialSlide :0,
/*    loop: true,*/
    slidesPerView: 3,
    spaceBetween:swiperBetween,

observer:true,//修改swiper自己或子元素时，自动初始化swiper 
observeParents:false,//修改swiper的父元素时，自动初始化swiper 
onSlideChangeEnd: function(swiper){ 
　　　swiper.update();  
　　　mySwiper.startAutoplay();
　　   mySwiper.reLoop();  
}    //修改swiper自己或子元素时，自动初始化swiper 

//px
/*    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }*/
});


// 首页banner轮播图
var myBannerSwiper = new Swiper ('.swiper-container-Banner', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000,//3秒切换一次
    },
    initialSlide :0,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }

});


    var Language = getCookie("Language");
    
    var curLang

    $("header").load("lib/header/header.html",function(){


        $("#homeBtn").find(".botterLine").addClass("curpage");

        if (Language){

            $("#LangChoose").val(""+Language+"");

            $("#langIcon").attr("src",'img/'+Language+'.png');
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});

            $("#step1").attr("src",'img/Step1_'+Language+'.png');
            $("#step2").attr("src",'img/Step2_'+Language+'.png');
            $("#step3").attr("src",'img/Step3_'+Language+'.png');

            $("#teacher1").attr("src",'img/teacher(1)_'+Language+'.png');
            $("#teacher2").attr("src",'img/teacher(2)_'+Language+'.png');
            $("#teacher3").attr("src",'img/teacher(3)_'+Language+'.png');
            $("#teacher4").attr("src",'img/teacher(4)_'+Language+'.png');
            $("#teacher5").attr("src",'img/teacher(5)_'+Language+'.png');
            $("#teacher6").attr("src",'img/teacher(6)_'+Language+'.png');

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

            $("#step1").attr("src",'img/Step1_'+curLang+'.png');
            $("#step2").attr("src",'img/Step2_'+curLang+'.png');
            $("#step3").attr("src",'img/Step3_'+curLang+'.png');

            $("#teacher1").attr("src",'img/teacher(1)_'+curLang+'.png');
            $("#teacher2").attr("src",'img/teacher(2)_'+curLang+'.png');
            $("#teacher3").attr("src",'img/teacher(3)_'+curLang+'.png');
            $("#teacher4").attr("src",'img/teacher(4)_'+curLang+'.png');
            $("#teacher5").attr("src",'img/teacher(5)_'+curLang+'.png');
            $("#teacher6").attr("src",'img/teacher(6)_'+curLang+'.png');


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


});


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
  
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [
    /^[\S]{1,50}$/
    ,'不能出现空格'
  ] 
});      
     


form.on('submit(login)', function(data){

  console.log() //当前容器的全部表单字段，名值对形式：{name: value}


      var LoginURL = "http://211.159.152.210:8188/AreTalkServer/Web/Login/";

    var TheuserName,Thepassword;

        var userName = data.field.username
        TheuserName = userName;
        var password = hex_md5(data.field.password);
        Thepassword = password;

                $.ajax({
                    type: "GET",
                    url: LoginURL+"login.action?userName="+userName+"&password="+password+"&userType=1",
                    data: {},
                    success: function (data) {     

                    CreateCookie(TheuserName, Thepassword, 30);
                    CreateCookie("JSESSIONID", data.data.JSESSIONID, 30);
    
                    if(data.data.status=="success"){
                        

                        layer.msg("登陆成功",{time:1500});
                        $("#RegisterBox").hide();
                        //location.replace("../Student/all/allPage/index.html?LoginedName="+TheuserName);

                    }else{
                           layer.msg("error");
                         }                        
                      
                        },
                    error: function (a,b,c) {
                           layer.msg("error");
                         }
                    });

 

});
   return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。     
});





$(".regBtn").click(function(){
    window.location.href='register.html';
})



var clientWidth = document.body.clientWidth;
var swiperBetween = 40;

if (clientWidth<= 414) {
    swiperBetween = 20;
}


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

function stopPropagation(e){
     var e = window.event || e;
     if(document.all){
          e.cancelBubble = true;
     }else{
          e.stopPropagation();
     }
}


