import Constantes from "../constantes";
import Phaser from "phaser";

export default class CargaDatos extends Phaser.Scene {

    private barraC!: Phaser.GameObjects.Graphics; //barra de carga
    //Las ! en las variables indican que ese valor no puede ser ni null ni undefined, siempre ha de tener un valor

    constructor() {
        super('CargaDatos');
    }

    preload() {
        this.cameras.main.setBackgroundColor(0x0000FF); //se configura la cámara
        this.creaBarras();
        console.log("Enviando mensaje al LOG del navegador");

        //Declaramos variables utilizadas en el evento load
        var barraP!: Phaser.GameObjects.Graphics; //barra de progreso
        var anchoCameras = this.cameras.main.width;
        var altoCameras = this.cameras.main.height;
        barraP = this.add.graphics();

        //Listener mientras (PROGRESS) se cargan los assets. No usa función lambda
        this.load.on(
            'progress',
            function (value: number) {
                barraP.clear();
                barraP.fillStyle(0x125555, 1);
                barraP.fillRect(
                    anchoCameras / 4,
                    altoCameras / 2 - 16,
                    (anchoCameras / 2) * value, 
                    16);
            },
            this
        );
        

        //Listener cuando se hayan cargado (COMPLETE) todos los Assets. Usa función lambda
        this.load.on(
            'complete', () => { //arrow-function o función lambda
                this.scene.start(Constantes.ESCENAS.MENU); //Salta a la escena de Menú
            },

        );


        //CARGA DE ASSETS
       
        //Mapas

        //Fondos e imágenes
        this.load.image(Constantes.FONDOS.LOGO, 'assets/imagenes/menulogo.png');

        //Fuente

        //Atlas Jugador
        this.load.atlas(Constantes.JUGADOR.ID, 'assets/imagenes/jugador/spritesheet.png', 'assets/imagenes/jugador/spritesheet.json');
        this.load.atlas(Constantes.GUARDAR.ID, 'assets/imagenes/miscelaneo/guardar/spritesheet.png', 'assets/imagenes/miscelaneo/guardar/spritesheet.json');
        //Atlas Enemigo - JAWA

        //Atlas Enemigo - Mynock


    }
    private creaBarras(): void {
        this.barraC = this.add.graphics();
        this.barraC.fillStyle(0xffffff, 1);//color,alfa


        this.barraC.fillRect(
            this.cameras.main.width / 4 - 2, //x de rectángulo
            this.cameras.main.height / 2 - 18,//y de rectángulo
            this.cameras.main.width / 2 + 4, //ancho
            20 //alto
        );
    }

}