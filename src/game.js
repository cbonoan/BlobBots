window.onload = function() {

    var config = { 
        type: Phaser.AUTO,
        width: screen.width,
        height: screen.height-115,
        scene: [Start, levelWarp, Tutorial, PromptFullscreen, Sim, Lvl1, Tutorial2, Lvl2, Lvl3, Lvl4, GameOver, Win, Credits],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
       
    }
    var game = new Phaser.Game(config)
    
}

