class Lvl1 extends Phaser.Scene {
    constructor() {
        super("playLvl1");
    }

    create() {
        var config = this.game.config
        this.background = this.add.image(0,0, "base");
        this.background.setOrigin(0,0);
    }
}