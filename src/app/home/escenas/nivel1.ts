import Constantes from "../constantes";
import Jugador from '../gameobjects/jugador';
import Puertas from "../gameobjects/puertas";
import {Bala} from "../gameobjects/bala"
import BandaEnemigo from "../gameobjects/bandaEnemigo";
import bandaEnemigo from "../gameobjects/bandaEnemigo";
import menuoptions from "./menuoptions";
import knife from "../gameobjects/knife";
import Candy from "../gameobjects/candy";
import { BalaJugador } from "../gameobjects/bala";

interface Datos {
    x: number | undefined;
    y: number | undefined;
    salida: String;
    direccion: String;
}

// Plugin de dialogo
////////////////////////////////////////////////////////////////////////////////////
const COLOR_PRIMARY = 0x616161;
const COLOR_LIGHT = 0xffffff;

const GetValue = Phaser.Utils.Objects.GetValue;
var circulo_a: Phaser.GameObjects.Arc;
var interactuaC = false;
var finjuegoComprobante = false;

var createTextBox = function (scene: any, x: number, y: number, config: object) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            icon: scene.add.image(0, 0, 'playerIcon'),

            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'arrow').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
        .setOrigin(0)
        .layout();

    textBox.setInteractive().on('pointerdown', () => {
            var icon = textBox.getElement('action').setVisible(false);
            textBox.resetChildVisibleState(icon);
            if (textBox.isTyping && interactuaC == true) {
                textBox.stop(true);
            }
            else if (textBox.isLastPage && interactuaC == true) {
                textBox.destroy();
                interactuaC = false;
            }
            else {
                if (interactuaC == true){
                    textBox.typeNextPage();
                }
                
            }
        }, textBox)
        .on('pageend', function () {
            if (textBox.isLastPage && !textBox.isTyping) {
                return;
            }

            var icon = textBox.getElement('action').setVisible(true);
            textBox.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30',
                ease: 'Bounce',
                duration: 500,
                repeat: 0,
                yoyo: false
            });
        }, textBox)
    return textBox;
}

var getBBcodeText = function (scene: { rexUI: { add: { BBCodeText: (arg0: number, arg1: number, arg2: string, arg3: { fixedWidth: any; fixedHeight: any; fontSize: string; wrap: { mode: string; width: any; }; maxLines: number; }) => any; }; }; }, wrapWidth: any, fixedWidth: any, fixedHeight: any) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 2
    })
}
////////////////////////////////////////////////////////////////////////////////////

export default class Nivel1 extends Phaser.Scene {


    public jugador!: Jugador;
    public ancho!: integer;
    public alto!: integer;
    private balase!: Phaser.GameObjects.Group;
    private lanzaCuchillo!: Phaser.GameObjects.Group;
    public mapaNivel!: Phaser.Tilemaps.Tilemap;
    private lastFirede = 0;
    private mapaTileset!: Phaser.Tilemaps.Tileset;
    private capaMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private capasueloMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private background!: Phaser.GameObjects.Sprite;
    private flowey!: Phaser.GameObjects.Sprite;
    public knife!: knife;
    public candy!: Candy;
    private laser: any;
    private bandaEnemigo01 !: BandaEnemigo;
    private bandaEnemigo02 !: BandaEnemigo;
    private bandaEnemigo03 !: BandaEnemigo;
    private emitterCuchillo: any;
    private emitterCaramelo: any;
    puertas!: Puertas;

    public datosPuertas: { [key: string]: Datos } = {};


    public puntuacion!: number;
    public static vidas: number;

    private joystick: any;
    private mijoystick: any;
    public joystickCursors: any;
    private dialogbox: any;

    private balasj!: Phaser.GameObjects.Group;//Balas jugador


    constructor() {
        super(Constantes.ESCENAS.NIVEL1);
    }

