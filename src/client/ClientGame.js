import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
import levelConfig from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
    constructor(cfg) {
        Object.assign(this, {
            cfg,
            gameObjects,
            player: null,
        });

        this.engine = this.createEngine();
        this.map = this.createWorld();
        this.initEngine();
    }

    setPlayer(player) {
        this.player = player;
    }
    createEngine() {
        return new ClientEngine(document.getElementById(this.cfg.tagId));
    }

    createWorld() {
        return new ClientWorld(this, this.engine, levelConfig);
    }

    initEngine() {
        this.engine.loadSprites(sprites).then(() => {
            this.map.init();
            this.engine.on('render', (_, time) => {
                this.map.render(time);
            });
            this.engine.start();
            this.initKeys();
        });
    }

    initKeys() {
        this.engine.input.onKey({
            ArrowLeft: (keydown) => {
                if (keydown) {
                    this.player.moveKeys(-1, 0);
                }
            },

            ArrowRight: (keydown) => {
                if (keydown) {
                    this.moveKeys(+1, 0);
                }
            },

            ArrowDown: (keydown) => {
                if (keydown) {
                    this.moveKeys(0, 1);
                }
            },

            ArrowUp: (keydown) => {
                if (keydown) {
                    this.moveKeys(0, -1);
                }
            },
        });
    }

    moveKeys(x, y) {
        this.player.moveByCellCoord(x, y, (cell) => cell.findObjectsByType('grass').length);
    }

    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg);
        }
    }
}

export default ClientGame;
