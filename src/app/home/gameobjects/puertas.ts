import Constantes from '../constantes';
import Nivel1 from '../escenas/nivel1';


export default class Puertas extends Phaser.Physics.Arcade.Group {
    private escena: Phaser.Scene;

    constructor(escena: any, nombreCapaObjeto: string, idObjeto: string) {
        super(escena.physics.world, escena);

        this.escena = escena;
        //this.addMultiple(escena.mapaNivel.createFromObjects(nombreCapaObjeto, { name: idObjeto}));

        //añadimos física
        this.escena.physics.world.enable(this.children.entries);

        this.children.entries.map((puerta: any) =>{
            console.log(puerta.type);
            puerta.body.setCollideWorldBounds(true);//Es innecesario
        });
    }

     public update(): void {
       
    }




}