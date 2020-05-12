enemySpawnTime = 3500; 

class Lvl2 extends Phaser.Scene {
    constructor() {
        super('Level2');
    }

    init(data){
        this.health = data.health;
        this.score = data.score;
    }

    preload() {

    }

    create() {
        this.config = this.game.config;

        this.beamSound = this.sound.add('beam');
        this.spawnSound = this.sound.add('spawnSoundEffect');
        var lvl2Music = this.sound.add('lvl2Music');
        lvl2Music.play({
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        this.add.image(0, 0,'level2').setOrigin(0).setDisplaySize(this.config.width,this.config.height);
        
        this.healthText = this.add.bitmapText(10,25,'font', 'HEALTH: ' + health, 32);
        this.scoreText =  this.add.bitmapText(10,65,'font', 'SCORE: ' + score, 32);

        this.timer = this.time.addEvent({ 
            delay: 0,
            loop: true
        });
        this.spawnTime = this.time.addEvent({
            delay: 0, 
            loop: true
        });

    }

    update() {
        this.healthText.text = "HEALTH: " + health;
        this.scoreText.text = "SCORE: " + score
    }
}