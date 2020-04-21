class Title extends Phaser.Scene {
  constructor() {
    super("bootGame")
  }

  preload() {
    this.load.image("TitleScreen", "assets/TitleScreen.png");
  }
  create() {
    this.add.text(20, 20, "Loading Game...");
    this.scene.start("playGame");
  }
}
