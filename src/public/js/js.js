/*
* Javascript
*
*/

/*$(function(){*/

	var VARS = {
		api_url: 'http://localhost/acopitan/free/app_test_api/home/index'
	};



 	var App = {
		me : this,
		version: '1.1',

		init : function() {
			console.log("loadData()");
			this.loadData();
		},

		loadData : function() {
			console.log("data");
	        $.get( VARS.api_url, function( data ) {
				console.log('data',data);
        	});
		},


	};

/**
* Init project
*/
App.init();
