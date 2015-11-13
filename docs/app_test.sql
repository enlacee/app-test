-- Adminer 4.2.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `ac_alternativas`;
CREATE TABLE `ac_alternativas` (
  `id_alternativa` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_alternativa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ac_alternativas` (`id_alternativa`, `description`) VALUES
(1,	'accidente'),
(2,	'incidente'),
(3,	'persona'),
(4,	'material'),
(5,	'medio ambiente'),
(6,	'leve'),
(7,	'incapacitante'),
(8,	'mortal'),
(9,	'primer auxilio'),
(10,	'atención médica'),
(11,	'temporal'),
(12,	'permanente'),
(13,	'alto'),
(14,	'medio'),
(15,	'bajo');

DROP TABLE IF EXISTS `ac_alternativas_formularios`;
CREATE TABLE `ac_alternativas_formularios` (
  `id_alternativa_formulario` int(11) NOT NULL AUTO_INCREMENT,
  `id_formulario` int(11) NOT NULL,
  `id_alternativa` int(11) NOT NULL,
  PRIMARY KEY (`id_alternativa_formulario`),
  KEY `fk_alternativas_formularios_alternativas1_idx` (`id_alternativa`),
  KEY `fk_alternativas_formularios_formularios1_idx` (`id_formulario`),
  CONSTRAINT `fk_alternativas_formularios_alternativas1` FOREIGN KEY (`id_alternativa`) REFERENCES `ac_alternativas` (`id_alternativa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_alternativas_formularios_formularios1` FOREIGN KEY (`id_formulario`) REFERENCES `ac_formularios` (`id_formulario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ac_alternativas_formularios` (`id_alternativa_formulario`, `id_formulario`, `id_alternativa`) VALUES
(1,	1,	1),
(2,	1,	2),
(3,	2,	3),
(4,	2,	4),
(5,	2,	5),
(6,	3,	6),
(7,	3,	7),
(8,	3,	8),
(9,	4,	9),
(10,	4,	10),
(11,	4,	11),
(12,	4,	12),
(13,	5,	13),
(14,	5,	14),
(15,	5,	15),
(16,	6,	13),
(17,	6,	14),
(18,	6,	15);

DROP TABLE IF EXISTS `ac_escenarios`;
CREATE TABLE `ac_escenarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `path_audio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ac_escenarios` (`id`, `description`, `path_audio`) VALUES
(1,	'MUKITO se dispone a SUBIR por las ESCALERAS de la CHIMENEA.',	NULL),
(2,	'MUKITO estaba hambriento y abrió una lata de atún para el refrigerio.',	NULL),
(3,	'MUKITO trabaja sus soldaduras con normalidad en el taller de mantenimiento de su empresa, sin embargo el área de trabajo está desordenada.',	NULL),
(4,	'Un día normal de trabajo para nuestro MUKITO en las labores de interior mina, notemos la cercanía de equipos de trabajo.',	NULL),
(5,	'MUKITO se disponía a usar la sierra circular en el taller de carpintería. ',	NULL),
(6,	'MUKITO se dispone a subir por las escaleras de la chimenea ciega.',	NULL),
(7,	'Oh no!!! MUKITO está entrando a un frente luego de la voladura. Aún nadie desquinchó.',	NULL),
(8,	'MUKITO es el cuadrador de los volquetes.',	NULL),
(9,	'Día soleado, MUKITO realiza trabajos de clavado de cáncamos.',	NULL),
(10,	'MUKITO se encuentra en sus días de descanso. Nada mejor que cocinar un poco!',	NULL);

DROP TABLE IF EXISTS `ac_escenarios_evidencias`;
CREATE TABLE `ac_escenarios_evidencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_escenario` int(11) NOT NULL,
  `id_evidencia` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_escenarios_evidencias_escenarios_idx` (`id_escenario`),
  KEY `fk_escenarios_evidencias_evidencias1_idx` (`id_evidencia`),
  CONSTRAINT `fk_escenarios_evidencias_escenarios` FOREIGN KEY (`id_escenario`) REFERENCES `ac_escenarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_escenarios_evidencias_evidencias1` FOREIGN KEY (`id_evidencia`) REFERENCES `ac_evidencias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ac_escenarios_evidencias` (`id`, `id_escenario`, `id_evidencia`) VALUES
(1,	1,	1),
(2,	1,	2),
(3,	1,	3),
(4,	1,	4),
(5,	1,	5);

DROP TABLE IF EXISTS `ac_evidencias`;
CREATE TABLE `ac_evidencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imagen` varchar(255) DEFAULT NULL,
  `texto` varchar(255) DEFAULT NULL,
  `audio` varchar(255) DEFAULT NULL,
  `alternativa` varchar(255) DEFAULT 'opcion1, opcion2,opcion3',
  `alternativa_rpta` varchar(45) DEFAULT 'opcion1',
  `id_formulario` int(11) DEFAULT NULL,
  `respuesta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_evidencias_formularios1_idx` (`id_formulario`),
  KEY `fk_evidencias_alternativas1_idx` (`respuesta`),
  CONSTRAINT `fk_evidencias_alternativas1` FOREIGN KEY (`respuesta`) REFERENCES `ac_alternativas` (`id_alternativa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_evidencias_formularios1` FOREIGN KEY (`id_formulario`) REFERENCES `ac_formularios` (`id_formulario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ac_evidencias` (`id`, `imagen`, `texto`, `audio`, `alternativa`, `alternativa_rpta`, `id_formulario`, `respuesta`) VALUES
(1,	NULL,	'CAE de una altura de 03  metros. Al caer se lastima la pierna izquierda.',	NULL,	'opcion1, opcion2,opcion3',	'opcion1',	1,	1),
(2,	NULL,	'Se comprobó que el único daño lo recibió MUKITO, específicamente en la pierna izquierda.',	NULL,	'opcion1, opcion2,opcion3',	'opcion1',	2,	3),
(3,	NULL,	'MUKITO fue trasladado al tópico,  en donde se diagnosticó que sufrió una fractura en la pierna.',	NULL,	'opcion1, opcion2,opcion3',	'opcion1',	3,	7),
(4,	NULL,	'El médico de turno indicó que MUKITO deberá guardar esctricto reposo por un período de 3 meses.',	NULL,	'opcion1, opcion2,opcion3',	'opcion1',	4,	11),
(5,	NULL,	'Evaluemos la severidad y probabilidad del evento.',	NULL,	'opcion1, opcion2,opcion3',	'opcion1',	5,	13);

DROP TABLE IF EXISTS `ac_formularios`;
CREATE TABLE `ac_formularios` (
  `id_formulario` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_formulario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ac_formularios` (`id_formulario`, `titulo`) VALUES
(1,	'f1'),
(2,	'f2'),
(3,	'f3'),
(4,	'f4'),
(5,	'f5'),
(6,	'f6');

DROP TABLE IF EXISTS `ac_juego`;
CREATE TABLE `ac_juego` (
  `id` int(11) NOT NULL,
  `codigo_usuario` varchar(10) DEFAULT NULL,
  `puntos` varchar(45) DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `metadata` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `ac_respuestas`;
CREATE TABLE `ac_respuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_usuario` varchar(10) DEFAULT NULL,
  `id_escenario_evidencia` int(11) NOT NULL,
  `rpta` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_respuestas_escenarios_evidencias1_idx` (`id_escenario_evidencia`),
  CONSTRAINT `fk_respuestas_escenarios_evidencias1` FOREIGN KEY (`id_escenario_evidencia`) REFERENCES `ac_escenarios_evidencias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2015-11-13 07:56:23
