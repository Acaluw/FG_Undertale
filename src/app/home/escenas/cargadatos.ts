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
        this.load.tilemapTiledJSON(Constantes.MAPAS.NIVEL1.TILEMAPJSON, 'assets/mapas/Principio/maparuinasv2.json');
        this.load.image(Constantes.MAPAS.TILESET, 'assets/mapas/Principio/maparuinas.png');
        //Fondos e imágenes
        this.load.image('menu_background_parallax', 'assets/imagenes/menu/background_parallax.png');
        this.load.image('menu_background', 'assets/imagenes/menu/background.png');
        this.load.image(Constantes.FONDOS.LOGO, 'assets/imagenes/menu/menulogo.png');
        this.load.image('menu_subtitle', 'assets/imagenes/menu/menu_subtitle.png');
        this.load.image('menu_team', 'assets/imagenes/menu/menu_team.png');
        this.load.image('menu_team_made', 'assets/imagenes/menu/menu_team_made.png');
        this.load.image('member_javier', 'assets/imagenes/menu/member_javier.png');
        this.load.image('member_juan', 'assets/imagenes/menu/member_juan.png');
        this.load.image('member_alvaro', 'assets/imagenes/menu/member_alvaro.png');
        this.load.image('menu_play', 'assets/imagenes/menu/menu_play.png');
        this.load.image('menu_options', 'assets/imagenes/menu/menu_options.png');
        this.load.image('menu_options_title', 'assets/imagenes/menu/menu_options_title.png');
        this.load.image('menu_options_border', 'assets/imagenes/menu/options_border.png');
        this.load.image('menu_options_background', 'assets/imagenes/menu/options_background.png');
        this.load.image('menu_options_back', 'assets/imagenes/menu/menu_back.png');
        this.load.image('menu_ambient_vol', 'assets/imagenes/menu/menu_ambientVol.png');
        this.load.image('menu_effects_vol', 'assets/imagenes/menu/menu_effectsVol.png');
        this.load.atlas('menu_options_button', 'assets/imagenes/menu/spritesheetBtn.png', 'assets/imagenes/menu/spritesheetBtn.json');
        this.load.image('game_over', 'assets/imagenes/game_over.png');
        //Fuente
        this.load.bitmapFont(Constantes.FUENTES.NOMBREFUENTE, 'assets/fuentes/gothic.png', 'assets/fuentes/gothic.xml');
        //Particulas
        this.load.atlas('flares', 'assets/imagenes/particulas/flares.png', 'assets/imagenes/particulas/flares.json');
        //Atlas Jugador
        this.load.atlas(Constantes.JUGADOR.ID, 'assets/imagenes/jugador/spritesheet.png', 'assets/imagenes/jugador/spritesheet.json');
        this.load.atlas(Constantes.GUARDAR.ID, 'assets/imagenes/miscelaneo/guardar/spritesheet.png', 'assets/imagenes/miscelaneo/guardar/spritesheet.json');
        //Miscelaneos
        this.load.image('knife', 'assets/imagenes/knife.png');
        this.load.image('candy', 'assets/imagenes/candy.png');
        this.load.image('bala', './assets/imagenes/tear.png');
        this.load.image('puerta', './assets/imagenes/puerta.png');
        this.load.image('arrow', 'assets/imagenes/arrow-down.png');
        this.load.image('playerIcon', 'assets/imagenes/playerIcon.png');
        //Atlas Enemigos
        this.load.atlas(Constantes.FLOWEY.ID, 'assets/imagenes/enemigos/flowey/spritesheet.png', 'assets/imagenes/enemigos/flowey/spritesheet.json');
        this.load.atlas(Constantes.ENEMIGO01.ID, 'assets/imagenes/enemigos/varios/spritesheetM01.png', 'assets/imagenes/enemigos/varios/spritesheetM01.json');
        this.load.atlas(Constantes.ENEMIGO02.ID, 'assets/imagenes/enemigos/varios/spritesheetM02.png', 'assets/imagenes/enemigos/varios/spritesheetM02.json');
        this.load.atlas(Constantes.ENEMIGO03.ID, 'assets/imagenes/enemigos/varios/spritesheetM03.png', 'assets/imagenes/enemigos/varios/spritesheetM03.json');
        //Carga de sonidos
        this.load.audio('musica', 'assets/audio/musica/ruinas.mp3');
        this.load.audio('menunusic', 'assets/audio/musica/menu.mp3');
        this.load.audio('laser', 'assets/audio/musica/laser.mp3');
        this.load.audio('game_over_sound', 'assets/audio/musica/game_over.mp3');
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