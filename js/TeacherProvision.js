

$(document).ready(function(){ 


  var Language = getCookie("Language");
if (Language) {
  console.log(Language)
}else{
  Language = "en"
}


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



        $(".headerNav").mouseover(function(){
          $(this).find(".botterLine").addClass("activeLine");
        });
        $(".headerNav").mouseout(function(){
         $(this).find(".botterLine").removeClass("activeLine");
        });
        


});//load


    $("footer").load("lib/footer/footer.html",function(){

    });



$("#next").click(function(){
 window.location.href = "teacherRegister.html";

})

})//ready结束
