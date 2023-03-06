import Constantes from '../constantes';
import Nivel1 from '../escenas/nivel1';


export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    //Control de entrada
    public cursores: Phaser.Types.Input.Keyboard.CursorKeys;
    private teclaEspacio: Phaser.Input.Keyboard.Key;

    private escena: Nivel1;
    private velocidad: number;

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
        if (this.cursores.left.isDown || this.escena.joystickCursors.left.isDown) {
            //console.log("Izquierda...");
            this.setVelocityX(this.velocidad * -1);
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_IZQUIERDA, true);
        } else if (this.cursores.right.isDown || this.escena.joystickCursors.right.isDown) {
            //console.log("Derecha...");
            this.setVelocityX(this.velocidad);
            this.flipX = false;
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_DERECHA, true);
        } else if (this.cursores.down.isDown || this.escena.joystickCursors.down.isDown) {
            //console.log("Abajo...");
            this.setVelocityY(this.velocidad);
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_ABAJO, true);
        } else if (this.cursores.up.isDown || this.escena.joystickCursors.up.isDown) { 
            //console.log("Arriba...");
            this.setVelocityY(this.velocidad * -1);//Restamos Y para "subir"
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_ARRIBA, true);
        } else { 
            //console.log("Esperando...");
            this.setVelocityX(0);
            this.setVelocityY(0); // SIN GRAVEDAD: SI NO QUEREMOS gravedad hay que descomentar esta línea
            this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERAR, true);
        }
    }

    public pasaPuerta(jugador: Jugador, objeto: Phaser.Physics.Arcade.Sprite): void {
        jugador.escena.cameras.main.fadeOut(1000, 0, 0, 0)
        const siguientePuerta = jugador.escena.datosPuertas[objeto.name].salida;
        const direccionSalida = jugador.escena.datosPuertas[objeto.name].direccion;

        const posX = jugador.escena.datosPuertas[''+siguientePuerta].x!;
        const posY = jugador.escena.datosPuertas[''+siguientePuerta].y!;

        if (direccionSalida == 'up') {
            jugador.escena.jugador.x = posX;
            jugador.escena.jugador.y = posY-32;
        } else if (direccionSalida == 'down') {
            jugador.escena.jugador.x = posX;
            jugador.escena.jugador.y = posY+12;
        } else if (direccionSalida == 'right') {
            jugador.escena.jugador.x = posX+32;
            jugador.escena.jugador.y = posY;
        } else if (direccionSalida == 'left') {
            jugador.escena.jugador.x = posX-32;
            jugador.escena.jugador.y = posY;
        }

        jugador.escena.cameras.main.fadeIn(1000, 0, 0, 0)
    
        jugador.escena.registry.set(Constantes.REGISTRO.VIDAS, jugador.escena.vidas);
        jugador.escena.events.emit(Constantes.EVENTOS.VIDAS);


        jugador.escena.registry.set(Constantes.REGISTRO.PUNTUACION, jugador.escena.puntuacion);
        jugador.escena.events.emit(Constantes.EVENTOS.PUNTUACION);
        

    }
    public ataque(jugador: Jugador, enemigo: Phaser.Physics.Arcade.Sprite): void {
        if ((Math.abs(jugador.body.x - enemigo.body.x)) < 1) { //Controla la cercanía del overlap. Poner a 100
            enemigo.destroy();
        }
    }
}