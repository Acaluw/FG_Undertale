import { EventEmitter } from 'stream';
import Constantes from '../constantes';
import Nivel1 from './nivel1';

//Clase HUD con 3 bitmaptext
export default class HUD extends Phaser.Scene {
    private vidasHUD : Phaser.GameObjects.BitmapText | undefined;
    private puntuacionHUD : Phaser.GameObjects.BitmapText | undefined;
    private objetivoHUD: Phaser.GameObjects.BitmapText | undefined;

    private width: number | undefined;
    private height: number | undefined;

    private nombreNivel: string | undefined;

    constructor(){
        super('HUD');
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void{
        //Otra forma de capturar la escena sin tener que pasarla por el constructor
        const nivel: Phaser.Scene = this.scene.get('Nivel1');//Necesitamos la escena asociada a los eventos, será Nivel1 
        nivel.events.on(Constantes.EVENTOS.VIDAS, this.actualizaVidas, this);
        let tamaletra=30;
        const border = this.add.image(150, this.height!-30, 'menu_options_border');
        const border_background = this.add.image(150, this.height!-30, 'menu_options_background');
        border.scaleX = 0.7;
        border.scaleY = 0.1;
        border_background.scaleX = 0.7;
        border_background.scaleY = 0.1;
        border_background.alpha = 0.7;
        //VIDAS
        this.vidasHUD = this.add.bitmapText(30, 20, Constantes.FUENTES.NOMBREFUENTE, Constantes.HUD.VIDAS+nivel.registry.get(Constantes.REGISTRO.VIDAS), tamaletra);
        //OBJETIVO
        this.objetivoHUD = this.add.bitmapText(20, this.height!-40, Constantes.FUENTES.NOMBREFUENTE, 'Objetivo: Consigue los caramelos', tamaletra);
        this.objetivoHUD.scaleX = 0.5;
        this.objetivoHUD.scaleY = 0.5;
    }

    private actualizaVidas(): void{
        this.vidasHUD!.text = Constantes.HUD.VIDAS + this.registry.get(Constantes.REGISTRO.VIDAS);
    }

    
}