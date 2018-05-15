//sandbox account
//609449489-facilitator@qq.com
//609449489
//609449489-buyer@qq.com
//609449489s

/*
aretalk test paypal
yzhequan@163.com
aretalk2018
*/
var Sessionid = getCookie("JSESSIONID");
var currencyData = {};//各币种下的价额
var orderPrice;
var AjaxgoodsType;
var AjaxcurrencyId;
var currencyObj={}//币种名字和对应ID，EUR:4
var orderId
var Askloop 
var wait=10;  

$(document).ready(function(){

//获取币信息、套餐ID信息
    $.ajax({
        type:'GET',
        async:false,
        data:{},       
        url: AjaxURL+'/AreTalkServer/Web/Api/getCommonTable.action',
        success:function(data) {
          	var ThisPackagePrice 

          	for (var i = 0;i<6; i++) {//data.data.goodsInfo.length
          		if (parent.goodsType == data.data.goodsInfo[i].goodsType) {
          			ThisPackagePrice = data.data.goodsInfo[i].amount
          			currencyData['goodsType'] = data.data.goodsInfo[i].goodsType;
         		}
          	}
          	//console.log(ThisPackagePrice)

          	for (var i = 0;i<data.data.currencyInfo.length; i++) {
          		var MinPrice = ThisPackagePrice/data.data.currencyInfo[i].baseRatio;
          		if (MinPrice<1) {
          			MinPrice = 0.01
          		}

          		currencyData[data.data.currencyInfo[i].currencyShortName] = MinPrice;       		
          		currencyObj[data.data.currencyInfo[i].currencyShortName] = data.data.currencyInfo[i].id
          		var option =  '<option value="'+data.data.currencyInfo[i].currencyShortName+'" id="'+data.data.currencyInfo[i].currencyShortName+'" >'+data.data.currencyInfo[i].currencyShortName+'</option>'
          		$("#Currency").append(option);
          	}

          		//console.log(currencyData)
          		//console.log(currencyObj)
   		},            
          
          error:function() {
                
          }   

    });//ajax

//显示订单信息
	$("#packageName").html(parent.packageName);
	$("#packLessons").html(parent.packLessons);
	$("#packValidity").html(parent.packValidity);

layui.use(['form', 'layedit', 'laydate'], function(){
  	var form = layui.form,layer = layui.layer;

//币种选择
form.on('select(Currency)', function(data){

  var price = currencyData[data.value];// data.value 得到被选中的值
  AjaxcurrencyId = currencyObj[data.value];
  AjaxgoodsType = currencyData.goodsType;
  $("#packagePrice").text(price);
  orderPrice = {'total':currencyData[data.value],'currency':data.value}

	console.log(orderPrice);
}); 

form.on('submit(sure)', function(data){
//确认按钮
	$("#paypal-button").css("display","block")
	$("#Currency").attr("disabled","disabled")
	form.render(); //更新全部	
	$("#cancel").removeClass('layui-btn-disabled')
	$("#SureBtn").addClass("layui-btn-disabled")


//给服务器提交订单，返回订单ID
    $.ajax({
       	type: "GET",
       	async:false,
       	url: AjaxURL+"/AreTalkServer/Web/Api/generateOrder.action;jsessionid="+Sessionid,
       	data: {goodsType:AjaxgoodsType,goodsCount:1,channel:3,currencyId:AjaxcurrencyId},//channel付款渠道currencyId币种
       	success: function (data) {     

       	if(data.data.status=="success"){
       	   orderId = data.data.order.orderId
       	}else{
       	       
       	     }
       	  
       	    },
       	error: function () {
       	       alert("error,please Relogged");
       	     }
    });
});


//取消按钮
$("#cancel").click(function(){
	$("#cancel").addClass('layui-btn-disabled')
	$("#Currency").removeAttr("disabled")
	form.render(); //更新全部
	$("#SureBtn").removeClass("layui-btn-disabled")
	$("#paypal-button").css("display","none")
})


  
});//use;

})//ready



