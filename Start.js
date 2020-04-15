class Start extends Phaser.Scene {
    constructor() {
        super("loadGame")
    }

    preload() {
        this.load.image("base", "assets/Level Designs/Base.png");
    }
    create() {
        this.scene.start("playLvl1")
    };
}