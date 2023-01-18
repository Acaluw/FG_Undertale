import Constantes from "../constantes";
import Jugador from '../gameobjects/jugador';
import Miestilo from "../textos";


export default class Nivel1 extends Phaser.Scene {

    public jugador!: Jugador;

    public ancho!: integer;
    public alto!: integer;

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
  
        //FONDO: IMPORTANTE - SE AÑADEN LAS CAPAS EN ORDEN: fondo, mapa, jugador

        //Se añade el mapa

        //Se añaden las capas
  
        //Se añade el jugador
        this.jugador = new Jugador({
            escena: this,
            x: this.ancho/2,
            y: this.alto/2,
            textura: Constantes.JUGADOR.ID
        });

        //Se establecen las animaciones (siempre se usa la misma plantilla)
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

        this.jugador.setGravity(0,0); //Gravedad(X,Y). Se puede configurar la gravedad por objeto,
        //pero la gravedad general establecida en la configuración prevalece  

        //Se pueden extraer sprites del ATLAS
        const sprite = this.add.sprite(200, 200, Constantes.JUGADOR.ID, 'sprite4');//Muestra sprite 4 del ATLAS
        sprite.setInteractive();
        sprite.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_IZQUIERDA, true);//Animará una única vez ya que repeat=0 en la configuración
        sprite.scaleX = 2;
        sprite.scaleY = 2;

        //MISCELANEOS
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

        const save = this.add.sprite(300, 200, Constantes.GUARDAR.ID, 'sprite1');
        save.anims.play(Constantes.GUARDAR.ANIMACION.MOVIMIENTO, true);//Animará una única vez ya que repeat=0 en la configuración
        save.scaleX = 2;
        save.scaleY = 2;

        //las cámaras siguen al jugador
     
        //FÍSICAS OBJETOS
        //Se añade la física del jugador con el nivel

        console.log("Escena Nivel1 Creada");
        this.add.text(0, 0, 'Escena Nivel1 Creada', Miestilo);

        //Vuelta al menú principal
        this.finJuego(sprite);
    }

    override update() {//Se ejecuta cada x milisegundos
        this.jugador.update();//Se tiene que llamar al update de cada elemento
        console.log("Jugador en posición x:" + this.jugador.x + " y:" + this.jugador.y);

    }

    finJuego(letrerofin: Phaser.GameObjects.Sprite) {
        letrerofin.on('pointerdown', () => {
            this.vuelveMenu();
        });
    }

    vuelveMenu() {
        this.scene.stop(Constantes.ESCENAS.NIVEL1);
        this.scene.start(Constantes.ESCENAS.MENU);
    }


}