//paypal按钮
    paypal.Button.render({
      env: 'production', // Or 'sandbox',production
      locale: 'en_US',//支持的语言环境
      commit: true, //要初始化Pay Now结帐
      client: {
      	production:'AVFo9Q6fgVHPyQyTUhHxZJYEpm178nerTHIzAPpI72VVWVtL4HAYcGMTspX4GCoIAT7JtMd1s1gSTQtT',
      	sandbox:'ASFqLJqiVgHZkJlpOln_FBGOOXtz9SnRh8lLruYHLPCHNoRuc-MaHgBnNlWwLcwQwUWeEnwF1EBcXsmB'
        //sandbox:'ASFqLJqiVgHZkJlpOln_FBGOOXtz9SnRh8lLruYHLPCHNoRuc-MaHgBnNlWwLcwQwUWeEnwF1EBcXsmB',
        //production: 'AcQ8YFOEk4zaMR1pA1LVjE9yBAGYxeTe3-fV-vJo7XlKIFNMj__pFFK4b1mAJ6OlDLxgxVkjDIL-8oAX'
        //609449489@qq.com的clientID
      },
      style: {
        color: 'blue',
        size: 'large',
        tagline:false,
        label:'paypal'
      },

    payment: function(data, actions) {

            return actions.payment.create({
                payment: {
                	
                    transactions: [
                        {
                        	amount:orderPrice,// { total: '0.01', currency: "USD" },//orderPrice,//{ total: '0.01', currency: "USD" },
                        	description: orderId
                        }
                    ],
                    application_context:{
                    	brand_name:"aretalk",
                    	landing_page:"http://www.aretalk.com"
                    }
                }
            });

    },

    onAuthorize: function(data, actions) {

            // Get the payment details
 			// Show a success page to the buyer 

            return actions.payment.get().then(function(paymentDetails) {

                    return actions.payment.execute().then(function() {
                    	$("#OrderPage").hide();
                    	$("#OrderSuccess").show();
                    	console.log(data);
                    	layer.msg('processing..')
						Askloop = setInterval(function(){ AskOrderStatus(orderId) }, 
						1000);//轮询查询支付状态

                    });
               
            });
    },

    onCancel: function(data, actions) {
        /* 
         * Buyer cancelled the payment 
         */
         layer.msg("You have cancelled the payment, please repay")
       },

    onError: function(err) {
        /* 
         * An error occurred during the transaction 
         */

          //layer.msg("Error,Please choose the currency and try again")

			layer.msg('Error,Please choose the currency', {
			  icon: 2,
			  time: 3000 //（如果不配置，默认是3秒关闭时间）
			}, function(){
			  //do something
			});             
			      }
    }, '#paypal-button');


function AskOrderStatus(orderId){

    $.ajax({
       	type: "GET",
       	async:false,
       	url: AjaxURL+"/AreTalkServer/Api/AreTalk/getOrderStatus.action;jsessionid="+Sessionid,
       	data: {orderId:orderId},
       	success: function (data) {   
		    //console.log(data.data.order.status)

       		if(data.data.order.status=="2"){// 0 等待  1 失败 2成功

       			clearInterval(Askloop);       			
       			$("#OrderSuccessTittle").show();
       			
				    layer.msg('Payment success');
				    $("#orderIdBox").text(orderId);
				    $("#loading").hide()
				    $("#duihao").show();

				    time()

       		}

       	},
       	error: function () {
       	       alert("error,please close this page and try again");
       	     }
    });	

}


function time(){

          if (wait == 0) { 
            parent.layer.closeAll();//关闭自己
            wait = 10;  
        } else {  

            $("#timeBox").text('Payment success,This page will be closed after '+wait+' seconds');
            wait--;  
            setTimeout(function() {  
                time()
            },  
            1000)  
        }  

}