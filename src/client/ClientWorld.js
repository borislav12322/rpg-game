import { spriteWidth, spriteHeight } from '../index';

class ClientWorld {
    constructor(game, engine, levelConfig) {
        Object.assign(this, {
            game,
            engine,
            levelConfig,
            height: levelConfig.map.lenght,
            width: levelConfig.map[0].lenght,
        });
    }

    init() {
        const { map } = this.levelConfig;
        map.forEach((configRow, y) => {
            configRow.forEach((configCell, x) => {
                this.engine.renderSpriteFrame({
                    sprite: ['terrain', configCell[0]],
                    frame: 0,
                    x: x * spriteWidth,
                    y: y * spriteHeight,
                    w: spriteWidth,
                    h: spriteHeight,
                });
            });
        });
    }
}

export default ClientWorld;
