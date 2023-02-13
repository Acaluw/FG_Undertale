export class Bala extends Phaser.GameObjects.Image {
    private veloc: number;
    private direc!: number;//Si sube o baja
    private escena!: Phaser.Scene;

    constructor(escena: any) {
        super(escena, 0, 0, 'bala', 0);
        this.escena=escena;
        this.veloc = Phaser.Math.GetSpeed(100, 1);//200px  
    }

    fire(x: number, y: number, direccion: number) {
        var y1 = y - 50 * direccion;
        this.setPosition(x, y1);
        this.direc = direccion;
    };

    override update(time: any, delta: number) {
        let avance = this.veloc * delta;
        avance *= this.direc;
        this.y -= avance;
        if (!this.escena.cameras.main.worldView.contains(this.x+100, this.y+100))
            this.destroy(); 
    };

}