import Nivel1 from "../escenas/nivel1";

export class Bala extends Phaser.GameObjects.Image {
    private veloc: number;
    private direc!: number;//Si sube o baja
    private escena!: Nivel1
    private jX !: number
    private jY !: number
    constructor(escena: any) { 
        super(escena, 0, 0, 'bala', 0);
        this.escena=escena;
        this.veloc = Phaser.Math.GetSpeed(50, 1);//200px  
        this.setScale(0.5)
    }

    fire(x: number, y: number, direccion: number) {
        var y1 = y - 50 * direccion;
        this.setPosition(x, y);
        this.direc = direccion;
        this.jX= this.escena.jugador.x
        this.jY = this.escena.jugador.y
        this.escena.time.addEvent({
            delay: 1000,
            callback: () => {
                this.destroy(); 
            }
        });
        
    };

    override update(time: any, delta: number) {
        // let avance = this.veloc * delta;
        // avance *= this.direc;
        let incrementoY = this.jY - this.y
        let incrementoX = this.jX - this.x
        this.y -= -Math.atan(incrementoY);
        this.x -= -Math.atan(incrementoX);
        
        
        if (!this.escena.cameras.main.worldView.contains(this.x, this.y))
            this.destroy(); 

        
    };

}
export class BalaSimple extends Phaser.Physics.Arcade.Sprite {
    private veloc: number;
    private direc!: number;//Si izq o der
    private escena!: Phaser.Scene;
    private tipodisparo!: number;

    constructor(escena: any) {
        super(escena, 0, 0, 'bala', 0);
        this.escena = escena;
        this.veloc = Phaser.Math.GetSpeed(300, 1);//200px en 1 segundo  
        this.setScale(0.5);
    }

    //Configura el disparo
    fire(x: number, y: number, direccion: number, tipodisparo: number, sentidojawa: String) {
        this.direc = direccion;//para permitir que balas vayan hacia izq y hacia der
        this.tipodisparo=tipodisparo;//lo determina tipo de jawa
        this.setPosition(x, y);//Posición de inicio disparo
        if (tipodisparo == 0) {
            this.setGravityY(-600);//Modifica gravedad restándo la general: disparo horizontal con gravedad NULA 
        } else {
            this.setGravityY(-100);//Modifica gravedad : disparo diagonal que NO escapa de la gravedad
        }
        if (direccion == 1) this.flipX = true;//voltea sprite
    };

    //Este override no se puede hacer en los GROUP, sí en los Sprites
    override update(time: any, delta: number) {//delta es el incremento por segundo (algo parecido a los FPS)
        let avance = this.veloc * delta;
        let avancex = avance * this.direc;
        this.x -= avancex;
        if (this.tipodisparo == 1) //Si disparo en diagonal también sube la misma distancia (parábola)
            this.y -= avance;
        if (!this.escena.cameras.main.worldView.contains(this.x, this.y))//Si se sale de cámara, destruye y vuelve al pool
            this.destroy();
    };

}
