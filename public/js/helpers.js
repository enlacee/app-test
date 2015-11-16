//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [rev. #1]

shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};


// Helper js by http://jsviews.com/#jsrender
var myHelpers = {
	upper: function(val) { return val.toUpperCase(); },
	title: "Sir"
};
