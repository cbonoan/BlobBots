class Lvl1 extends Phaser.Scene {
  constructor() {
    super("playGame")
  }

  create() {
    this.TitleScreen = this.add.image(0,0,"TitleScreen");
    this.TitleScreen.setOrigin(0,0);

      this.add.text(20, 20, "Playing Game...", {font: "25px Arial", fill: "yellow"});
  }
}
