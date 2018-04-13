$(document).ready(function(){
    var Language = getCookie("Language");

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
        if(topScroll > 100){ //当滚动距离大于250px时执行下面的东西
            $("#header").addClass('headerFloat').removeClass("headerTop");
        }else{//当滚动距离小于250的时候执行下面的内容，也就是让导航栏恢复原状
            $("#header").addClass('headerTop').removeClass("headerFloat");
        }
      };


        $(".headerNav").mouseover(function(){
          $(this).find(".botterLine").addClass("activeLine");
        });
        $(".headerNav").mouseout(function(){
         $(this).find(".botterLine").removeClass("activeLine");
        });
        

        //导航栏跳转
        const navUrl = {
            homeBtn:function () {window.location.href='indx.html'},
            courseBtn:function () {window.location.href='course.html'},
            priceBtn:function () {window.location.href='price.html'},
            appBtn: function () {window.location.href='download.html'},
            loginBtn: function () {window.location.href='#.html'},
        }
        
        $(".headerNav").click(function(){
            var clickNav = $(this).context.id;
            navUrl[clickNav]();
        
        })

});//load


    $("footer").load("lib/footer/footer.html",function(){

    });


});









layui.use('layer', function(){
    var layer = layui.layer;

//轮播图第一个弹视频
/*
    $('#bannerVideo').click(function(){
        layer.open({
            type: 2,
            title: false,
            area: ['630px', '360px'],
            shade: 0.8,
            closeBtn: 0,
            shadeClose: true,
            content: '//player.youku.com/embed/XMjY3MzgzODg0'
        });
    });
*/

});


var clientWidth = document.body.clientWidth;
var swiperBetween = 40;

if (clientWidth<= 414) {
    swiperBetween = 20;
}

//回到顶端
function backToTop() {
    window.scrollTo(0,0);
}
// 首页轮播图
var mySwiper = new Swiper ('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000,//3秒切换一次
    },
    initialSlide :0,
    loop: true,
    slidesPerView: 3,
    spaceBetween:swiperBetween,//px
/*    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }*/
    });
