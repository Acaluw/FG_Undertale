//Se ejecuta este fichero en primer lugar
import 'phaser';
import Configuracion from './configuracion';

export default class Juego extends Phaser.Game{
    constructor(configuracion: Phaser.Types.Core.GameConfig){
        super(configuracion)
    }
}

const game = new Juego(Configuracion);


 