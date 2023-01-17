import { Component, OnInit } from '@angular/core';
import Configuracion from './configuracion';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js'; //npm i phaser3-rex-plugins


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    Juego!: Phaser.Game;
    escena!: Phaser.Scene;


    ngOnInit(): void {
        console.log("Enviando mensaje al LOG del navegador");
        this.Juego = new Phaser.Game(Configuracion);
    }

}