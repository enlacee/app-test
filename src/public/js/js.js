/*
* Javascript
*
*/

/*$(function(){*/

	var VARS = {
		api_url: 'http://localhost/acopitan/free/app_test_api/home/index',
		dom_id_preload: '#preload',
		dom_id_escenario_titulo: '#escenario-titulo',
		dom_id_escenario_audio: '#escenario-audio',
		dom_id_imagen: '#imagen',
		// evidencia
		dom_id_evidencia_texto: '#evidencia-texto',
		// form
		dom_id_form_puntos: '#form-puntos',
		dom_id_form_opcion_respuesta: '#form-opcion-respuesta',
		dom_id_form_respuesta: '#form-respuesta',
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
