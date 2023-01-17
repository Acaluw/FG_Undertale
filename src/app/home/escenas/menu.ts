import Constantes from "../constantes";
import Miestilo from "../textos";


export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() //Ejecuta una única vez la precarga de los assets
    {
    }

    create() //Crea escena
    {
        const ancho = this.sys.canvas.width
        const alto = this.sys.canvas.height;

        const background = this.add.image(ancho / 2, alto / 2, Constantes.FONDOS.BANTHA); // muestra imagen en posición 400,70
        background.setInteractive();//Cualquier elemento gráfico puede ser interactivo (texto, imagen, fondo, sprite, etc..)

        this.cambiarEscena(background, Constantes.ESCENAS.NIVEL1);//Se podría haber puesto el fondo interactivo para clickar y entrar en el juego
        console.log("Escena Menú Creada");
        this.add.text(0, 0, 'Escena Menú Creada', Miestilo);
    }

    override update() {//Se ejecuta cada x milisegundos
    }

    cambiarEscena(titulo: any, escena: string) {
        titulo.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start(escena);
        });
    }


}