import Constantes from "../constantes";
import Jugador from '../gameobjects/jugador';
import Puertas from "../gameobjects/puertas";
import Miestilo from "../textos";
import {Bala} from "../gameobjects/bala"
import BandaEnemigo from "../gameobjects/bandaEnemigo";
import bandaEnemigo from "../gameobjects/bandaEnemigo";
import menuoptions from "./menuoptions";
import knife from "../gameobjects/knife";
interface Datos {
    x: number | undefined;
    y: number | undefined;
    salida: String;
    direccion: String;
  }

export default class Nivel1 extends Phaser.Scene {


    public jugador!: Jugador;
    public ancho!: integer;
    public alto!: integer;
    private balase!: Phaser.GameObjects.Group;
    public mapaNivel!: Phaser.Tilemaps.Tilemap;
    private lastFirede = 0;
    private mapaTileset!: Phaser.Tilemaps.Tileset;
    private capaMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private capasueloMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private background!: Phaser.GameObjects.Sprite;
    private flowey!: Phaser.GameObjects.Sprite;
    private knife!: knife;
    private laser: any;
    private bandaEnemigo01 !: BandaEnemigo;
    private bandaEnemigo02 !: BandaEnemigo;
    private bandaEnemigo03 !: BandaEnemigo;
   
   
    puertas!: Puertas;

      
    public datosPuertas: { [key: string]: Datos } = {};


    public puntuacion!: number;
    public vidas!: number;

    private joystick: any;//Variable de mapeo del plugin JOYSTICK
    private mijoystick: any;//Variable mapeada  del plugin JOYSTICK
    public joystickCursors: any;//Cursores virtuales para poder utilizar en JUGADOR.TS

    constructor() {
        super(Constantes.ESCENAS.NIVEL1);
    }

    preload() //Ejecuta una única vez la precarga de los assets
    {
    }

