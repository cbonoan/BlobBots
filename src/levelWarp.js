class levelWarp extends Phaser.Scene {
    constructor() {
        super('LevelWarp');
    }

    create() {
        this.background = this.add.tileSprite(0,0,this.game.config.width,this.game.config.height,'bg').setOrigin(0,0);

        var bmText = new Phaser.GameObjects.BitmapText(this, 0,0,'font');
        bmText = this.add.bitmapText(this.game.config.width/4, 100, 'font', 'Welcome to the warp menu!\nPlease select a level to continue.',64,1);

        this.lvl1Btn = this.add.sprite(this.game.config.width/3, this.game.config.height/2.5, 'lvl1Button').setScale(3);
        this.lvl1Btn.on('pointerover', function() {
            this.lvl1Btn.play('lvl1Btn')}, 
            this
        )
        this.lvl1Btn.on('pointerout', function() {
            this.lvl1Btn.anims.pause()
            this.lvl1Btn.setTexture('lvl1Button')}, 
            this
        )
        this.lvl1Btn.setInteractive().on('pointerdown', function() {
            this.scene.start('Level1', {level: 1, health: 5, score: 0})},
            this
        );

        this.lvl2Btn = this.add.sprite(this.game.config.width/1.5, this.game.config.height/2.5, 'lvl2Button').setScale(3);
        this.lvl2Btn.on('pointerover', function() {
            this.lvl2Btn.play('lvl2Btn')}, 
            this
        )
        this.lvl2Btn.on('pointerout', function() {
            this.lvl2Btn.anims.pause()
            this.lvl2Btn.setTexture('lvl2Button')}, 
            this
        )
        this.lvl2Btn.setInteractive().on('pointerdown', function() {
            this.scene.start('Level2', {level: 2, health: 5, score: 0})},
            this
        );

        this.lvl3Btn = this.add.sprite(this.game.config.width/3, this.game.config.height/1.5, 'lvl3Button').setScale(3);
        this.lvl3Btn.on('pointerover', function() {
            this.lvl3Btn.play('lvl3Btn')}, 
            this
        )
        this.lvl3Btn.on('pointerout', function() {
            this.lvl3Btn.anims.pause()
            this.lvl3Btn.setTexture('lvl3Button')}, 
            this
        )
        this.lvl3Btn.setInteractive().on('pointerdown', function() {
            this.scene.start('Level3', {level: 3, health: 5, score: 0})},
            this
        );

        this.lvl4Btn = this.add.sprite(this.game.config.width/1.5, this.game.config.height/1.5, 'lvl4Button').setScale(3);
        this.lvl4Btn.on('pointerover', function() {
            this.lvl4Btn.play('lvl4Btn')}, 
            this
        )
        this.lvl4Btn.on('pointerout', function() {
            this.lvl4Btn.anims.pause()
            this.lvl4Btn.setTexture('lvl4Button')}, 
            this
        )
        this.lvl4Btn.setInteractive().on('pointerdown', function() {
            this.scene.start('Level4', {level: 4, health: 5, score: 0})},
            this
        );
    }

    update() {
        this.background.tilePositionX += 3;
        this.background.tilePositionY -= 3;
    }
}