    preload()
    {
        //Si no se carga al ser un scenePlugin, se debe cargar como tal aqui
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create()
    {   
        var miestilo = {
            fill: '#ffffff',
            fontFamily: 'monospace',
            lineSpacing: 4
        };

        interactuaC = false;
        finjuegoComprobante = false;

        this.ancho = this.sys.game.canvas.width;
        this.alto = this.sys.game.canvas.height;

        this.cameras.main.fadeIn(1000, 0, 0, 0)

        //Cargar Tilemap
        this.mapaNivel = this.make.tilemap({ key: Constantes.MAPAS.NIVEL1.TILEMAPJSON, tileWidth: 32, tileHeight: 32 });//Tiene que cuadrar con lo que se puso en Tiled
        this.physics.world.bounds.setTo(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);//Límites del mundo
        //Se añade el Tileset (conjunto de patrones  base del mapa) para poder añadir sus capas
        this.mapaTileset = this.mapaNivel.addTilesetImage(Constantes.MAPAS.TILESET);
  
        //Se crean los POOLS
        this.balase = this.physics.add.group({
            classType: Bala,
            maxSize: 3,
            runChildUpdate: true
        });
        this.lanzaCuchillo = this.physics.add.group({
            classType: knife,
            maxSize: 1,
            runChildUpdate: true
        });

        //Se añade el mapa
        //Se añaden las capas
        this.capasueloMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.NIVEL1.CAPACOLISIONES, this.mapaTileset); //Crea la capa 
        this.capasueloMapaNivel.setCollisionByExclusion([-1]);//Hacemos la capa colisionable
        this.capaMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.NIVEL1.CAPAMAPEADO, this.mapaTileset); //Crea la capa como no colisionable 

        //Se añade el jugador
        this.mapaNivel.findObject(Constantes.JUGADOR.ID, (d: any) => {
            this.jugador = new Jugador({
                escena: this,
                x: d.x,
                y: d.y,
                textura: Constantes.JUGADOR.ID
            });
        });

        //Se añaden objetos
        //Arma cuchillo
        this.mapaNivel.findObject('knife', (d: any) =>{
            this.knife = new knife({
                escena: this,
                x: d.x,
                y: d.y
            });  
        });
        this.physics.add.collider(this.knife, this.jugador);
        //Objeto caramelos
        this.mapaNivel.findObject('candy', (d:any) => {
            this.candy = new Candy({
                escena: this,
                x: d.x,
                y: d.y
            });
        });
        this.physics.add.collider(this.candy, this.jugador);

        //Implementacion de particulas
        var shape1 = new Phaser.Geom.Circle(0, 0, 12);
        var shape2 = new Phaser.Geom.Rectangle(0, 0, 21, 30);

        var particles = this.add.particles('flares');

        this.emitterCuchillo = particles.createEmitter({
            frame: { frames: [ 'blue', 'blue', 'blue' ], cycle: true },
            x: this.knife.x,
            y: this.knife.y,
            scale: { start: 0.08, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: shape1, quantity: 48, yoyo: false }
        });
        this.emitterCuchillo.setEmitZone({ type: 'edge', source: shape1, quantity: 48, yoyo: false });

        this.emitterCaramelo = particles.createEmitter({
            frame: { frames: [ 'red', 'red', 'red' ], cycle: true },
            x: this.candy.x-10,
            y: this.candy.y-15,
            scale: { start: 0.08, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: shape2, quantity: 48, yoyo: false }
        });
        this.emitterCaramelo.setEmitZone({ type: 'edge', source: shape2, quantity: 48, yoyo: false });

        //SONIDOS
        var musica = this.sound.add('musica',{volume: menuoptions.ambientSound/100});
        this.laser = this.sound.add('laser', {volume: menuoptions.effectsSound/100});
        musica.play({
            loop: true
        });


        var capaObjetos = this.mapaNivel.getObjectLayer('puertas');
        // Recorre los objetos de la capa
        capaObjetos.objects.forEach( (objeto) => {
            this.datosPuertas[objeto.name] = {x: objeto.x, y:objeto.y, salida:'---', direccion:'-'};
        });

