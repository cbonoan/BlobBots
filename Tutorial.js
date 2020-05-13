var text = ["WELCOME EARTHLING.\n\n[Press ENTER to Continue]",
"My name is... FOUR-SEVEN-SIX-TWO-FIVE-ONE. But you can call me...",
"HERB. I will be your trainer this fine galatic morning!",
"First things first... make sure the SAFETY is off on your blaster! \n\n(Ensure that NUM LOCK is on)",
"Now that you have completed the first task, I will show you how to properly handle your blaster! It's pretty simple actually.",
"You will simply use the NUM PAD to shoot at the enemy. Luckily the enemy always shows up in a nice 3x3 grid formation!",
"Each number on the NUM PAD will correlate to the grid that the enemy is standing on.\n\nOK, enough of me talking, let's train!",    
"For this simulation, your job is to simply get rid of all the enemies on screen. Remember to make sure NUM LOCK is on!",
"...*STARTING SIMULATION*...",
"Awesome work in there!",
"Keep in mind that not all enemies are just going to stand there like that and are trained to harm you if not destroyed right away. BUT NO WORRIES.",
"OK, for the next part of the trai...",
"Uh oh, this isn't good.. Looks like the enemy has breached our ship! No matter. What better way to practice than on real targets! Lucky you!",
"Remember what I taught you and good luck!"];

var trainer; 
var thrusts;
var thrusts2;
var speechBubble;
var config;
var keyObjs = [];
var enemies = [];
for(var i=0; i<9; i++) {
    enemies[i] = null; 
}

