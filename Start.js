var music;
var playerDamage = 1; 
class Start extends Phaser.Scene {
    constructor() {
        super('mainMenu');
    }

    preload() {
        //Level designs 
        this.load.image('level1', 'assets/leveldesign/lvl1Base.png');
        this.load.image('level2', 'assets/leveldesign/lvl2Base.png');
        this.load.image('level3', 'assets/leveldesign/lvl3Base.png');
        this.load.image('level4', 'assets/leveldesign/lvl4Base.png');

        //Heath Bar 
        for(var i=0; i<6; i++) {
            var filePath = 'assets/png/hBar'+i+'.png'
            this.load.image('hb'+ i, filePath);
        }

        //Sounds and music 
        this.load.audio('music', 'assets/soundEffects/startMusic.mp3');
        this.load.audio('beam', 'assets/soundEffects/beam.mp3');
        this.load.audio('spawnSoundEffect', 'assets/soundEffects/spawn.mp3');
        this.load.audio('robotSoundEffect', 'assets/soundEffects/robotSpeaking.mp3');
        this.load.audio('lvl1Music', 'assets/soundEffects/lvl1Music.mp3')
        this.load.audio('lvl2Music', 'assets/soundEffects/lvl2Music.mp3')

        this.load.spritesheet("startButton", 'assets/png/startBtn.png', {
            frameWidth: 64,
            frameHeight: 32
        });
        this.load.spritesheet("settingsButton", 'assets/png/settingsBtn.png', {
            frameWidth: 64,
            frameHeight: 32
        });
        this.load.spritesheet("skipButton", 'assets/png/skipBtn.png', {
            frameWidth: 64,
            frameHeight: 32
        });


        this.load.image('bg', 'assets/leveldesign/bg.png');
        this.load.image('bg2', 'assets/leveldesign/blackBackground.png');
        this.load.image('simBg', 'assets/leveldesign/simBg.png');

        this.load.image('asteroids', 'assets/leveldesign/asteroids.png');
        this.load.image('farPlanets', 'assets/leveldesign/farPlanets.png');
        this.load.image('bigPlanet', './assets/leveldesign/bigPlanet.png');

        this.load.spritesheet("trainer", "assets/png/trainerIdle.png", {
            frameWidth: 567, 
            frameHeight: 556
        });
        this.load.spritesheet("targetPractice", "assets/png/targetPractice.png", {
            frameWidth: 230,
            frameHeight: 416
        });

        this.load.image('targetDead1', 'assets/png/targetDead1.png');
        this.load.image('targetDead2', 'assets/png/targetDead2.png');
        this.load.image('targetDead3', 'assets/png/targetDead3.png');
        this.load.image('targetDead4', 'assets/png/targetDead4.png');

        this.load.spritesheet("thrusters", 'assets/png/thrusters.png', {
            frameWidth: 172,
            frameHeight: 139
        });

        this.load.bitmapFont('font', 'assets/font/font_0.png', 'assets/font/font.fnt');

        // Preload enemies in this scene to be used in later scenes
        for(var i=1; i<5; i++) {
            var filePath = 'assets/png/Blob'+i+'.png';
            this.load.image('enemy'+i+'_idle', filePath);
        }
        //Spawning pics for animation 
        this.load.image('spawn1', 'assets/effects/spwn1.png')
        this.load.image('spawn2', 'assets/effects/spwn2.png')

        //Elimination animation 
        this.load.image('impact1', 'assets/effects/impact1.png');
        this.load.image('impact2', 'assets/effects/impact2.png');
        this.load.image('impact3', 'assets/effects/impact3.png');
        this.load.image('impact4', 'assets/effects/impact4.png');
    }
    
    create() {
        //this.scene.start('Tut2')
        this.config = this.game.config;
        music = this.sound.add('music');

        this.musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        
        //Custom Cursor
        this.input.setDefaultCursor('url(assets/png/pointer.png), pointer');

        this.background = this.add.tileSprite(0,0,this.config.width,this.config.height,'bg');
        this.background.setOrigin(0,0);
        music.play(this.musicConfig);

        this.anims.create({
            key: 'startBtn',
            frames: this.anims.generateFrameNumbers('startButton'),
            frameRate: 10,
            repeat: 0
        });
       
        this.anims.create({
            key: 'settingsBtn',
            frames: this.anims.generateFrameNumbers('settingsButton'),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'skipBtn',
            frames: this.anims.generateFrameNumbers('skipButton'),
            frameRate: 2,
            repeat: -1
        });

        //Start Button
        this.startBtn = this.add.sprite(this.game.config.width/2, this.game.config.height/2.5, 'startButton').setScale(3);
        this.startBtn.on('pointerover', function() {
            this.startBtn.play('startBtn')}, 
            this
        )
        this.startBtn.on('pointerout', function() {
            this.startBtn.anims.pause()
            this.startBtn.setTexture('startButton')}, 
            this
        )
        this.startBtn.setInteractive().on('pointerdown', function() {
            this.cameras.main.fade(1000)},
            this
        );

        //Settings Button
        this.settingsBtn = this.add.sprite(this.game.config.width/2, this.game.config.height/2, 'settingsButton').setScale(2.5).setInteractive();
        this.settingsBtn.on('pointerover', function() {
            this.settingsBtn.play('settingsBtn')}, 
            this
        )
        this.settingsBtn.on('pointerout', function() {
            this.settingsBtn.anims.pause()
            this.settingsBtn.setTexture('settingsButton')}, 
            this
        )
        /*this.settingsBtn.setInteractive().on('pointerdown', function() {
            this.scene.start('bootGame')},
            this
        );*/

        //Spawning animation
        this.anims.create({
            key: 'spawnIn',
            frames: [
                {key: 'spawn1'},
                {key: 'spawn2'}
            ],
            frameRate: 15,
            repeat: 3
        });

        //Animation for when enemy is shot at 
        this.anims.create({
            key: 'impactAnim',
            frames: [
                {key: 'impact1'},
                {key: 'impact2'},
                {key: 'impact3'},
                {key: 'impact4'}
            ],
            frameRate: 15,
            repeat: 0
        });

        this.cameras.main.on('camerafadeoutcomplete',  function() {
            this.scene.start('bootGame')},
            this
        );
        
    }

    update() {
        this.background.tilePositionX += 3;
        this.background.tilePositionY -= 3;
    }
}