import Constantes from "../constantes";
import menuoptions from "./menuoptions";


export default class Menu extends Phaser.Scene {

    public static musica: any;

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

        //Creacion de elementos
        const background = this.add.image(ancho / 2, alto / 2, 'menu_background');
        const title = this.add.image(ancho / 2, alto / 7, Constantes.FONDOS.LOGO);
        const subtitle = this.add.image(ancho / 2, (alto / 5)+25, 'menu_subtitle');
        const btnPlay = this.add.image(ancho/2, (alto/2)-30, 'menu_play');
        const btnOptions = this.add.image(ancho/2, (alto/2)+40, 'menu_options');
        const team_title = this.add.image(ancho/2+95, (alto/2)+160, 'menu_team');
        const team_made = this.add.image(ancho/2-125, (alto/2)+165, 'menu_team_made');
        const member_javier = this.add.image(120, alto-20, 'member_javier');
        const member_juan = this.add.image(ancho/2, alto-20, 'member_juan');
        const member_alvaro = this.add.image(ancho-120, alto-20, 'member_alvaro');

        
        //Ajustes de elementos
        title.scaleX = 0.5;
        title.scaleY = 0.5;
        subtitle.scaleX = 0.5;
        subtitle.scaleY = 0.5;
        btnPlay.scaleX = 0.5;
        btnPlay.scaleY = 0.5;
        btnOptions.scaleX = 0.5;
        btnOptions.scaleY = 0.5;
        team_title.scaleX = 0.5;
        team_title.scaleY = 0.5;
        team_made.scaleX = 0.5;
        team_made.scaleY = 0.5;
        member_javier.scaleX = 0.3;
        member_javier.scaleY = 0.3;
        member_juan.scaleX = 0.3;
        member_juan.scaleY = 0.3;
        member_alvaro.scaleX = 0.3;
        member_alvaro.scaleY = 0.3;

        //Acciones de elementos
        btnPlay.setInteractive();
        btnOptions.setInteractive();


        this.comenzarJuego(btnPlay, Constantes.ESCENAS.NIVEL1);
        this.cambiarEscena(btnOptions, Constantes.ESCENAS.MENUOPTIONS);
        console.log("Escena Menú Creada");

        //MUSICA
        Menu.musica = this.sound.add('menunusic',{volume: menuoptions.ambientSound/100});
        
        Menu.musica.play({
            loop: true
        });
    
        this.game.scale.refresh(); //Reescala al tamaño de la pantalla
    }

    override update() {//Se ejecuta cada x milisegundos
    }

    cambiarEscena(titulo: any, escena: string) 
    {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(150, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(300, () => {
                    this.scene.start(escena);
                })
            })            
        });   
    }

    comenzarJuego(titulo: any, escena: string) {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.tweens.add({
                targets: Menu.musica,
                volume: 0,
                duration: 500,
                onComplete: () => {this.sound.stopAll();}
            });
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start(escena);
                    this.scene.start(Constantes.ESCENAS.HUD);
                    this.scene.bringToTop(Constantes.ESCENAS.HUD);
                })
            })            
        });   
    }
}