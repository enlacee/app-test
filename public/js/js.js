/*
* Javascript
*
*/

/*$(function(){*/

	var VARS = {
		api_url: 'data.json', //'http://localhost/acopitan/free/app_test_api/home/index',
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
		indice: 0, // escenario
        indiceEvidencia: 0, // evidencia

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
	        $.getJSON( VARS.api_url, function( data ) {
	        	$(VARS.dom_id_preload).hide(); 
				me.localData = data;
                console.log('data cargado!..', me.localData);
				me.swichEscenario();
        	});
		},
		
        // PLAY ESCENARIO : cambiar de escenario segun indice
		swichEscenario: function() {
			var me = this;
			if (me.localData.length > 0) {
				if (me.indice > (me.localData.length-1)) {
					alert("juego se termino! " + indice)
				} else {
					me.escenarioCargarData(me.indice, me.localData[me.indice]);
					me.escenarioIniciarJuego(me.indice, me.localData[me.indice]);
				}
			} else {
				alert("no existe data Escenario");
			}

			console.log('this.localData', this.localData)
		},
		// Escenario : pintar todo el escenario
		escenarioCargarData: function(indice, data) {
			var me = this;
			var indiceMas1 = indice + 1;
			// cambiar data escenario.
			$(VARS.dom_id_escenario_titulo).text('Escenario '+ indiceMas1);

		},
		escenarioIniciarJuego: function(indice, data) {
            var me = this;
			// escenario sound
            me.helpPlayAudioEscenario(data.path_audio, data.data_evidencia);

		},
		
        // PLAY EVIDENCIA
        swichEvidencia: function() {
			var me = this;
            var a = me.indice;
            var indice = me.indiceEvidencia;
            var data = me.localData[a].data_evidencia;
            
			if (data.length > 0) {
				if (indice > (data.length-1)) {
					alert("juego se termino! " + indiceEvidencia)
				} else {
					me.evidenciaCargarData(indice, data[indice]);
					me.evidenciaIniciarJuego(indice, data[indice]);
				}
			} else {
				alert("no existe data Evidencia");
			}
        },
        evidenciaCargarData: function(indice, data) {
            // contruyendo botones con eventos
            $(VARS.dom_id_evidencia_texto).text(data.texto);
            $(VARS.dom_id_imagen).attr('src', context.url + data.imagen);
        },
        evidenciaIniciarJuego: function(indice, data) {
            var me = this;
			// escenario sound
            me.helpPlayAudioEvidencia(data.audio);
        },
        

		/*
		************************************************************
		* HELPER
		************************************************************
		*/
		helpPlayAudioEscenario: function(sourceUrl) {
            var me = this;
            soundManager.createSound({
                id: 'mySound',
                url: context.url + '/' + sourceUrl,
                onfinish: function() {
                    // al terminar audio
                    me.swichEvidencia();
                }
            });
            soundManager.play('mySound');
		},
        helpPlayAudioEvidencia: function(sourceUrl) {
            soundManager.createSound({
                id: 'mySound2',
                url: context.url + '/' + sourceUrl,
                onfinish: function() {alert("helpPlayAudioEvidencia")}
            });
            soundManager.play('mySound2');
        }
        

	};


