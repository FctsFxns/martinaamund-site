hexo.extend.helper.register('spanize', function(text) {
	var result = '';
	for (var i = 0; i < text.length; i++) {
	  result = result + '<span>' + text.charAt(i) + '</span>';
	}
  return result;
});

