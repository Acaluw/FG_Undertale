import Constantes from "../constantes";
import Miestilo from "../textos";
import Menu from "./menu";


export default class menuoptions extends Phaser.Scene {
    public static ambientSound: number = 10;
    public static effectsSound: number = 10;

    constructor() 
    {
        super('MenuOptions');
    }

    preload()
    {

    }

    create()
    {
        const ancho = this.sys.canvas.width
        const alto = this.sys.canvas.height;

        this.cameras.main.fadeIn(150, 0, 0, 0);

        //Declaración de elementos del menú
        const background_parallax = this.add.image(ancho / 2, alto / 2, 'menu_background_parallax');
        const background = this.add.image(ancho / 2, alto / 2, 'menu_background');
        const optionsTitle = this.add.image((ancho/2), alto/8, 'menu_options_title');
        const border = this.add.image(ancho/2, alto/2, 'menu_options_border');
        const border_back = this.add.image(ancho/2, alto/2, 'menu_options_background');
        
        const ambient_vol_title = this.add.image(ancho/2, (alto/3)-30, 'menu_ambient_vol');
        const ambient_box = this.add.image(ancho/2, (alto/2)-40, 'menu_options_border');
        const ambient_box_back = this.add.image(ancho/2, (alto/2)-40, 'menu_options_background');
        
        const effects_vol_title = this.add.image(ancho/2, (alto/2)+30, 'menu_effects_vol');
        const effects_box = this.add.image(ancho/2, (alto/2)+100, 'menu_options_border');
        const effects_box_back = this.add.image(ancho/2, (alto/2)+100, 'menu_options_background');
        
        const music_volumen_up = this.add.sprite((ancho/2)+100, (alto/2)-40, 'menu_options_button');
        const music_volumen_down = this.add.sprite((ancho/2)-100, (alto/2)-40, 'menu_options_button');

        const effects_volumen_up = this.add.sprite((ancho/2)+100, (alto/2)+100, 'menu_options_button');
        const effects_volumen_down = this.add.sprite((ancho/2)-100, (alto/2)+100, 'menu_options_button');
        
        const btnBack = this.add.image(ancho/2, alto-50, 'menu_options_back');

        //Ajustes de elementos
        border.scaleX = 1;
        border.scaleY = 1;
        
        border_back.scaleX = 1;
        border_back.scaleY = 1;
        border_back.alpha = 0.5;
        
        btnBack.scaleX = 0.30;
        btnBack.scaleY = 0.30;
        
        optionsTitle.scaleX = 0.5;
        optionsTitle.scaleY = 0.5;

        ambient_vol_title.scaleX = 0.5;
        ambient_vol_title.scaleY = 0.5;
        ambient_box.scaleX = 0.3;
        ambient_box.scaleY = 0.2;
        ambient_box_back.scaleX = 0.3;
        ambient_box_back.scaleY = 0.2;
        ambient_box_back.alpha = 0.75;

        effects_vol_title.scaleX = 0.5;
        effects_vol_title.scaleY = 0.5;
        effects_box.scaleX = 0.3;
        effects_box.scaleY = 0.2;
        effects_box_back.scaleX = 0.3;
        effects_box_back.scaleY = 0.2;
        effects_box_back.alpha = 0.75;

        music_volumen_up.scaleX = 0.75;
        music_volumen_up.scaleY = 0.75;
        music_volumen_down.scaleX = 0.75;
        music_volumen_down.scaleY = 0.75;
        music_volumen_down.flipX = true;

        effects_volumen_up.scaleX = 0.75;
        effects_volumen_up.scaleY = 0.75;
        effects_volumen_down.scaleX = 0.75;
        effects_volumen_down.scaleY = 0.75;
        effects_volumen_down.flipX = true;

        //Asignacion de cajas de texto (mostrar volumen de musica y efectos)
        var musicText = this.add.text((ancho/2)-15, (alto/2)-45, menuoptions.ambientSound.toString()+' %', Miestilo);
        var effectsText = this.add.text((ancho/2)-15, (alto/2)+95, menuoptions.effectsSound.toString()+' %', Miestilo);

        //Acciones de elementos
        this.anims.create({
            key: 'btninteract',
            frames: this.anims.generateFrameNames('menu_options_button', {
                start: 1,
                prefix: "sprite", //Prefijo de los sprites
                end: 3
            }),
            frameRate: 10,
            repeat: 0
        });

        btnBack.setInteractive();
        this.cambiarEscena(btnBack, Constantes.ESCENAS.MENU);

        music_volumen_up.setInteractive().on('pointerdown', () =>{
            music_volumen_up.play('btninteract');
            if (menuoptions.ambientSound < 100) {
                menuoptions.ambientSound = menuoptions.ambientSound+5;
                musicText.destroy();
                musicText = this.add.text((ancho/2)-15, (alto/2)-45, menuoptions.ambientSound.toString()+' %', Miestilo);
            }
        });
        music_volumen_down.setInteractive().on('pointerdown', () =>{
            music_volumen_down.play('btninteract');
            if (menuoptions.ambientSound > 0) {
                menuoptions.ambientSound = menuoptions.ambientSound-5;
                musicText.destroy();
                musicText = this.add.text((ancho/2)-15, (alto/2)-45, menuoptions.ambientSound.toString()+' %', Miestilo);
            }
        });

        effects_volumen_up.setInteractive().on('pointerdown', () =>{
            effects_volumen_up.play('btninteract');
            if (menuoptions.effectsSound < 100) {
                menuoptions.effectsSound = menuoptions.effectsSound+5;
                this.sound.add('laser', {volume: menuoptions.effectsSound/100}).play();
                effectsText.destroy();
                effectsText = this.add.text((ancho/2)-15, (alto/2)+95, menuoptions.effectsSound.toString()+' %', Miestilo);
            }
        });
        effects_volumen_down.setInteractive().on('pointerdown', () =>{
            effects_volumen_down.play('btninteract');
            if (menuoptions.effectsSound > 0) {
                menuoptions.effectsSound = menuoptions.effectsSound-5;
                this.sound.add('laser', {volume: menuoptions.effectsSound/100}).play();
                effectsText.destroy();
                effectsText = this.add.text((ancho/2)-15, (alto/2)+95, menuoptions.effectsSound.toString()+' %', Miestilo);
            }
        });
    }

    override update()
    {
    }

    cambiarEscena(titulo: any, escena: string) 
    {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(150, 0, 0, 0);
            this.tweens.add({
                targets: Menu.musica,
                volume: 0,
                duration: 500,
                onComplete: () => {this.sound.stopAll();}
            });
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(600, () => {
                    this.scene.start(escena);
                })
            })            
        });   
    }
}