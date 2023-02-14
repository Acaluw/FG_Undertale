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

        const background = this.add.image(ancho / 2, alto / 2, Constantes.FONDOS.LOGO); // muestra imagen en posición 400,70
        background.setInteractive();//Cualquier elemento gráfico puede ser interactivo (texto, imagen, fondo, sprite, etc..)

        this.cambiarEscena(background, Constantes.ESCENAS.NIVEL1);//Se podría haber puesto el fondo interactivo para clickar y entrar en el juego
        console.log("Escena Menú Creada");

        //MUSICA
        var menumusica = this.sound.add('menunusic',{volume: 0.2});
        
        menumusica.play({
            loop: true
        });
    
    }

    override update() {//Se ejecuta cada x milisegundos
    }

    cambiarEscena(titulo: any, escena: string) {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.sound.stopAll();
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start(escena);
                })
            })            
        });   
    }


}