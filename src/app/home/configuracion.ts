import CargaDatos from './escenas/cargadatos';
import Nivel1 from './escenas/nivel1';
import Menu from './escenas/menu';

const Configuracion = {
  type: Phaser.AUTO, //AUTO: Automáticamente elige WebGL o Canvas

  scene: [CargaDatos, Menu, Nivel1], //Las carga (preload+create) por este orden y luego se decide el flujo.  
  scale: {
    width: 1036, //Se establece un ratio de 2,16 aprox (ANDROID). Para WEB normal se podría haber usado 800x600 
    height: 480,
  },
  render: {
    pixelArt: true, //Activa pixelart
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, //SIN GRAVEDAD
      //gravity: { y: 600 }, //CON GRAVEDAD
      debug: true
    }
  },
  parent: 'divjuego', //Se tiene que añadir para IONIC
};

export default Configuracion;
