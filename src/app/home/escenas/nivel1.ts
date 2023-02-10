import Constantes from "../constantes";
import Jugador from '../gameobjects/jugador';
import Puertas from "../gameobjects/puertas";
import Miestilo from "../textos";

interface Datos {
    x: number | undefined;
    y: number | undefined;
    salida: String;
  }

export default class Nivel1 extends Phaser.Scene {


    public jugador!: Jugador;
    public ancho!: integer;
    public alto!: integer;

    public mapaNivel!: Phaser.Tilemaps.Tilemap;

    private mapaTileset!: Phaser.Tilemaps.Tileset;
    private capaMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private capasueloMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private background!: Phaser.GameObjects.Sprite;


    //private d001in!: Puertas;
    //private d001out!: Puertas;
    puertas!: Puertas;
    //public datosPuertas: undefined;

      
    public datosPuertas: { [key: string]: Datos } = {};


   // public coordsPuertas: String[][]=[[],[]];

    constructor() {
        super(Constantes.ESCENAS.NIVEL1);
    }

    preload() //Ejecuta una única vez la precarga de los assets
    {
    }

    create() //Crea escena
    {
        this.ancho = this.sys.game.canvas.width;
        this.alto = this.sys.game.canvas.height;

        //Cargar Tilemap
        this.mapaNivel = this.make.tilemap({ key: Constantes.MAPAS.NIVEL1.TILEMAPJSON, tileWidth: 32, tileHeight: 32 });//Tiene que cuadrar con lo que se puso en Tiled
        this.physics.world.bounds.setTo(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);//Límites del mundo
        //Se añade el Tileset (conjunto de patrones  base del mapa) para poder añadir sus capas
        this.mapaTileset = this.mapaNivel.addTilesetImage(Constantes.MAPAS.TILESET);
  
        //FONDO: IMPORTANTE - SE AÑADEN LAS CAPAS EN ORDEN: fondo, mapa, jugador

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

        //SONIDOS
        //MUSICA
        var musica = this.sound.add('musica',{volume: 2});//Volumen al 200%
        
        musica.play({
            loop: true
        });


        var capaObjetos = this.mapaNivel.getObjectLayer('puertas');
        // Recorre los objetos de la capa
          
        capaObjetos.objects.forEach( (objeto) => {
          console.log("nombre:", objeto.name);
          console.log("X:", objeto.x);
          console.log("Y:", objeto.y);
          this.datosPuertas[objeto.name] = {x: objeto.x, y:objeto.y, salida:'---'};
        });
        this.datosPuertas['001'].salida = '001out';
        loop:false;
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
        //....Resto de salidas      

        this.puertas = new Puertas(this, 'puertas');
        this.physics.add.overlap(this.jugador, this.puertas, this.jugador.pasaPuerta as ArcadePhysicsCallback, undefined, this);

        //ANIMACION ANTAGONISTA Y AÑADIDO DE ANTAGONISTA
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
            const flowey = this.add.sprite(d.x, d.y, Constantes.FLOWEY.ID, 'sprite30');
            flowey.anims.play(Constantes.FLOWEY.ANIMACION.BAILAR, true);//Animará una única vez ya que repeat=0 en la configuración
            flowey.scaleX = 1;
            flowey.scaleY = 1;
        });
        //////////////////////////////////////////////////////

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

        console.log("Zona: Ruinas");
        this.add.text(0, 0, 'Zona: Ruinas', Miestilo);


       
    

    }

    override update() {//Se ejecuta cada x milisegundos
        this.jugador.update();//Se tiene que llamar al update de cada elemento
        //console.log("Jugador en posición x:" + this.jugador.x + " y:" + this.jugador.y);

    }

}