class Tutorial extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    
    preload() {        
    }

    create() {    
        this.config = this.game.config;

        if(this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        music.setVolume(0.1);
        this.cameras.main.fadeIn(1000);          
        //this.scene.start("Level1")
        this.timer = this.time.addEvent({
            loop: true
        });
        var bmText = new Phaser.GameObjects.BitmapText(this, 0,0,'font');
        this.i = 0;

        // Check if user is in fullscreen
        if(window.innerWidth < this.config.width/1.5 || window.innerHeight < this.config.height/1.5) {
            //alert("This game HIGHLY recommends you play on a fullscreen. Please enlarge your window to get the best experience!");
            this.add.image(0,0,'bg2').setDisplaySize(this.game.config.width,this.game.config.height);
            this.scene.setVisible(false); 
            this.scene.launch("fullscreen");
            this.scene.pause();
        }
        this.background = this.add.tileSprite(0,0,this.config.width,this.config.height,'bg');
        this.background.setOrigin(0,0);
        this.asteroids = this.add.tileSprite(this.config.width/2, this.config.height/2,272,160, 'asteroids').setDisplaySize(this.config.width,this.config.height);
        this.farPlanets = this.add.tileSprite(0,0 ,150,100, 'farPlanets').setDisplaySize(this.config.width,this.config.height).setOrigin(0);
        //this.bigPlanet = this.add.tileSprite((this.config.width/2)-1000, this.config.height/2, 88,87, 'bigPlanet');

        this.anims.create({
            key: "trainerIdle",
            frames: this.anims.generateFrameNumbers("trainer"),
            frameRate: 10,
            repeat: -1 //infinite loops 
        });

        this.anims.create({
            key: "targetPractice_idle",
            frames: this.anims.generateFrameNumbers("targetPractice"),
            frameRate: 10, 
            repeat: -1 
        });
        this.anims.create({
            key: "targetPractice_dead",
            frames: [
                {key: 'targetDead1'},
                {key: 'targetDead3'},
                {key: 'targetDead4', duration: 50}
            ],
            frameRate: 10, 
            repeat: 0 // no repeat
        });

        this.anims.create({
            key: 'thrusts',
            frames: this.anims.generateFrameNumbers('thrusters'),
            frameRate: 20,
            repeat: -1 //Infinite repeat
        });
    
        thrusts = this.add.sprite(this.game.config.width/5.2, this.game.config.height-220, 'thrusters');
        thrusts2 = this.add.sprite(this.game.config.width/3.5, this.game.config.height-220, 'thrusters');
        thrusts.play('thrusts');
        thrusts.angle = -90; 
        thrusts.scale = 0.5;
        thrusts2.play('thrusts');
        thrusts2.angle = -90; 
        thrusts2.scale = 0.5;
        
        trainer = this.add.sprite(this.game.config.width/4,this.game.config.height/1.95,'trainerIdle');
        trainer.play('trainerIdle');
        this.trainerVoice = this.sound.add('robotSoundEffect');
        
        //speechBubble = this.add.image(config.width/3,config.height/6.5,'speechBubble');
        //speechBubble.setScale(.8);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.speechX = this.game.config.width/3;
        this.speechY = this.game.config.height/24;     
        
        //Skip tutorial button 
        this.skipBtn = this.add.sprite(this.config.width - 350, this.config.height - 200, 'skipButton').setScale(3);
        this.skipBtn.on('pointerover', function() {
            this.skipBtn.play('skipBtn')}, 
            this
        )
        this.skipBtn.on('pointerout', function() {
            this.skipBtn.anims.pause()
            this.skipBtn.setTexture('skipButton')}, 
            this
        )
        this.skipBtn.setInteractive().on('pointerdown', function() {
            this.cameras.main.fade(1000)
        },  this);
        
        this.cameras.main.on('camerafadeoutcomplete',  function() {
            this.scene.start('Level1', {level: 1});
            this.scene.stop();
        }, this);

        
    }


    update() {
        // Just in case 'fullscreen' scene was played
        this.scene.setVisible(true);

        var x = Math.floor(Math.random()*5) + 1
        var y = Math.floor(Math.random()*5) + 1
        this.background.tilePositionX += 3;
        this.background.tilePositionY -= 3;
        this.asteroids.tilePositionX += x;
        this.asteroids.tilePositionY -= y;
        this.farPlanets.tilePositionX -= x;
        this.farPlanets.tilePositionY += y;
       // this.bigPlanet.tilePositionX += 25

        if(Phaser.Input.Keyboard.JustDown(this.keyEnter) || this.i==0){
            if(this.i < text.length)
                this.updateText(text[this.i]);
            else 
                this.i++;
        }
        
        if(this.i > text.length){
            this.fade();
        }
    }
    updateText(quote) {        
        if(this.i==0 || this.i%3==0) {
            var audioRate = Math.random()*2 + 1; 
            this.trainerVoice.play({
                mute: false,
                volume: 0.2,
                rate: audioRate,
                loop: false,
                delay: 0
            });
        }
        
        if(quote == "...*STARTING SIMULATION*...") {
            // Plays Sim.js
            this.scene.launch('Training');
            this.scene.pause();
            this.createSpeechBubble(this.speechX,this.speechY,500,300,"*ENDING SIMULATION*");
            this.i++;
        } else {
            this.createSpeechBubble(this.speechX,this.speechY,500,300,quote);
            this.i++;  
        } 
        
    }

    fade() {
        this.cameras.main.fade(1500);
    }

    createSpeechBubble (x, y, width, height, quote)
    {
        var bubbleWidth = width;
        var bubbleHeight = height;
        var bubblePadding = 10;
        var arrowHeight = bubbleHeight / 4;

        var bubble = this.add.graphics({ x: x, y: y });

        //  Bubble shadow
        bubble.fillStyle(0x222222, 0.5);
        bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

        //  Bubble color
        bubble.fillStyle(0xffffff, 1);

        //  Bubble outline line style
        bubble.lineStyle(4, 0x565656, 1);

        //  Bubble shape and outline
        bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

        //  Calculate arrow coordinates
        var point1X = Math.floor(bubbleWidth / 7);
        var point1Y = bubbleHeight;
        var point2X = Math.floor((bubbleWidth / 7) * 2);
        var point2Y = bubbleHeight;
        var point3X = Math.floor(bubbleWidth / 7);
        var point3Y = Math.floor(bubbleHeight + arrowHeight);

        //  Bubble arrow shadow
        bubble.lineStyle(4, 0x222222, 0.5);
        bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

        //  Bubble arrow fill
        bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
        bubble.lineStyle(2, 0x565656, 1);
        bubble.lineBetween(point2X, point2Y, point3X, point3Y);
        bubble.lineBetween(point1X, point1Y, point3X, point3Y);

        // Grabs bounds of bitmap text and word wraps to make sure chars don't go outside of 
        // speech bubble
        var bmText = this.add.bitmapText(0,0,'font',quote,28,0).setMaxWidth(width-125);
        bmText.tint = 0x000000;
        var b = bmText.getTextBounds().global;
        bmText.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
        
    }
}