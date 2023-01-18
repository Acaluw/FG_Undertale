//Se recomienda crear constantes para evitar problemas con los identificadores
//Muy importante: NO REPETIR NINGÚN literal
const Constantes = {
    EVENTOS:{
        VIDAS: 'cambiaVidas',
        PUNTUACION: 'cambiaPuntuacion',
        BESKAR: 'cambiaBeskar'
    },
    HUD:{
        VIDAS: 'VIDA '
    },    
    ESCENAS:{
        CARGA: 'Carga',
        MENU: 'Menu',
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
            CAPAPLATAFORMAS: 'capapatrones', //Nombre de capa en JSON
            CAPASUELO: 'suelo', //Nombre de capa en el tileset
            TAPAPOZOS: 'pozos', //Nombre de capa en el tileset
            CAPAROCAS: 'rocas', //Nombre de capa en el tileset
            ENEMIGOS: 'enemigos', //Nombre de capa en el tileset
            ENEMIGOSAIRE: 'enemigosaire', //Nombre de capa en el tileset
            LINGOTES: 'beskar' //Nombre de capa en el tileset
        },
        TILESET:'tilesetnivel1' //Nombre del tileset en JSON
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
    JAWA:{
        ID: 'jawa',//Nombre de objeto en el tileset
        MUERTE: 'muerte',
        ANIMACION:{
            ESPERAR: 'esperarj', 
            CORRER: 'correrj',
            GOLPEAR: 'golpearj'
        }
    },
    VOLADOR:{
        ID: 'mynock',
        ANIMACION:{
            VOLAR: 'volar'
        }
    },
    BESKAR:{
        ID: 'beskar',
        IMAGEN: 'beskar2png',
        IMAGENHUD: 'beskarpng'
    },  
    SONIDOS:{
        JAWAATAQUE: 'utinni',
        JAWAMUERE: 'jawamuere',
        AY: 'ay',
        MONEY: 'money',
        INTRO: 'intro',
        DUNAS: 'dunas'
    },
    CONTROLES:{
        ID: 'ControlGamepad',
        IMAGEN: 'ControlIMG'
    }
};
export default Constantes;