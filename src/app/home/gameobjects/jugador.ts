import Constantes from '../constantes';
import Nivel1 from '../escenas/nivel1';


export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    //Control de entrada
    public cursores: Phaser.Types.Input.Keyboard.CursorKeys;
    private teclaEspacio: Phaser.Input.Keyboard.Key;

    private escena: Nivel1;//para que coja las propiedades públicas
    private velocidad: number;

    private tiempoEntrePuertas!: boolean;

    constructor(config: any) { //se le pasa escena para utilizar los objetos que contiene
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;//Importante: Necesito acceder a los objetos de la escena
        this.escena.physics.world.enable(this);//Activo físicas para este objeto
        this.setCollideWorldBounds(true);//Para que no se salga del mapa
        this.escena.add.existing(this);//Añade objeto a escena
        this.velocidad = 150;//pixels por segundo (aprox)

        //Correcciones de "sprite", offset y tamaño general
        this.body.setSize(20, 10);//Se corrige tamaño de sprite
        this.body.setOffset(0, 20);//Corrige offset de los sprites (en este caso no hay desplazamiento)
        this.scaleX = 1;
        this.scaleY = 1;

        //Control entrada
        this.cursores = this.escena.input.keyboard.createCursorKeys();
        this.teclaEspacio = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    override update() {
        //Control de Movimiento. Teclas excluyentes. 
        if (this.cursores.left.isDown) {
            //console.log("Izquierda...");
            this.setVelocityX(this.velocidad * -1);
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_IZQUIERDA, true);
            // this.setTexture(Constantes.JUGADOR.ANIMACION.ESPERAR);
        } else if (this.cursores.right.isDown) {
            //console.log("Derecha...");
            this.setVelocityX(this.velocidad);
            this.flipX = false;
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_DERECHA, true);
        } else if (this.cursores.down.isDown) {
            //console.log("Abajo...");
            this.setVelocityY(this.velocidad);
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_ABAJO, true);
        } else if (this.cursores.up.isDown) { //SIN GRAVEDAD: Solo salta si estamos en el suelo, evita el "vuelo"
            //console.log("Arriba...");
            this.setVelocityY(this.velocidad * -1);//Restamos Y para "subir"
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_ARRIBA, true);
        } else { //Esta parte es importante para que frene el movimiento si no pulsamos nada
            //console.log("Esperando...");
            this.setVelocityX(0);
            this.setVelocityY(0); // SIN GRAVEDAD: SI NO QUEREMOS gravedad hay que descomentar esta línea
            this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERAR, true);
        }
    }

    public pasaPuerta(jugador: Jugador, objeto: Phaser.Physics.Arcade.Sprite): void {
        jugador.escena.cameras.main.fadeOut(1000, 0, 0, 0)
        const siguientePuerta = jugador.escena.datosPuertas[objeto.name].salida;
        const posX = jugador.escena.datosPuertas[''+siguientePuerta].x!;
        const posY = jugador.escena.datosPuertas[''+siguientePuerta].y!;

        jugador.escena.jugador.x = posX;
        if(siguientePuerta=="001" || siguientePuerta=="002in" || siguientePuerta=="004in" || siguientePuerta=="005in" || siguientePuerta=="007in"){
            jugador.escena.jugador.y = posY+20;
        }else if(siguientePuerta=="003out"){
            jugador.escena.jugador.y = posY-40;
        }else if(siguientePuerta=="003in"){
            jugador.escena.jugador.y = posY+80;
        }else if(siguientePuerta=="006out"){
            jugador.escena.jugador.x = posX+30;
            jugador.escena.jugador.y = posY;
        }else if(siguientePuerta=="006in"){
            jugador.escena.jugador.x = posX-30;
            jugador.escena.jugador.y = posY;
        }
        else{
            jugador.escena.jugador.y = posY-30;
        }

        jugador.escena.cameras.main.fadeIn(1000, 0, 0, 0)
    }
}