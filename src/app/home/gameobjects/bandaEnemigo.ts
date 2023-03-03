import { Game } from 'phaser';
import Constantes from '../constantes';
import { BalaSimple } from './bala';


export default class BandaEnemigo extends Phaser.Physics.Arcade.Group {
    private escena: Phaser.Scene;
    private velocidad: number;
    private nombreanimacion: String;
    private tipoEne: number;
    private balas: Phaser.Physics.Arcade.Group | undefined;
    private jugador: any;
    
    constructor(escena: any, nombreCapaObjeto: string, idObjeto: string, animObjeto: string, velocidad: number) {
        super(escena.physics.world, escena);

        this.escena = escena;
        this.nombreanimacion = animObjeto;
        this.velocidad = velocidad;
        this.tipoEne = 0;
        this.jugador = escena.jugador;//Para acceder a las propiedades de jugador

        //Aquí es donde se crea el grupo a partir del idObjeto (JAWA)
        this.addMultiple(escena.mapaNivel.createFromObjects(nombreCapaObjeto, { name: idObjeto }));

        //añadimos física para todos los hijos
        this.escena.physics.world.enable(this.children.entries);

        //animaciones
        this.escena.anims.create({
            key: animObjeto,
            frames: idObjeto,
            frameRate: 20,
            repeat: -1
        });

        //Mediante entries modifico todos los objetos creados
        this.children.entries.map((enemigo: any) => {
            enemigo.body.setCollideWorldBounds(true);//Importante para indicarle que no se salga del mapa
            enemigo.scale = 0.4;
            enemigo.tipoEne = Phaser.Math.Between(0, 1);//Tipo de jawa
            enemigo.ultimodisparo=0;
          
            //Se crean los POOLS (Conjuntos de objetos reutilizables)
            enemigo.balas = escena.physics.add.group({
                classType: BalaSimple,
                maxSize: 3,
                runChildUpdate: true //permite actualizar el estado de la clase Bala,
            });
            //Se añade collider
            escena.physics.add.collider(this.jugador, enemigo.balas, this.colision as ArcadePhysicsCallback, undefined, this);//el 4º parámetro indica si está activa la colisión o no
            
        });
        
    }

    colision(jugador: Phaser.Physics.Arcade.Sprite, enemigo: Phaser.Physics.Arcade.Sprite): void {
        console.log('COLISION!!!!!!!!!!!!!!!!!!!!');
        enemigo.destroy();//destruye la bala y vuelve al pool
    }

    mueveEnemigo(direccion: string, enemigo: any) {
        if (direccion === 'arriba') {
            enemigo.body.setVelocityY(this.velocidad * -1);
            enemigo.flipX = false;

        } else if (direccion === 'abajo') {
            enemigo.body.setVelocityY(this.velocidad);
            enemigo.flipX = true;
        }
    }


    update(time: any, delta: number) {
        this.children.entries.map((enemigo: any) => {
            
            enemigo.anims.play(this.nombreanimacion, true);
            if (enemigo.body.velocity.x === 0) { //El único momento donde velocidad es 0 es tras haberlo creado
                enemigo.sentido = (Phaser.Math.Between(0, 1) ? 'arriba' : 'abajo');
                this.mueveEnemigo(enemigo.sentido, enemigo);
            }
            if (enemigo.body.blocked.down) {
                enemigo.sentido = 'arriba';                
                this.mueveEnemigo(enemigo.sentido, enemigo);
   
            } else if (enemigo.body.blocked.up) {
                enemigo.sentido = 'abajo';                
                this.mueveEnemigo(enemigo.sentido, enemigo);


            }
            //Dispara si personaje cerca
            if (Math.abs(enemigo.x - this.jugador.x) < 300) {
                var direcdisparo;
                if (enemigo.x - this.jugador.x > 0)//Enemigo a derecha de jugador
                    direcdisparo = 1;//Dispara a izquierda
                else
                    direcdisparo = -1;//Enemigo a izquierda de jugador, dispara a derecha
                //Si enemigo a derecha y mirando a jugador o si enemigo a izquierda y mirando a jugador: DISPARA
                if (((direcdisparo == 1 && enemigo.sentido == 'arriba') 
                    || (direcdisparo == -1 && enemigo.sentido == 'abajo'))
                    && (time>enemigo.ultimodisparo)) { 
                var bala = enemigo.balas.get();//Coge del pool
                if (bala) {
                    enemigo.ultimodisparo = time + 500; //Tiempo entre balas
                    bala.fire(enemigo.x, enemigo.y, direcdisparo, enemigo.tipoEnemigo);
                }
            }
        }
                

        });

}




}