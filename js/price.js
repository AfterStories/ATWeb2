$(document).ready(function(){

    var Language = getCookie("Language");

    $("header").load("lib/header/header.html",function(){

        $("#priceBtn").find(".botterLine").addClass("curpage");



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
             $("#langIcon").attr("src",'img/'+curLang+'.jpg')
            CreateCookie("Language", curLang, 30);
        });


window.onscroll=function(){

    var topScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//滚动的距离,距离顶部的距离

    if(topScroll > 100){ 
        $("#header").addClass('headerFloat').removeClass("headerTop");
    }else{
        $("#header").addClass('headerTop').removeClass("headerFloat");
    }

};


$(".headerNav").mouseover(function(){
  $(this).find(".botterLine").addClass("activeLine");
});
$(".headerNav").mouseout(function(){
 $(this).find(".botterLine").removeClass("activeLine");
});


const navUrl = {
    homeBtn:function () {window.location.href='index.html'},
    courseBtn:function () {window.location.href='course.html'},
    priceBtn:function () {window.location.href='price.html'},
    appBtn: function () {window.location.href='download.html'},
    loginBtn: function () {window.location.href='#.html'},
}
//导航栏跳转
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
});

function backToTop() {
    window.scrollTo(0,0);
}
