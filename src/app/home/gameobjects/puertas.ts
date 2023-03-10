import Constantes from '../constantes';
import Nivel1 from '../escenas/nivel1';


export default class Puertas extends Phaser.Physics.Arcade.Group {
    private escena: Phaser.Scene;

    constructor(escena: any, nombreCapaObjeto: string) {
        super(escena.physics.world, escena);

        this.escena = escena;
        this.addMultiple(escena.mapaNivel.createFromObjects(nombreCapaObjeto));
        //añadimos física
        this.escena.physics.world.enable(this.children.entries);

        this.children.entries.map((puerta: any) =>{
            puerta.setTexture('puerta');
            puerta.scale = 2;
            puerta.body.setSize(0, 0);
            puerta.body.setOffset(0, 0);
        });
    }

    public update(): void {
        
    }
}