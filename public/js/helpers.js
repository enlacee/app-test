//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [rev. #1]

shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

var showText = function (target, message, index, interval) {    
  if (index < message.length) { 
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval); 
  } 
}

// Helper js by http://jsviews.com/#jsrender
var myHelpers = {
	upper: function(val) { return val.toUpperCase(); },
	title: "Sir"
};
