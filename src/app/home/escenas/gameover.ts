import Constantes from "../constantes";

export default class GameOver extends Phaser.Scene {

    public static musica: any;

    constructor() {
        super('GameOver');
    }

    preload()
    {
    }

    create()
    {
        const ancho = this.sys.canvas.width
        const alto = this.sys.canvas.height;

        this.cameras.main.fadeIn(150, 0, 0, 0);

        //Creacion de elementos
        const background = this.add.image(ancho / 2, alto / 2, 'game_over');

        background.setInteractive();
        
        this.cambiarEscena(background, Constantes.ESCENAS.MENU);

        //MUSICA
        GameOver.musica = this.sound.add('game_over_sound',{volume: 0.25});        
        GameOver.musica.play({
            loop: true
        });
    
        this.game.scale.refresh();
    }

    override update() {
    }

    cambiarEscena(titulo: any, escena: string) 
    {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(150, 0, 0, 0);
            this.tweens.add({
                targets: GameOver.musica,
                volume: 0,
                duration: 200,
                onComplete: () => {this.sound.stopAll();}
            });
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(300, () => {
                    this.scene.stop(Constantes.ESCENAS.GAMEOVER);
                    this.scene.start(escena);
                })
            })            
        });   
    }
}