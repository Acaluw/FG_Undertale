//Se recomienda crear constantes para evitar problemas con los identificadores
//Muy importante: NO REPETIR NINGÚN literal
const Constantes = {
    EVENTOS:{
        VIDAS: 'cambiaVidas',
        PUNTUACION: 'cambiaPuntuacion',
        BESKAR: 'cambiaBeskar'
    },
    HUD:{
        VIDAS: 'Vidas '
    },    
    ESCENAS:{
        CARGA: 'Carga',
        MENU: 'Menu',
        MENUOPTIONS: 'MenuOptions',
        NIVEL1: 'Nivel1',
        HUD: 'HUD'
    },
    REGISTRO:{
        VIDAS: 'vidas',
        PUNTUACION: 'puntuacion',
        NOMBRENIVEL: 'nombrenivel',
        BESKAR:'numbeskar',
        BESKARMAX: 'numbeskarmax',
        GANADO: 'nivelpasado'
    }, 
    MAPAS: {
        NIVEL1:{
            TILEMAPJSON: 'mitilemapjson',
            CAPAMAPEADO: 'capamapeado', //Nombre de capa en JSON
            CAPACOLISIONES: 'capacolisiones',
            DOOR01IN: '001in',
            DOOR01OUT: '001out',
            ENEMIGO01: 'enemigo01',
            ENEMIGO02: 'enemigo02',
            ENEMIGO03: 'enemigo03'
        },
        TILESET:'maparuinas' //Nombre del tileset en JSON
    },
    PUERTAS:{
        PUERTA1:{
            ID: '001in'
        },
        PUERTA2:{
            ID: '001out'
        }
    },
    FONDOS:{
        NIVEL1: 'Arena',
        LOGO: 'menulogo',
    }, 
    FUENTES:{
        NOMBREFUENTE: 'fuentePixel'//id interno
    },
    JUGADOR:{
        ID: 'jugador',//Nombre de objeto en el tileset
        ANIMACION:{
            ESPERAR: 'esperar',
            ESPERARD: 'esperar_derecha',
            ESPERARI: 'esperar_izquierda',
            ESPERARA: 'esperar_arriba', 
            ANDAR_DERECHA: 'andar_right',
            ANDAR_IZQUIERDA: 'andar_left',
            ANDAR_ARRIBA: 'andar_up',
            ANDAR_ABAJO: 'andar_down',
            SALTAR: 'saltar',
            GOLPEAR: 'golpear'
        }
    },
    GUARDAR:{
        ID: 'guardar',//Nombre de objeto en el tileset
        ANIMACION:{
            MOVIMIENTO: 'movimiento', 
        }
    },
    FLOWEY:{
        ID: 'flowey',//Nombre de objeto en el tileset
        ANIMACION:{
            ESPERAR: 'esperarflowey', 
            HABLAR: 'hablarflowey',
            BAILAR: 'bailarflowey'
        }
    },
    ENEMIGO01:{
        ID: 'enemigo01',
        ANIMACION:{
            GESTOS: 'gesto01'
        }
    },
    ENEMIGO02:{
        ID: 'enemigo02',
        ANIMACION:{
            GESTOS: 'gesto02'
        }
    },
    ENEMIGO03:{
        ID: 'enemigo03',
        ANIMACION:{
            GESTOS: 'gesto03'
        }
    },  
    SONIDOS:{
        JAWAATAQUE: 'utinni',
        JAWAMUERE: 'jawamuere',
        AY: 'ay',
        MONEY: 'money',
        INTRO: 'intro',
        DUNAS: 'dunas',
        MUSICA: 'musica',
        MENUMUSIC: 'menumusic',
        BALAS: 'laser',
    },
    CONTROLES:{
        ID: 'ControlGamepad',
        IMAGEN: 'ControlIMG'
    }
};
export default Constantes;