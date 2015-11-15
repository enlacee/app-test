/*
* Javascript
*
*/

/*$(function(){*/

	var VARS = {
		api_url: 'http://localhost/acopitan/free/app_test_api/home/index',
		dom_id_preload: '#preload',
		dom_id_escenario_title: 'escenario-title',
	};



 	var App = {
		version: '1.1',

		init : function() {
			console.log("loadData()");
			this.loadData();
		},

		/*
		* cargar datos by API
		*/
		loadData : function() {
			console.log("data");
	        $.get( VARS.api_url, function( data ) {
	        	$(VARS.dom_id_preload).hide();
	        	console.log('data cargado!..');
				console.log('data',data);

        	});
		},

		// load app
		

	};

/**
* Init project
*/
App.init();
