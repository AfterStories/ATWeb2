
(function($){

	$.fn.cloudLang = function(params){
		
		var defaults = {
			file: 'lang-resource.xml',
			lang: 'zh'
		}
		
		var aTexts = new Array();
		
		if(params) $.extend(defaults, params);
		
		$.ajax({
		      type: "GET",
		      url: defaults.file,
		      dataType: "xml",
		      success: function(xml)
					   {
		           			$(xml).find('text').each(function()
							{
								var textId = $(this).attr("id");
		                 		var text = $(this).find(defaults.lang).text();
								
								aTexts[textId] = text;

							});
		
							$.each($("*"), function(i, item)
							{
								
								if($(item).attr("langtag") != null)
									$(item).fadeOut(50).fadeIn(50).text(aTexts[$(item).attr("langtag")]);
								
							});
							
		               }
		      });
	};
	
})(jQuery);