        // Carga datos de puertas
        this.datosPuertas['001'].salida = '001out';
        this.datosPuertas['001out'].salida = '001';
        this.datosPuertas['002in'].salida = '002out';
        this.datosPuertas['002out'].salida = '002in';
        this.datosPuertas['003in'].salida = '003out';
        this.datosPuertas['003out'].salida = '003in';
        this.datosPuertas['004in'].salida = '004out';
        this.datosPuertas['004out'].salida = '004in';
        this.datosPuertas['005in'].salida = '005out';
        this.datosPuertas['005out'].salida = '005in';
        this.datosPuertas['006in'].salida = '006out';
        this.datosPuertas['006out'].salida = '006in';
        this.datosPuertas['007'].salida = '007in';
        this.datosPuertas['007in'].salida = '007';
        
        // Carga datos direccion de puertas
        this.datosPuertas['001'].direccion = 'up';
        this.datosPuertas['001out'].direccion = 'down';
        this.datosPuertas['002in'].direccion = 'up';
        this.datosPuertas['002out'].direccion = 'down';
        this.datosPuertas['003in'].direccion = 'up';
        this.datosPuertas['003out'].direccion = 'down';
        this.datosPuertas['004in'].direccion = 'up';
        this.datosPuertas['004out'].direccion = 'down';
        this.datosPuertas['005in'].direccion = 'up';
        this.datosPuertas['005out'].direccion = 'down';
        this.datosPuertas['006in'].direccion = 'right';
        this.datosPuertas['006out'].direccion = 'left';
        this.datosPuertas['007in'].direccion = 'up';
        this.datosPuertas['007'].direccion = 'down';

        this.puertas = new Puertas(this, 'puertas');
        this.physics.add.overlap(this.jugador, this.puertas, this.jugador.pasaPuerta as ArcadePhysicsCallback, undefined, this);

