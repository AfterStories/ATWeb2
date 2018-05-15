var UpLoadURL = 'http://211.159.152.210:8188';
var teacherHeadImgID
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


var Sessionid = getCookie("JSESSIONID");



function cancelupload(){
  $("#uploadtable").css("display","none")
  $(".col-lg-7").css("display","block");
}

    function getFileName(name){
     var json = name.split(".")
     return json[1];
    }


$(function () {
    /*'use strict';*/

$('.fileupload').each(function (){
    // Initialize the jQuery File Upload widget:
    $(this).fileupload({
        //Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: UpLoadURL+'/AreTalkServer/Servlet/UploadHandleServlet?type=2',
        acceptFileTypes:/(\.|\/)(jpg|png)$/i,
        disableImageResize: false, 
        maxFileSize:1000000,//限制文件大小5M
        //预览图片尺寸
        previewMinWidth:150,
        previewMinHeight:150,
        previewMaxWidth:150,
        previewMaxHeight:150,        
        singleFileUploads: false,//一次只能上传一个文件
        change: function(e, data) {
                  $("#uploadtable").css("display","block");
                  $(".col-lg-7").css("display","none");

                if(data.files.length > 1){
                    alert("Max 1 file are allowed selected")
                    return false;
                }
            }
    })
})

/*
每个选项的上传配置*/
$('.fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {

          var teacherHeadImgID = data.result.files[0].id;                             
          var teacherHeadImgUrl = UpLoadURL+data.result.files[0].url;
          var filetype = getFileName(data.result.files[0].url);
        if (teacherHeadImgID) {
          $(".col-lg-7").attr("value",teacherHeadImgID);
            alert("上传成功");
            $(".col-lg-7").css("display","block");
          $("#preheadimg").attr("src",teacherHeadImgUrl);
          $("#preheadimg").css("width","150px");
          $("#preheadimg").css("height","150px");
          $("#preheadimg").css("border-radius","150px");

        }else{
          alert("上传失败,请重试")
        }

        }).bind('fileuploadadd', function (e, data) {
         
               $.each(data.files, function (index, file) {
              

          var fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
          console.log(fileExtension)
          

/*          for(var a in file){
            console.log(file[a]+"</br>")
          }
*/
            if (fileExtension.toLowerCase() !="jpg" && fileExtension.toLowerCase() !="png") {
                alert("只允许使用jpg和png格式,请重新选择")
                return
            }
              console.log(file.size);
            if (file.size>1024 * 1024 * 1) {
               alert("只允许使用小于5M文件,请重新选择")
               return
            }


    });

        })
                


        // Load existing files:
  $('.fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('.fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('.fileupload')[0]
        }).always(function () {
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $(this).fileupload('option', 'done')
              .call(this, $.Event('done'), {result: result});          
        });
  

});
