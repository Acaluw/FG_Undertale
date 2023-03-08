import Nivel1 from "../escenas/nivel1";


export default class Jugador extends Phaser.Physics.Arcade.Image {
    private escena: Nivel1;

    constructor(config: any) { //se le pasa escena para utilizar los objetos que contiene
        super(config.escena, config.x, config.y, 'knife', 0);
        this.escena = config.escena;
        this.escena.physics.world.enable(this);//Activo físicas para este objeto
        this.setImmovable(true);
        this.escena.add.existing(this);//Añade objeto a escena

        this.scaleX = 1;
        this.scaleY = 1;
    }
}