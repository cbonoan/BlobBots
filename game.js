window.onload = function() {

    var config = { 
        type: Phaser.AUTO,
        width: screen.width,
        height: screen.height-115,
        scene: [Start, Tutorial, PromptFullscreen, Sim, Lvl1, Lvl2],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
       
    }
    var game = new Phaser.Game(config)
    
}

