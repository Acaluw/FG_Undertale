import Nivel1 from "../escenas/nivel1";

export class Bala extends Phaser.GameObjects.Image {
    private veloc: number;
    private direc!: number;
    private escena!: Nivel1
    private jX !: number
    private jY !: number
    constructor(escena: any) { 
        super(escena, 0, 0, 'bala', 0);
        this.escena=escena;
        this.veloc = Phaser.Math.GetSpeed(50, 1);
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
        let incrementoY = this.jY - this.y
        let incrementoX = this.jX - this.x
        this.y -= -Math.atan(incrementoY);
        this.x -= -Math.atan(incrementoX);
        
        if (!this.escena.cameras.main.worldView.contains(this.x, this.y)){
            this.destroy(); 
        }
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
        this.veloc = Phaser.Math.GetSpeed(300, 1);
        this.setScale(0.5);
    }

    //Configura el disparo
    fire(x: number, y: number, direccion: number, tipodisparo: number, sentidojawa: String) {
        this.direc = direccion;//para permitir que balas vayan hacia izq y hacia der
        this.tipodisparo=tipodisparo;
        this.setPosition(x, y);//Posición de inicio disparo
        if (tipodisparo == 0) {
            this.setGravityY(0);
        } else {
            this.setGravityY(0);
        }
        if (direccion == 1) this.flipX = true;
    };

    override update(time: any, delta: number) {
        let avance = this.veloc * delta;
        let avancex = avance * this.direc;
        this.y -= avancex;
        if (this.tipodisparo == 1)
            this.y -= avance;
        if (!this.escena.cameras.main.worldView.contains(this.x, this.y))
            this.destroy();
    };
}
export class BalaJugador extends Phaser.Physics.Arcade.Sprite {
    private veloc: number;
    private direc!: number;
    private escena!: Phaser.Scene;
    private tipodisparo!: number;

    constructor(escena: any) {
        super(escena, 0, 0, 'knife', 0);
        this.escena = escena;
        this.veloc = Phaser.Math.GetSpeed(300, 1);
        this.setScale(1);
    }

    //Configura el disparo
    fire(x: number, y: number, direccion: number, tipodisparo: number) {
        this.direc = direccion;//para permitir que balas vayan hacia izq y hacia der
        this.tipodisparo=tipodisparo;
        this.setPosition(x, y);//Posición de inicio disparo
        
    };
    colisionEnemiga(bala: BalaJugador, enemigo: Phaser.Physics.Arcade.Sprite): void {
        if ((Math.abs(bala.body.x - enemigo.body.x)) < 1) { 
            enemigo.destroy();
        }
    }

    override update(time: any, delta: number) {
        if(this.tipodisparo==0){
            let avance = this.veloc * delta;
            let avancey = avance * this.direc;
            this.y += avancey;
            if (!this.escena.cameras.main.worldView.contains(this.x, this.y))//Si se sale de cámara, destruye y vuelve al pool
                this.destroy();
        }else{
            let avance = this.veloc * delta;
            let avancex = avance * this.direc;
            this.x += avancex;
            if (!this.escena.cameras.main.worldView.contains(this.x, this.y))//Si se sale de cámara, destruye y vuelve al pool
                this.destroy();
        }

        
    };

}
