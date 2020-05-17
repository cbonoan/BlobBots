var text3 = ["Thank you for saving our universe!",
"Those things don't look like they'll be back ever again.",
"The whole universe is grateful to you, rookie."];

class Win extends Phaser.Scene {
    constructor() {
        super('GameComplete');
    }

    init(data) {
        this.health = data.health;
        this.score = data.score;
    }

    create() {
        this.config = this.game.config;
        this.i = 0;

        music.resume(); 
        this.cameras.main.fadeIn(1000);          

        this.background = this.add.tileSprite(0,0,this.config.width,this.config.height,'bg').setOrigin(0,0);
        this.asteroids = this.add.tileSprite(this.config.width/2, this.config.height/2,272,160, 'asteroids').setDisplaySize(this.config.width,this.config.height);
        this.farPlanets = this.add.tileSprite(0,0 ,150,100, 'farPlanets').setDisplaySize(this.config.width,this.config.height).setOrigin(0);
        
        this.anims.create({
            key: "trainerIdle",
            frames: this.anims.generateFrameNumbers("trainer"),
            frameRate: 10,
            repeat: -1 //infinite loops 
        });
        this.anims.create({
            key: 'thrusts',
            frames: this.anims.generateFrameNumbers('thrusters'),
            frameRate: 20,
            repeat: -1 //Infinite repeat
        });
        this.thrusts = this.add.sprite(this.game.config.width/5.2, this.game.config.height-220, 'thrusters');
        this.thrusts2 = this.add.sprite(this.game.config.width/3.5, this.game.config.height-220, 'thrusters');
        this.thrusts.play('thrusts');
        this.thrusts.angle = -90; 
        this.thrusts.scale = 0.5;
        this.thrusts2.play('thrusts');
        this.thrusts2.angle = -90; 
        this.thrusts2.scale = 0.5;
       
        this.trainer = this.add.sprite(this.game.config.width/4,this.game.config.height/1.95,'trainerIdle');
        this.trainer.play('trainerIdle');
        this.trainerVoice = this.sound.add('robotSoundEffect'); 

        this.bmText = new Phaser.GameObjects.BitmapText(this, 0,0,'font');

        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.speechX = this.game.config.width/3;
        this.speechY = this.game.config.height/24;

        this.bmText.setVisible(false);
        this.cameras.main.on('camerafadeoutcomplete',  function() {
            this.scene.start('EndCredits');
            this.scene.stop();
        }, this);
    
    }

    update() {
        var x = Math.floor(Math.random()*5) + 1
        var y = Math.floor(Math.random()*5) + 1
        this.background.tilePositionX += 3;
        this.background.tilePositionY -= 3;
        this.asteroids.tilePositionX += x;
        this.asteroids.tilePositionY -= y;
        this.farPlanets.tilePositionX -= x;
        this.farPlanets.tilePositionY += y;

        if(Phaser.Input.Keyboard.JustDown(this.keyEnter) || this.i==0){
            console.log(this.i)
            if(this.i < text3.length)
                this.updateText(text3[this.i]);
            else 
                this.i++;
        }

        if(this.i > text3.length){
            this.cameras.main.fade(1500);
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
        
        this.createSpeechBubble(this.speechX,this.speechY,500,300,quote);
        this.i++;  
        
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