import { EventEmitter } from 'stream';
import Constantes from '../constantes';
import Nivel1 from './nivel1';

//Clase HUD con 3 bitmaptext
export default class HUD extends Phaser.Scene {
    private vidasHUD : Phaser.GameObjects.BitmapText | undefined;
    private puntuacionHUD : Phaser.GameObjects.BitmapText | undefined;
    //private beskarHUD : Phaser.GameObjects.BitmapText | undefined;

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
        nivel.events.on(Constantes.EVENTOS.PUNTUACION, this.actualizaPuntuacion, this);
        //nivel.events.on(Constantes.EVENTOS.BESKAR, this.actualizaBeskar, this);
        let tamaletra=30;
        //VIDAS
        this.vidasHUD = this.add.bitmapText(20, 20, Constantes.FUENTES.NOMBREFUENTE, Constantes.HUD.VIDAS+nivel.registry.get(Constantes.REGISTRO.VIDAS), tamaletra);
        this.vidasHUD.setTint(0xFF8000, 0xE0C0A0);//La fuente ha de ser blanca para tintar 
        //PUNTUACIÓN
        this.puntuacionHUD= this.add.bitmapText(this.width! - 130, 20, Constantes.FUENTES.NOMBREFUENTE,'0000', tamaletra);
        this.puntuacionHUD.setTint(0xFF8000, 0xE0C0A0); //La fuente ha de ser blanca para tintar
        //BESKAR
        //this.beskarHUD= this.add.bitmapText(20 ,55, Constantes.FUENTES.NOMBREFUENTE, Constantes.HUD.BESKAR+nivel.registry.get(Constantes.REGISTRO.BESKAR),tamaletra);
        //this.beskarHUD.setTint(0x9b9b9b,0xFFFFFF,0x9b9b9b,0xFFFFFF); //La fuente ha de ser blanca para tintar
        //console.log("Escena HUD Creada");
    }

    private actualizaVidas(): void{
        this.vidasHUD!.text = Constantes.HUD.VIDAS + this.registry.get(Constantes.REGISTRO.VIDAS);
    }

    private actualizaPuntuacion(): void {
        //Función PAD permite configurar el tamaño representado de un número Pad(valor,número,carácter inicial,dirección[1=de izq a der])
        this.puntuacionHUD!.text = Phaser.Utils.String.Pad(this.registry.get(Constantes.REGISTRO.PUNTUACION), 4, '0', 1);
    }

    /*private actualizaBeskar(): void {
        this.beskarHUD!.text = Constantes.HUD.BESKAR+ Phaser.Utils.String.Pad(this.registry.get(Constantes.REGISTRO.BESKAR), 1,'0',1);
    }*/

}