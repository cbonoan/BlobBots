class Credits extends Phaser.Scene {
    constructor() {
        super('EndCredits');
    }

    create() {
        this.config = this.game.config; 

        this.cameras.main.fadeIn(1000);

        this.background = this.add.tileSprite(0,0,this.config.width,this.config.height,'bg').setOrigin(0,0);
        this.asteroids = this.add.tileSprite(this.config.width/2, this.config.height/2,272,160, 'asteroids').setDisplaySize(this.config.width,this.config.height);
        this.farPlanets = this.add.tileSprite(0,0 ,150,100, 'farPlanets').setDisplaySize(this.config.width,this.config.height).setOrigin(0);
    
        this.bmText = this.add.bitmapText(this.game.config.width/4, 100, 'font', 'Thank you for playing our game!\n\nContributors:\nCharles Bonoan\nArvin Shertukde\nRichard Guiles\nMariah Limon\nA.K.A\nBLOB BOTS',64,1);

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

    }
}