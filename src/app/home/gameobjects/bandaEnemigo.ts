import { Game } from 'phaser';
import Constantes from '../constantes';
import { BalaSimple } from './bala';
import Nivel1 from '../escenas/nivel1';


export default class BandaEnemigo extends Phaser.Physics.Arcade.Group {
    public permisoDisparo = true
    private escena: Phaser.Scene;
    private velocidad: number;
    private nombreanimacion: String;
    private balas: Phaser.Physics.Arcade.Group | undefined;
    private jugador: any;
    
    
    constructor(escena: any, nombreCapaObjeto: string, idObjeto: string, animObjeto: string, velocidad: number) {
        super(escena.physics.world, escena);

        this.escena = escena;
        this.nombreanimacion = animObjeto;
        this.velocidad = velocidad;
        
        this.jugador = escena.jugador;//Para acceder a las propiedades de jugador

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
            enemigo.body.setCollideWorldBounds(true);
            enemigo.ultimodisparo=0;

            if (idObjeto == 'enemigo01'){
                enemigo.body.setSize(75, 117);
                enemigo.body.setOffset(10.5, 0);
                enemigo.scale = 0.35;
            }
            else if (idObjeto == 'enemigo02'){
                enemigo.body.setSize(75, 105);
                enemigo.body.setOffset(0, 2);
                enemigo.scale = 0.33;
            } else{
                enemigo.body.setSize(55, 88);
                enemigo.body.setOffset(18.5, 5);
                enemigo.scale = 0.3;
            }
            
          
            //Se crean los POOLS (Conjuntos de objetos reutilizables)
            enemigo.balas = escena.physics.add.group({
                classType: BalaSimple,
                maxSize: 3,
                runChildUpdate: true //permite actualizar el estado de la clase Bala,
            });
            //Se añade collider
            escena.physics.add.collider(this.jugador, enemigo.balas, this.colision as ArcadePhysicsCallback, undefined, this);

        });
        
    }

    colision(jugador: Phaser.Physics.Arcade.Sprite, enemigo: Phaser.Physics.Arcade.Sprite): void {
        Nivel1.vidas--;
        enemigo.destroy();//destruye la bala y vuelve al pool
    }

    mueveEnemigo(direccion: string, enemigo: any) {
        if (direccion === 'arriba') {
            enemigo.body.setVelocityY(this.velocidad * -1);
            

        } else if (direccion === 'abajo') {
            enemigo.body.setVelocityY(this.velocidad);
            
        }
    }


    update(time: any, delta: number) {
        this.children.entries.map((enemigo: any) => {
            
            enemigo.anims.play(this.nombreanimacion, true);
            if (enemigo.body.velocity.y === 0) {
                
                enemigo.sentido = (Phaser.Math.Between(0, 1) ? 'arriba' : 'abajo');
                this.mueveEnemigo(enemigo.sentido, enemigo);
            }
            if (enemigo.body.touching.down) {
                
                enemigo.sentido = 'arriba';                
                this.mueveEnemigo(enemigo.sentido, enemigo);
   
            } else if (enemigo.body.touching.up) {
                
                enemigo.sentido = 'abajo';                
                this.mueveEnemigo(enemigo.sentido, enemigo);
            }
            //Dispara si personaje cerca
            if (Math.abs(enemigo.x - this.jugador.x) < 300) {
                var direcdisparo;
                if (enemigo.y - this.jugador.y > 0)//Enemigo a derecha de jugador
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
                    if(this.permisoDisparo)
                        bala.fire(enemigo.x, enemigo.y, direcdisparo, enemigo.tipoEnemigo);
                }
            }
        }
                

        });

}




}