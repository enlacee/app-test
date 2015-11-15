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
		dom_id_escenario_audio_dom: '#escenario-audio-dom',
		
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
		localData: [],
		indice: 0,

		init : function() {
			console.log("loadData()");
			this.initSetterDom();
			this.loadData();
		},		
		initSetterDom: function() {
			$(document).on(
				"load", VARS.dom_id_escenario_audio_dom, function(){
				alert("termino audio")
			});
		},
		/*
		* cargar datos by API
		*/
		loadData : function() {
			var me = this; 
			console.log("data");
	        $.getJSON( VARS.api_url, function( data ) {
	        	$(VARS.dom_id_preload).hide();
	        	console.log('data cargado!..');
				
				me.localData = data;
				me.swichEscenario();
        	});
		},
		// cambiar de escenario segun indice
		swichEscenario: function() {
			var me = this;
			if (me.localData.length > 0) {
				if (me.indice > (me.localData.length-1)) {
					alert("juego se termino! " + indice)
				} else {
					me.cargarJuego(me.indice, me.localData[me.indice]);
					me.iniciarJuego();
				}
			} else {
				alert("no existe data");
			}

			console.log('this.localData', this.localData)
		},
		// load app
		cargarJuego: function(indice, data) {
			var me = this;
			var indiceMas1 = indice + 1;
			// cambiar data escenario.
			$(VARS.dom_id_escenario_audio).text('Escenario '+ indiceMas1);

			var elementAudio = me.helpGetTagAudio(data.path_audio);
			$(VARS.dom_id_escenario_audio).append(elementAudio);
			// reproducir
			//elementAudio.play();
/*
			console.log('aaaaaa', $(VARS.dom_id_escenario_audio_dom))
			$(VARS.dom_id_escenario_audio_dom).trigger('load');
*/

		},
		iniciarJuego: function() {
			// escenario sound
			$(VARS.dom_id_escenario_audio_dom).trigger('play');
			console.log('iniciarJuego', $(VARS.dom_id_escenario_audio_dom));

			console.log('iniciarJuego');

		},
		

		/*
		************************************************************
		* HELPER
		************************************************************
		*/
		helpGetTagAudio : function(sourceUrl) {
			var audio = document.createElement('audio');
			audio.controls = true;
			audio.preload = 'none';
			audio.id = 'escenario-audio-dom'
			audio.src = sourceUrl;
			/*
			var source = document.createElement('source');
			source.type = 'audio/ogg';
			source.src = 'audio/song.ogg';
			audio.appendChild(source);
			*/

			console.log('audio', audio);
			return audio;
		}

	};

/**
* Init project
*/
App.init();
