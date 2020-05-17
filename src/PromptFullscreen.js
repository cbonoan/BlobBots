class PromptFullscreen extends Phaser.Scene{
    constructor(){
        super("fullscreen");
    }
    preload() {
    }
    create() {       
        var prompt = "We HIGHLY recommend you play this game on a fullscreen window. \nPlease enlarge your window and click anywhere to continue!"
        var text = this.add.bitmapText(this.game.config.width/8,this.game.config.height/10, 'font', prompt, 50, 1).setMaxWidth(1000);
        this.input.on('pointerdown', function() {
            this.scene.resume("bootGame");
            this.scene.restart("bootGame");
            this.scene.stop();
        }, this);
    }

}