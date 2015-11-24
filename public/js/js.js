/*
* Javascript
*
*/
	// variables localStorage
	var ns = $.initNamespaceStorage('ns_name');
	var storage = ns.localStorage; // storage.get('user_id')

	// variables
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
		dom_id_form_opcion_pregunta: '#form-opcion-pregunta',
		dom_id_form_opcion_respuesta: '#form-opcion-respuesta',
		dom_class_btn_formulario: '.btn-formulario',
		dom_id_form_respuesta: '#form-respuesta',
		dom_id_div_puntos: '#div-puntos',
		dom_id_count_down : '#countdown',
		dom_id_fieldset_blockear: '#fieldset-blockear',
	};

 	var App = {
		version: '1.1',
		localData: [],
		indice: 0, // escenario
		indiceEvidencia: 0, // evidencia
		indiceForm: 0,
		puntos: 0,
		puntos_total: 0,
		countdownTimer: false,
		secondsBase: 9,
		quizData: {
			codigo_usuario: '',
			puntos: 0,
			puntos_total: 0,
			fecha_inicio: null,
			fecha_fin: null,
			data_detalle: []
		},

		init : function() {
			this.initSetterDom();
			this.loadData();
		},
		initSetterDom: function() {
			var me = this;
			var data_detail = [];
			// escuchar eventos del click
			$(VARS.dom_id_form_opcion_respuesta).on('click', VARS.dom_class_btn_formulario, function() {
				var refButton = $(this);
				clearInterval(me.countdownTimer)
				me.helpGetDomButtonSuccessWrong(refButton);
				//container_buttons.find('btn').addClass('btn-warning');

			});

		},
		/*
		* cargar datos by API
		*/
		loadData : function() {
			var me = this;
			// seta data play
			me.quizData.codigo_usuario	= me.helpReadIdUser();
			me.quizData.fecha_inicio	= me.helpGetDateTime();

			// set data source
			$.getJSON( VARS.api_url, function( data ) {
				$(VARS.dom_id_preload).hide();
				$(VARS.dom_id_div_puntos).html(me.puntos);
				$(VARS.dom_id_form_respuesta).html('');
				me.localData = data;
				me.puntos_total = data.length;
				me.quizData.puntos_total = data.length;
				me.reformatData();
				console.log('data cargado! localData', me.localData);
				me.swichEscenario();
			});
		},
		reformatData: function() {
			var me = this;

			//shuffle(this.localData);

			/**
			* Recorrer todo los items y establecer respuesta correcta
			* respuesta = true
			*/
			$.each(me.localData, function(index1, value1) {

				$.each(value1.data_evidencia,function(index2, value2) {

					$.each(value2.data_formulario, function(index3, value3) {

						if (value2.respuesta == value3.id_alternativa) {
							value3.respuesta = true;
						} else {
							value3.respuesta = false;
						}
					});
				});
			});
        },
		currentEscenario: function() {
			var me = this;
			return me.localData[me.indice];
		},
		currentEvidencia: function() {
			var me = this;
			return me.localData[me.indice].data_evidencia[me.indiceEvidencia];
		},
        // PLAY ESCENARIO : cambiar de escenario segun indice
		swichEscenario: function() {
			var me = this;
			var data = me.localData;
			var indice = me.indice;

			if (data.length > 0) {
				if (indice > (data.length-1)) {
					window.location.href = "final.html";
				} else {
					console.log('------------------------');
					console.log('ESCENARIO DATA');
					console.log('indice', indice);
					console.log('DATA', data[indice]);
					console.log('------------------------');
					me.escenarioCargarData(indice, data[indice]);
					me.helpPlayAudioEscenario(indice, data[indice].path_audio);
				}
			} else {
				alert("no existe data Escenario");
			}
		},
		// Escenario : pintar todo el escenario
		escenarioCargarData: function(indice, data) {
			var me = this;
			var indiceMas1 = indice + 1;
			
			$(VARS.dom_id_imagen).attr('src', context.url + '/' + data.path_image);
			$(VARS.dom_id_escenario_titulo).text('Desafio '+ indiceMas1);
			
			$(VARS.dom_id_count_down).text(me.secondsBase); // timer text
			$(VARS.dom_id_form_respuesta).removeClass('alert-success alert-danger');
			$(VARS.dom_id_form_respuesta).html('');

		},
        // PLAY EVIDENCIA
        swichEvidencia: function() {
			var me = this;
            var index = me.indice;
            var indexEvi = me.indiceEvidencia;

            var data_evidencia = me.localData[index].data_evidencia;

			if (data_evidencia.length > 0) {
				if (indexEvi > (data_evidencia.length-1)) {
					alert("juego se termino! " + indexEvi)
				} else {
					console.log('------------------------');
					console.log('EVIDENCIA DATA');
					console.log('indice', index);
					console.log('indexEvi', indexEvi);
					console.log('DATA', data_evidencia[indexEvi]);
					console.log('------------------------');
					me.evidenciaCargarData(index, indexEvi, data_evidencia[indexEvi]);
					me.evidenciaIniciarJuego(index, indexEvi, data_evidencia[indexEvi]);

				}
			} else {
				alert("no existe data Evidencia");
			}
        },
        evidenciaCargarData: function(indice, indiceEvidencia, data) {
			var me = this;
            // contruyendo botones con eventos
			$(VARS.dom_id_form_respuesta).html('');
			$(VARS.dom_id_count_down).text(me.secondsBase); // timer text
            $(VARS.dom_id_evidencia_texto).text(data.texto);
            $(VARS.dom_id_imagen).attr('src', context.url + '/' + data.imagen);
			
			$(VARS.dom_id_form_respuesta).removeClass('alert-success alert-danger');
			// blockear fieldset;
			$(VARS.dom_id_fieldset_blockear).prop('disabled',true);
			// cargar evidencia
			$(VARS.dom_id_form_opcion_pregunta).text(data.pregunta_text.toUpperCase());
            cargarBotones(data);

            /**
			* mostrar botones
            */
            function cargarBotones(dataEvidencia) {
				var row = '{{for data_formulario}}<div class="row"><div class="col-md-12"><button class="btn-formulario x-btn-yellow col-md-12 col-sm-12 col-xs-12 btn btn-lg margin-bottom-5" data-respuesta="{{:respuesta}}">{{:~upper(description)}}</button></div></div>{{/for}}';
				var tmpl = $.templates(row);
				var tmplHtml = tmpl.render(dataEvidencia, myHelpers);
				$(VARS.dom_id_form_opcion_respuesta).html(tmplHtml);
            }

        },
        evidenciaIniciarJuego: function(indice, indiceEvidencia, data) {
			var me = this;
            me.helpPlayAudioEvidencia(indice, indiceEvidencia, data.audio);
        },

		/*
		************************************************************
		* HELPER
		************************************************************
		*/
		helpPlayAudioEscenario: function(indice, sourceUrl) {
			var me = this;
			var key = 'soundEscenario' + '_' + indice;
			console.log('escenario key :', key)
            soundManager.createSound({
                id: key,
                url: context.url + '/' + sourceUrl,
                onfinish: function() {
                    // al terminar audio
                    me.swichEvidencia();
                }
            });
            soundManager.play(key);
		},
		helpPlayAudioEvidencia: function(indice, indiceEvidencia, sourceUrl) {
			var me = this;
			var seconds = (me.secondsBase-1);
			var key = 'soundEvidencia' + '_' + indice +'_' + indiceEvidencia;
			console.log('evidencia key :', key)
			soundManager.createSound({
				id: key,
				url: context.url + '/' + sourceUrl,
				onfinish: function() {
					// desblockear fieldset;
					$(VARS.dom_id_fieldset_blockear).prop('disabled', false);
					// timer on
					me.countdownTimer = setInterval( function() {
						var remainingSeconds = seconds % 60;
						$(VARS.dom_id_count_down).text(remainingSeconds);
						if (seconds === 0) {
							clearInterval(me.countdownTimer) // stop timer
							// NEXT LEVEL
							setTimeout(function() {
								me.helpNextLevel();
							}, 100);
						} else {
							seconds--;
						}
					}, 1000);
					
				}
			});
			soundManager.play(key);
		},
		helpGetDateTime: function() {
			var now     = new Date();
			var year    = now.getFullYear();
			var month   = now.getMonth()+1;
			var day     = now.getDate();
			var hour    = now.getHours();
			var minute  = now.getMinutes();
			var second  = now.getSeconds();
			if(month.toString().length == 1) {
				var month = '0'+month;
			}
			if(day.toString().length == 1) {
				var day = '0'+day;
			}
			if(hour.toString().length == 1) {
				var hour = '0'+hour;
			}
			if(minute.toString().length == 1) {
				var minute = '0'+minute;
			}
			if(second.toString().length == 1) {
				var second = '0'+second;
			}
			var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
			return dateTime;
		},
		helpReadIdUser: function() {
			return storage.get('user_id');
		},
		helpGetDomButtonSuccessWrong: function(el) {
			var me = this;
			var dataEvidencia = me.currentEvidencia();
			var buttons = $(VARS.dom_id_form_opcion_respuesta).find($('.btn-formulario'));
			
			$(buttons).each(function(key, element) {
				if ($.trim(el.text()) === $.trim($(element).text())) {
					el.removeClass('x-btn-yellow');
					if (el.attr('data-respuesta') == 'false') {
						el.toggleClass( "x-btn-1-wrong" );
						$(VARS.dom_id_form_respuesta)
							.addClass('alert-danger')
							.html(dataEvidencia.respuesta_false);
						
						soundManager.createSound({
							id:'error',
							url: context.url + '/public/audio/extra/error.mp3',
							onfinish: function(el) {
								// esperar 2'' para siguiente nivel
								setTimeout(function(el) {
									me.helpNextLevel(el);						
								}, 5000);
							}
						});
						soundManager.play('error');
					} else if(el.attr('data-respuesta') == 'true') {
						el.toggleClass( "x-btn-1-green" );
						$(VARS.dom_id_form_respuesta)
							.addClass('alert-success')
							.html(dataEvidencia.respuesta_true);
						
						me.puntos++;
						$(VARS.dom_id_div_puntos).html(me.puntos);
						// esperar 2'' para siguiente nivel
						setTimeout(function(el) {
							me.helpNextLevel(el);						
						}, 5000);
					}
				} else {
					$(element).attr('disabled', 'disabled').addClass('disabled');
				}

			});

		return true;
	},
	helpNextLevel: function(el) {
		console.log('EL', el);
		var me = this;
		var curData = me.localData;
		var _1_escenario = me.indice; // escenario
		var _2_evidencia = me.indiceEvidencia; // evidencia


		// preguntar que nivel
		// + siguiente nivel		'siguiente escenario'
		// + siguiente subnivel		'siguiente evidencia'

		if (_2_evidencia < (curData[_1_escenario].data_evidencia.length)-1) {
			_2_evidencia++;

			// NEXT EVIDENCIA
			// SET VALUES
			me.indice = _1_escenario; // escenario
			me.indiceEvidencia = _2_evidencia; // evidencia
			storage.set('app', me);
			me.swichEvidencia();

		} else {
			if (_1_escenario < curData.length) { //alert("siguiente escenario");
				_1_escenario++;
				_2_evidencia = 0;

				// NEXT ESCENARIO
				// SET VALUES
				me.indice = _1_escenario; // escenario
				me.indiceEvidencia = _2_evidencia; // evidencia
				storage.set('app', me);
				me.swichEscenario();

			}
		}




	},
	// parar proceso
	stop: function() {
		clearInterval(this.countdownTimer);
	}

};