    create() //Crea escena
    {   
        var miestilo = {
            fill: '#ffffff',
            fontFamily: 'monospace',
            lineSpacing: 4
        };

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

        //Misceláneo
        this.mapaNivel.findObject('knife', (d: any) =>{
            this.knife = new knife({
                escena: this,
                x: d.x,
                y: d.y,
                textura: this.add.image(d.x, d.y, 'knife')
            });  
        });
        this.physics.add.collider(this.knife, this.jugador);
        

        //SONIDOS
        var musica = this.sound.add('musica',{volume: menuoptions.ambientSound/100});
        this.laser = this.sound.add('laser', {volume: menuoptions.effectsSound/100});
        musica.play({
            loop: true
        });


        var capaObjetos = this.mapaNivel.getObjectLayer('puertas');
        // Recorre los objetos de la capa
          
        capaObjetos.objects.forEach( (objeto) => {
          console.log("nombre:", objeto.name);
          console.log("X:", objeto.x);
          console.log("Y:", objeto.y);
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
                prefix: "sprite", //Prefijo de los sprites
                end: 38
            }),
            frameRate: 10, //frames por segundo
            repeat: -1 //Num repeticiones. -1: Repite siempre. Da igual lo que pongamos porque llamamos a las animaciones constantemente
        });

        
        this.mapaNivel.findObject(Constantes.FLOWEY.ID, (d: any) =>{
            this.flowey = this.add.sprite(d.x, d.y, Constantes.FLOWEY.ID, 'sprite30');
            this.flowey.anims.play(Constantes.FLOWEY.ANIMACION.BAILAR, true);//Animará una única vez ya que repeat=0 en la configuración
            this.flowey.scaleX = 1;
            this.flowey.scaleY = 1;
        });

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
                prefix: "sprite", //Prefijo de los sprites
                end: 2
            }),
            frameRate: 3, //frames por segundo
            repeat: -1 //Num repeticiones. -1: Repite siempre. Da igual lo que pongamos porque llamamos a las animaciones constantemente
        });

        this.mapaNivel.findObject(Constantes.GUARDAR.ID, (d: any) =>{
            const save = this.add.sprite(d.x, d.y, Constantes.GUARDAR.ID, 'sprite1');
            save.anims.play(Constantes.GUARDAR.ANIMACION.MOVIMIENTO, true);//Animará una única vez ya que repeat=0 en la configuración
            save.scaleX = 1;
            save.scaleY = 1;
        });
        //////////////////////////////////////////////////////

        //////////////////////////////////////////////////////
        //ANIMACIONES PERSONAJE
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERAR,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 1,
                prefix: "sprite", //Prefijo de los sprites
                end: 1
            }),
            frameRate: 1, //frames por segundo
            repeat: 2 //Num repeticiones. -1: Repite siempre. Da igual lo que pongamos porque llamamos a las animaciones constantemente
        });

        
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_IZQUIERDA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 5,
                prefix: "sprite", //Prefijo de los sprites
                end: 6
            }),
            frameRate: 5, //frames por segundo
            repeat: 2 //Num repeticiones. -1: Repite siempre. Da igual lo que pongamos porque llamamos a las animaciones constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_DERECHA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 7,
                prefix: "sprite", //Prefijo de los sprites
                end: 8
            }),
            frameRate: 5, //frames por segundo
            repeat: 2 //Num repeticiones. -1: Repite siempre. Da igual lo que pongamos porque llamamos a las animaciones constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_ARRIBA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 9,
                prefix: "sprite", //Prefijo de los sprites
                end: 12
            }),
            frameRate: 5, //frames por segundo
            repeat: 2 //Num repeticiones. -1: Repite siempre. Da igual lo que pongamos porque llamamos a las animaciones constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_ABAJO,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 1,
                prefix: "sprite", //Prefijo de los sprites
                end: 4
            }),
            frameRate: 5, //frames por segundo
            repeat: 2 //Num repeticiones. -1: Repite siempre. Da igual lo que pongamos porque llamamos a las animaciones constantemente
        });
        //////////////////////////////////////////////////////


        //las cámaras siguen al jugador
           //Se configura la camara. Hacemos que siga al jugador
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

        this.physics.add.overlap(this.jugador, this.bandaEnemigo01, this.jugador.ataque as ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.jugador, this.bandaEnemigo02, this.jugador.ataque as ArcadePhysicsCallback, undefined, this);
        this.physics.add.overlap(this.jugador, this.bandaEnemigo03, this.jugador.ataque as ArcadePhysicsCallback, undefined, this);

        //Se inicializan datos del juego y que variarán según eventos
        this.puntuacion = 0;
        this.vidas = 5;
        this.physics.add.collider(this.jugador, this.balase, this.colision as ArcadePhysicsCallback, undefined, this);

        //Inicialización del HUD
        this.registry.set(Constantes.REGISTRO.PUNTUACION, this.puntuacion);
        this.events.emit(Constantes.EVENTOS.PUNTUACION);
        this.registry.set(Constantes.REGISTRO.VIDAS, this.vidas);
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
        var circulo_a = this.add.circle(this.ancho * .72, this.alto * .6, 15, 0x008000).setAlpha(0.6).setInteractive();
        var circulo_b = this.add.circle(this.ancho * .68, this.alto * .68, 15, 0xff0000).setAlpha(0.6).setInteractive();
        this.input.addPointer(1); //Para que pueda tener un segundo punto de entrada a la pantalla (un segundo control) 
        this.botonpulsado(circulo_b);
        circulo_a.setScrollFactor(0);
        circulo_b.setScrollFactor(0);//Fijado a cámara
        var texto_circulo_a = this.add.text(this.ancho * .7155, this.alto * .582, 'A', miestilo);
        var texto_circulo_b = this.add.text(this.ancho * .6755, this.alto * .664, 'B', miestilo);
        texto_circulo_a.setScrollFactor(0);
        texto_circulo_b.setScrollFactor(0);
    }

    botonpulsado(circulorojo: Phaser.GameObjects.Arc) {
        circulorojo.on('pointerdown', () => {
            this.registry.set('botonpulsado', true);
        });
    }

    colision(jugador: Phaser.Physics.Arcade.Sprite, enemigo: Phaser.Physics.Arcade.Sprite): void {
        enemigo.destroy();//destruye la bala y vuelve al pool
    }
    colisionEnemigo(jugador: Phaser.Physics.Arcade.Sprite, enemigo: Phaser.Physics.Arcade.Sprite): void {
        enemigo.destroy();
    }

    override update(time: any, delta: number) {//Se ejecuta cada x milisegundos
        
        this.jugador.update();//Se tiene que llamar al update de cada elemento
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