$(document).ready(function(){

    var Language = getCookie("Language");

    var currencyInfo={}

    $.ajax({
        type:'GET',
        async:false,
        data:{},       
        url: AjaxURL+'/AreTalkServer/Web/Api/getCommonTable.action',
        success:function(data) {
        //货币汇率信息
                for (var i = 0;i<data.data.currencyInfo.length; i++) {
                  var currencyShortName = data.data.currencyInfo[i].currencyShortName
                  currencyInfo[data.data.currencyInfo[i].currencyShortName] = data.data.currencyInfo[i].baseRatio
                }

                var CNYbaseRatio = currencyInfo.CNY;
                var GBPbaseRatio = currencyInfo.GBP;
                var USDbaseRatio = currencyInfo.USD;

                console.log(currencyInfo)

      //小班课信息
                for (var i = 0;i<4; i++) {

                     var className = data.data.goodsInfo[i].title;
                     var goodsType = data.data.goodsInfo[i].goodsType;
                     if (data.data.goodsInfo[i].value == '360') {
                        var periodNum = 'oneYear' ;//360
                        var validity = "1";
                     }else if(data.data.goodsInfo[i].value == '720'){
                         var periodNum = 'twoYear' ;//780
                         var validity = "2";
                     }
                     
                     var cardTime =  (data.data.goodsInfo[i].goodsDiscribe).slice(8); //"Lessons 48+2"→48+2
                     var CNYpriceText = (data.data.goodsInfo[i].amount)/CNYbaseRatio; //78000→780
                     var GBPpriceText = (data.data.goodsInfo[i].amount)/GBPbaseRatio;
                     var USDpriceText = (data.data.goodsInfo[i].amount)/USDbaseRatio;
                      if (CNYpriceText<0.01) {
                        CNYpriceText = 0.01
                      }
                      if (GBPpriceText<0.01) {
                        GBPpriceText = 0.01
                      }
                      if (USDpriceText<0.01) {
                        USDpriceText = 0.01
                      }
                      
                     var miniClass = '<div class="card" ><div class="cardTitle" langtag="goodsType'+goodsType+'" goodsType="'+goodsType+'">'+className+'</div><div class="cardface"><div class="cardDetail"><span class="cardTime" langtag="cardTime">课时：</span><span class="cardNumber">'+cardTime+'</span><div class="cardPeriod"><span class="period" langtag="period" langtag="period">有效期：</span><span class="periodNum" langtag="'+periodNum+'" validity="'+validity+'">一年</span></div></div><div class="cardPrice Price_zh" ><span class="priceText" langtag="priceText" >价格：</span><span class="priceint" id="CNY">'+CNYpriceText+'</span><span class="priceCoin">¥</span></div><div class="cardPrice Price_en hide" ><span class="priceText" langtag="priceText" >Price：</span><span class="priceint" id="GBP">'+GBPpriceText+'</span><span class="priceCoin">￡</span><span class="priceint PriceLine">/</span><span class="priceint" id="USD">'+USDpriceText+'</span><span class="priceCoin">＄</span></div><div class="cardBuyBtn"  langtag="cardBuyBtn" id="goodsType'+goodsType+'">购 买</div></div></div>'
                      $("#MiniCardBox").append(miniClass);
                }


      //1对1课程信息
                for (var i = 4;i<6; i++) {

                     var className = data.data.goodsInfo[i].title;
                     var goodsType = data.data.goodsInfo[i].goodsType;
                     if (data.data.goodsInfo[i].value == '360') {
                        var periodNum = 'oneYear' ;//360
                        var validity = "1";
                     }else if(data.data.goodsInfo[i].value == '720'){
                         var periodNum = 'twoYear' ;//780
                         var validity = "2";
                     }
                     
                     var cardTime =  (data.data.goodsInfo[i].goodsDiscribe).slice(8); //"Lessons 48+2"→48+2
                     var CNYpriceText = (data.data.goodsInfo[i].amount)/CNYbaseRatio; //78000→780
                     var GBPpriceText = (data.data.goodsInfo[i].amount)/GBPbaseRatio;
                     var USDpriceText = (data.data.goodsInfo[i].amount)/USDbaseRatio;
                      if (CNYpriceText<0.01) {
                        CNYpriceText = 0.01
                      }
                      if (GBPpriceText<0.01) {
                        GBPpriceText = 0.01
                      }
                      if (USDpriceText<0.01) {
                        USDpriceText = 0.01
                      }
                     var V1CardBox = '<div class="card" ><div class="cardTitle" langtag="goodsType'+goodsType+'" goodsType="'+goodsType+'">'+className+'</div><div class="cardface"><div class="cardDetail"><span class="cardTime" langtag="cardTime">课时：</span><span class="cardNumber">'+cardTime+'</span><div class="cardPeriod"><span class="period" langtag="period" langtag="period">有效期：</span><span class="periodNum" langtag="'+periodNum+'" validity="'+validity+'">一年</span></div></div><div class="cardPrice Price_zh" ><span class="priceText" langtag="priceText" >价格：</span><span class="priceint" id="CNY">'+CNYpriceText+'</span><span class="priceCoin">¥</span></div><div class="cardPrice Price_en hide" ><span class="priceText" langtag="priceText" >Price：</span><span class="priceint" id="GBP">'+GBPpriceText+'</span><span class="priceCoin">￡</span><span class="priceint PriceLine">/</span><span class="priceint" id="USD">'+USDpriceText+'</span><span class="priceCoin">＄</span></div><div class="cardBuyBtn"  langtag="cardBuyBtn" id="goodsType'+goodsType+'">购 买</div></div></div>'
                      $("#1V1CardBox").append(V1CardBox);
                }
        },  
        error:function() {
                
        }   

    });//ajax






//load头尾
    $("header").load("lib/header/header.html",function(){


        $("#priceBtn").find(".botterLine").addClass("curpage");

        if (Language){

            $("#LangChoose").val(""+Language+"");

            $("#langIcon").attr("src",'img/'+Language+'.png');
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});

            if (Language=="zh") {
                console.log(Language)
                $(".Price_en").hide(); $(".Price_zh").show();
            }else{
                console.log(Language)
                 $(".Price_en").show(); $(".Price_zh").hide();
            }
        }else{
            Language = "en";
            $("body").cloudLang({lang: Language, file: "lib/lang/lang-resource.xml"});
            CreateCookie("Language", Language, 30);
             $(".Price_en").show(); $(".Price_zh").hide();
            
        }

        $('#LangChoose').change(function(event){
            curLang = $(this).children('option:selected').val();
            CreateCookie("Language", curLang, 30);

            $("body").cloudLang({lang: curLang, file: "lib/lang/lang-resource.xml"});
            $("#langIcon").attr("src",'img/'+curLang+'.png');

            if (curLang=="zh") {
                console.log(curLang)
                $(".Price_en").hide(); $(".Price_zh").show();
            }else{
                console.log(curLang)
                 $(".Price_en").show(); $(".Price_zh").hide();
            }

        });


      window.onscroll=function(){

        var topScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//滚动的距离,距离顶部的距离
        if(topScroll > 100){ 
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
        

});//header load

$("footer").load("lib/footer/footer.html",function(){

});



});//ready

var packageName 
var packLessons 
var packValidity
var packPrice
var goodsType

layui.use('layer', function(){

    var layer = layui.layer;


$(".cardBuyBtn").click(function(){

    var Sessionid = getCookie("JSESSIONID");

    if (Sessionid==null) {
      alert("please login before purchase")
      window.location.href = 'index.html';
    }

packageName =  $(this).parent().parent().find(".cardTitle").text();
goodsType =  $(this).parent().parent().find(".cardTitle").attr("goodsType");
packLessons =  $(this).parent().find(".cardNumber").text();
packValidity = $(this).parent().find(".periodNum").attr("validity");


        layer.open({
          type: 2,
          title: '确认付款 - AreTalk Order',
          shadeClose: true,
          shade: false,
          maxmin: true, //开启最大化最小化按钮
          area: ['800px', '600px'],
          content: 'order.html'
        });  
})


});

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

