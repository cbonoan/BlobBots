class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
  }

  init(data) {
    this.level = data.level;
    this.score = data.score;
    this.health = data.health;
  }

  create() {
      this.config = this.game.config;
      music.stop();
      var goMusic = this.sound.add('gameOverMusic');
      goMusic.play({
          mute: false,
          volume: 0.8,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
      });

      this.gobackground = this.add.tileSprite(0,0,this.config.width,this.config.height,'bg');
      this.gobackground.setOrigin(0,0);

      this.gameover = this.add.sprite(this.game.config.width/2,this.game.config.height/4,'gameOver1');
      this.gameover.play('gameOverScreen');

      //Restart Button
      this.restartBtn = this.add.sprite(this.game.config.width/3, this.game.config.height/2, 'restartButton').setScale(3);
      this.restartBtn.on('pointerover', function() {
          this.restartBtn.play('restartBtn')}, 
          this
      );
      this.restartBtn.on('pointerout', function() {
          this.restartBtn.anims.pause()
          this.restartBtn.setTexture('restartButton')}, 
          this
      );
      this.restartBtn.setInteractive().on('pointerdown', function() {
          var levelName = "Level"+this.level;
          this.scene.start(levelName, {level: this.level, health: 5, score: this.score-100});
          this.scene.stop()
        },
          this
      );

      this.menuBtn = this.add.sprite(this.game.config.width/1.5, this.game.config.height/2, 'menuButton').setScale(2.5).setInteractive();
      this.menuBtn.on('pointerover', function() {
          this.menuBtn.play('menuBtn')}, 
          this
      );
      this.menuBtn.on('pointerout', function() {
          this.menuBtn.anims.pause()
          this.menuBtn.setTexture('menuButton')}, 
          this
      );
      this.menuBtn.setInteractive().on('pointerdown', function() {
        this.scene.start('mainMenu');
        this.scene.stop();
      }, this);

  }

 update() {
   this.gobackground.tilePositionX += 3;
   this.gobackground.tilePositionY += 3;
  }
}
