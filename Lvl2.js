
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
        
        healthBar = this.add.image(255, 30, 'hb'+this.health)
        this.scoreText =  this.add.bitmapText(10,70,'font', 'SCORE: ' + this.score, 35);

        this.timer = this.time.addEvent({ 
            delay: 0,
            loop: true
        });
        this.spawnTime = this.time.addEvent({
            delay: 0, 
            loop: true
        });

        this.enemySpawnTime = 3500; 

    }

    update() {
        healthBar.setTexture('hb'+health);
        this.scoreText.text = "SCORE: " + score;
    }
}