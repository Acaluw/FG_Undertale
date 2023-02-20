import Nivel1 from "./escenas/nivel1";

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