        //ANIMACION ENEMIGOS Y AÑADIDO DE ENEMIGOS
        this.anims.create({
            key: Constantes.FLOWEY.ANIMACION.BAILAR,
            frames: this.anims.generateFrameNames(Constantes.FLOWEY.ID, {
                start: 30,
                prefix: "sprite", 
                end: 38
            }),
            frameRate: 10, 
            repeat: -1 
        });

        
        this.mapaNivel.findObject(Constantes.FLOWEY.ID, (d: any) =>{
            this.flowey = this.add.sprite(d.x, d.y, Constantes.FLOWEY.ID, 'sprite30');
            this.flowey.anims.play(Constantes.FLOWEY.ANIMACION.BAILAR, true);
            this.flowey.scaleX = 1;
            this.flowey.scaleY = 1;
        });
        //Animacion de movimiento de enemigo01
        this.anims.create({
            key: Constantes.ENEMIGO01.ANIMACION.GESTOS,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGO01.ID, {
                start: 1,
                prefix: "sprite",
                end: 6
            }),
            frameRate: 2,
            repeat: -1
        });
        //Animacion de movimiento de enemigo02
        this.anims.create({
            key: Constantes.ENEMIGO02.ANIMACION.GESTOS,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGO02.ID, {
                start: 1,
                prefix: "sprite",
                end: 4
            }),
            frameRate: 2,
            repeat: -1
        });
        //Animacion de movimiento de enemigo03
        this.anims.create({
            key: Constantes.ENEMIGO03.ANIMACION.GESTOS,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGO03.ID, {
                start: 1,
                prefix: "sprite",
                end: 2
            }),
            frameRate: 2,
            repeat: -1
        });

        //////////////////////////////////////////////////////
        //ANIMACION ICONO GUARDADO
        this.anims.create({
            key: Constantes.GUARDAR.ANIMACION.MOVIMIENTO,
            frames: this.anims.generateFrameNames(Constantes.GUARDAR.ID, {
                start: 1,
                prefix: "sprite",
                end: 2
            }),
            frameRate: 3,
            repeat: -1
        });

        this.mapaNivel.findObject(Constantes.GUARDAR.ID, (d: any) =>{
            const save = this.add.sprite(d.x, d.y, Constantes.GUARDAR.ID, 'sprite1');
            save.anims.play(Constantes.GUARDAR.ANIMACION.MOVIMIENTO, true);
            save.scaleX = 1;
            save.scaleY = 1;
        });
        //////////////////////////////////////////////////////

        //////////////////////////////////////////////////////
        //Animacion esperar mirando abajo
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERAR,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 1,
                prefix: "sprite",
                end: 1
            }),
            frameRate: 1, 
            repeat: 2 
        });
        //Animacion esperar mirando a la derecha
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERARD,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 7,
                prefix: "sprite",
                end: 7
            }),
            frameRate: 1,
            repeat: 2
        });
        //Animacion esperar mirando hacia arriba
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERARA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 9,
                prefix: "sprite",
                end: 9
            }),
            frameRate: 1,
            repeat: 2 
        });
        //Animacion esperar mirando hacia la izquierda
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERARI,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 5,
                prefix: "sprite",
                end: 5
            }),
            frameRate: 1,
            repeat: 2 
        });
        //Animacion andar hacia la izquierda
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_IZQUIERDA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 5,
                prefix: "sprite",
                end: 6
            }),
            frameRate: 5,
            repeat: 2
        });
        //Animacion andar hacia la derecha
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_DERECHA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 7,
                prefix: "sprite", 
                end: 8
            }),
            frameRate: 5,
            repeat: 2 
        });
        //Animacion andar hacia arriba
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_ARRIBA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 9,
                prefix: "sprite",
                end: 12
            }),
            frameRate: 5, 
            repeat: 2
        });
        //Animacion andar hacia abajo
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_ABAJO,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 1,
                prefix: "sprite",
                end: 4
            }),
            frameRate: 5, 
            repeat: 2
        });
        //////////////////////////////////////////////////////


        //Configuracion de camara
        this.cameras.main.setBounds(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);
        this.cameras.main.zoom=2;
        this.cameras.main.startFollow(this.jugador);

        //FÍSICAS OBJETOS
        //Se añade la física del jugador con el nivel
        this.physics.add.collider(this.jugador, this.capasueloMapaNivel);
        this.bandaEnemigo01 = new bandaEnemigo(this, Constantes.MAPAS.NIVEL1.ENEMIGO01, Constantes.ENEMIGO01.ID, Constantes.ENEMIGO01.ANIMACION.GESTOS, 50);
        this.bandaEnemigo02 = new bandaEnemigo(this, Constantes.MAPAS.NIVEL1.ENEMIGO02, Constantes.ENEMIGO02.ID, Constantes.ENEMIGO02.ANIMACION.GESTOS, 50);
        this.bandaEnemigo03 = new bandaEnemigo(this, Constantes.MAPAS.NIVEL1.ENEMIGO03, Constantes.ENEMIGO03.ID, Constantes.ENEMIGO03.ANIMACION.GESTOS, 50);
        
        this.physics.add.collider(this.bandaEnemigo01, this.capasueloMapaNivel);
        this.physics.add.collider(this.bandaEnemigo02, this.capasueloMapaNivel);
        this.physics.add.collider(this.bandaEnemigo03, this.capasueloMapaNivel);

        this.physics.add.overlap(this.jugador, this.bandaEnemigo01, this.colisionJugador as ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.jugador, this.bandaEnemigo02, this.colisionJugador as ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.jugador, this.bandaEnemigo03, this.colisionJugador as ArcadePhysicsCallback, undefined, this);

        //Se inicializan datos del juego y que variarán según eventos
        this.puntuacion = 0;
        Nivel1.vidas = 5;
        this.physics.add.collider(this.jugador, this.balase, this.colision as ArcadePhysicsCallback, undefined, this);

        //Inicialización del HUD
        this.registry.set(Constantes.REGISTRO.VIDAS, Nivel1.vidas);
        this.events.emit(Constantes.EVENTOS.VIDAS);

        //Joystick
        this.mijoystick = this.joystick.add(this.scene, {
        x: this.ancho * .3,
        y: this.alto * .60,
        radius: 25,//de separación del joystick
        base: this.add.circle(0, 0, 25, 0x888888).setAlpha(0.6),
        thumb: this.add.circle(0, 0, 15, 0xcccccc).setAlpha(0.6),
        dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3  //Direcciones que se pueden utilizar
        })
        this.joystickCursors = this.mijoystick.createCursorKeys();

        //Botones independientes
        circulo_a = this.add.circle(this.ancho * .72, this.alto * .6, 15, 0x008000).setAlpha(0.6).setInteractive();
        var circulo_b = this.add.circle(this.ancho * .685, this.alto * .68, 15, 0xff0000).setAlpha(0.6).setInteractive();
        this.input.addPointer(1); //Para que pueda tener un segundo punto de entrada a la pantalla (un segundo control) 
        this.botonpulsado(circulo_a, 'a');
        this.botonpulsado(circulo_b, 'b');
        circulo_a.setScrollFactor(0);
        circulo_b.setScrollFactor(0);//Fijado a cámara
        var texto_circulo_a = this.add.text(this.ancho * .7155, this.alto * .582, 'A', miestilo);
        var texto_circulo_b = this.add.text(this.ancho * .681, this.alto * .664, 'B', miestilo);
        texto_circulo_a.setScrollFactor(0);
        texto_circulo_b.setScrollFactor(0);

        this.balasj = this.physics.add.group({
            classType: BalaJugador,
            maxSize: 1,
            runChildUpdate: true //permite actualizar el estado de la clase Bala
        });
        this.physics.add.overlap(this.balasj, this.bandaEnemigo01, this.colisionEnemigo as unknown as ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.balasj, this.bandaEnemigo02, this.colisionEnemigo as unknown as ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.balasj, this.bandaEnemigo03, this.colisionEnemigo as unknown as ArcadePhysicsCallback, undefined, this);

        //Configuracion tecla interaccion
        this.input.keyboard.on('keydown-C', () => {
            this.comprobarInteraccionConObjetos();
        });

        this.input.keyboard.on('keydown-X', () => {
            if(this.jugador.tieneCuchillo){
                this.dispararCuchillo()
            }
        });


    }
    finjuego(resultado: String){
        if (resultado == 'ganar' && finjuegoComprobante==false){
            finjuegoComprobante = true;
            this.scene.setVisible(false,Constantes.ESCENAS.HUD);
            this.sound.stopAll();
            this.cameras.main.fadeOut(150, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(200, () => {
                    this.scene.stop(Constantes.ESCENAS.NIVEL1);
                    this.scene.start(Constantes.ESCENAS.MENU);
                })
            })
        } else if (resultado == 'perder' && finjuegoComprobante==false){
            finjuegoComprobante = true;
            this.scene.setVisible(false,Constantes.ESCENAS.HUD);
            this.sound.stopAll();
            this.cameras.main.fadeOut(150, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(200, () => {
                    this.scene.stop(Constantes.ESCENAS.NIVEL1);
                    this.scene.start(Constantes.ESCENAS.GAMEOVER);
                })
            })
        }
    }

    botonpulsado(boton: Phaser.GameObjects.Arc, id: String) {
        boton.on('pointerdown', () => {
            this.registry.set('botonpulsado', true);
            if (id == 'a'){
                this.comprobarInteraccionConObjetos();
            }else if (id == 'b'){
                this.dispararCuchillo()
            }

        });
    }
    dispararCuchillo(){
        var balaj = this.balasj.get();//Coge del pool
                if (balaj && this.jugador.tieneCuchillo) {
                    this.jugador.getDireccionEsperar() == 1 ? 
                        balaj.fire(this.jugador.x, this.jugador.y, -1, 0)// dispara hacia arriba 
                        : this.jugador.getDireccionEsperar() == 2 ? 
                        balaj.fire(this.jugador.x, this.jugador.y, 1, 1) //Dispara hacia la derecha
                        : this.jugador.getDireccionEsperar() == 3 ?
                        balaj.fire(this.jugador.x, this.jugador.y, 1, 0) // Dispara hacia abajo
                        : balaj.fire(this.jugador.x, this.jugador.y, -1, 1) // Dispara hacia la izquierda
                }
    }
    comprobarInteraccionConObjetos(){
        var content = 'Debo de encontrar la forma de conseguir caramelos.'

        if (this.jugador.tieneCuchillo == true){
            content = 'Unas palabras resuenan en tu cabeza: \n Usa el botón interactivo "B" o la tecla "X" para atacar a tus enemigos y conseguir los caramelos.'
        }

        if (this.knife.visible == true){
            if ((Math.abs(this.jugador.body.x - this.knife.body.x)) <= 20  && (Math.abs(this.jugador.body.y - this.knife.body.y)) <= 16) {
                this.jugador.tieneCuchillo = true;
                this.emitterCuchillo.visible = false;
                this.knife.destroy();
                content = '¡Has obtenido: Cuchillo de juguete! \n Usa el botón interactivo "B" o la tecla "X" para atacar a tus enemigos y conseguir los caramelos.'
            }
        }

        if (this.candy.visible == true){
            if ((Math.abs(this.jugador.body.x - this.candy.body.x)) <= 21 && (Math.abs(this.jugador.body.y - this.candy.body.y)) <= 28){
                this.finjuego('ganar');
                this.emitterCaramelo.visible = false;
                this.candy.destroy();
            } else{
                if (interactuaC == false){
                    interactuaC = true;
                    createTextBox(this, this.cameras.main.scrollX+(this.cameras.main.width/2)-175, this.cameras.main.scrollY+(this.cameras.main.height/2)+15, {
                        wrapWidth: 200,
                        fixedWidth: 230,
                        fixedHeight: 40,
                    })
                    .start(content, 50);
                }
            }
        }
    }
    colisionJugador(jugador: Phaser.Physics.Arcade.Sprite, enemigo: Phaser.Physics.Arcade.Sprite): void {
        enemigo.destroy();//destruye la bala y vuelve al pool
        Nivel1.vidas--
    }
    colision(jugador: Phaser.Physics.Arcade.Sprite, enemigo: Phaser.Physics.Arcade.Sprite): void {
        enemigo.destroy();//destruye la bala y vuelve al pool
        Nivel1.vidas--
    }
    colisionEnemigo(cuchillo: Phaser.Physics.Arcade.Sprite, enemigo: bandaEnemigo): void {
        enemigo.permisoDisparo = false;
        cuchillo.destroy()
        
    }

    override update(time: any, delta: number) {//Se ejecuta cada x milisegundos

        this.jugador.update();//Se tiene que llamar al update de cada elemento

        if (Nivel1.vidas == 0){
            this.finjuego('perder');
        }

        if (interactuaC == false){
            this.input.keyboard.enabled = true;
        } else{
            this.input.keyboard.enabled = false;
            this.jugador.setVelocity(0,0);
            this.jugador.anims.stop();
        }
        this.bandaEnemigo01.update(time,delta)
        this.bandaEnemigo02.update(time,delta)
        this.bandaEnemigo03.update(time,delta)

        if (time > this.lastFirede) {
            this.lastFirede = time + 500; //Tiempo entre balas
            var bala = this.balase.get();//Coge del pool
            if (bala) {
                if(Math.abs(this.flowey.y - this.jugador.y) <= 200 ){
                    this.laser.play();
                    bala.fire(this.flowey.x, this.flowey.y, 1);//Dispara hacia arriba
                }
            }
        }
    }

}