import Nivel1 from "../escenas/nivel1";


export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    private escena: Nivel1;

    constructor(config: any) { //se le pasa escena para utilizar los objetos que contiene
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;//Importante: Necesito acceder a los objetos de la escena
        this.escena.physics.world.enable(this);//Activo físicas para este objeto
        this.setCollideWorldBounds(true);//Para que no se salga del mapa
        this.escena.add.existing(this);//Añade objeto a escena

        this.scaleX = 0.5;
        this.scaleY = 0.5;
    }
}