var enemyElapsed = [];
var keyObjs = []
for (var i = 0; i < 9; i++) {
    enemyElapsed[i] = null;
}
for (var i = 0; i < 9; i++) {
    enemies[i] = null;
    keyObjs[i] = null;
}
var check_enemy = [false, false, false, false, false, false, false, false, false];

class Lvl2 extends Phaser.Scene {
    constructor() {
        super('Level2');
    }

    init(data) {
        this.level = data.level
        this.health = data.health;
        this.score = data.score;
    }

    create() {
        this.config = this.game.config;

        this.key = 0
        for (var keyValue = 97; keyValue < 106; keyValue++) {
            keyObjs[this.key] = this.input.keyboard.addKey(keyValue);
            this.key++;
        }

        this.beamSound = this.sound.add('beam');
        this.spawnSound = this.sound.add('spawnSoundEffect');

        this.cameras.main.fadeIn(500);
        this.gameOverCam = this.cameras.add();

        music.stop();
        this.lvl2Music = this.sound.add('lvl2Music');
        this.lvl2Music.play({
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        this.add.image(0, 0, 'level2').setOrigin(0).setDisplaySize(this.config.width, this.config.height);

        healthBar = this.add.image(255, 30, 'hb' + this.health)
        this.scoreText = this.add.bitmapText(10, 70, 'font', 'SCORE: ' + this.score, 35);

        this.timer = this.time.addEvent({
            delay: 0,
            loop: true
        });
        this.spawnTime = this.time.addEvent({
            delay: 0,
            loop: true
        });

        this.enemySpawnTime = 2500;

        this.lvl2Music.on('complete', function () {
            this.cameras.main.fade(1500);
            this.enemySpawnTime = 10000;
        }, this);

        this.cameras.main.on('camerafadeoutcomplete', function () {
            this.scene.start('Level3', { level: 3, health: this.health, score: this.score });
            this.scene.stop();
        }, this);

        this.gameOverCam.on('camerafadeoutcomplete', function() {
            this.scene.start('GameOver', {level: this.level, health: 5, score: this.score})
            this.lvl2Music.stop();
            this.scene.stop();
        }, this)

    }

    update() {

        healthBar.setTexture('hb' + this.health);
        this.scoreText.text = "SCORE: " + this.score;
        if (this.health <= 0) {
            this.health = 0;
            this.gameOverCam.fade(1000);
        }
      
        for (var i = 0; i < keyObjs.length; i++) {
            if (Phaser.Input.Keyboard.JustDown(keyObjs[i])) {
                if (check_enemy[i] == true) {
                    console.log('hi')
                    this.beamSound.play();
                    enemies[i].hp -= playerDamage;
                    if (enemies[i].hp <= 0) {
                        enemies[i].setX(this.game.config.width + 1000).setY(this.game.config.height + 1000);
                        enemies[i].destroyEnemy();
                        //Passing in tile pos enemy was on 
                        enemies[i] = null;
                        check_enemy[i] = false;
                        enemyElapsed[i] = null;
                        this.enemyDown(i + 1)
                    }
                } else if (!check_enemy[i]) {
                    this.health--;
                }
            }
        }

        if (this.spawnTime.getElapsed() > this.enemySpawnTime) {
            var spawnAmt = Math.floor(Math.random() * 2) + 1
            this.spawnEnemy(spawnAmt);
            this.spawnTime.reset({
                delay: 0,
                loop: true
            });


        }

        if (this.timer.getElapsed() > 7500 && this.enemySpawnTime > 1000) {
            this.enemySpawnTime -= 150;
            this.timer.reset({
                delay: 0,
                loop: true
            });
        }

        for (var i = 0; i < enemyElapsed.length; i++) {
            if (enemyElapsed[i] != null) {
                if (enemyElapsed[i].getElapsed() > 3500) {
                    enemies[i].destroyEnemy();
                    this.score -= 5;
                    this.health--;
                    enemyElapsed[i] = null;
                    enemies[i] = null;
                    check_enemy[i] = false;
                }
            }
        }
    }

    spawnEnemy(spawnAmt) {
        //To make sure multiple enemies don't spawn in the same grid space
        console.log(check_enemy);

        var gridFilled = true;
        for (var i = 0; i < check_enemy.length; i++) {
            if (!check_enemy[i]) {
                gridFilled = false
            }
        }

        if (!gridFilled) {
            //console.log(this.this.enemySpawnTime)
            var enemyTile = Math.floor(Math.random() * 9) + 1;
            var enemyTile2 = Math.floor(Math.random() * 9) + 1;
            var enemyType = Math.floor(Math.random() * 2) + 1;
            //Choose a tile that doesn't have an enemy on it 
            while (check_enemy[enemyTile - 1] || check_enemy[enemyTile2 - 1] || enemyTile2 == enemyTile) {
                enemyTile = Math.floor(Math.random() * 9) + 1;
                enemyTile2 = Math.floor(Math.random() * 9) + 1;
            }

            switch (enemyTile) {
                case 1:
                    var x = (this.game.config.width / 3) - 45;
                    var y = this.game.config.height - 275;
                    break;
                case 2:
                    var x = (this.game.config.width / 2);
                    var y = this.game.config.height - 275;
                    break;
                case 3:
                    var x = (this.game.config.width - 550);
                    var y = this.game.config.height - 275;
                    break;
                case 4:
                    var x = (this.game.config.width / 3) - 45;
                    var y = this.game.config.height / 2;
                    break;
                case 5:
                    var x = (this.game.config.width / 2);
                    var y = this.game.config.height / 2;
                    break;
                case 6:
                    var x = (this.game.config.width - 550);
                    var y = this.game.config.height / 2;
                    break;
                case 7:
                    var x = (this.game.config.width / 3) - 45;
                    var y = this.game.config.height / 3.5;
                    break;
                case 8:
                    var x = (this.game.config.width / 2);
                    var y = this.game.config.height / 3.5;
                    break;
                case 9:
                    var x = (this.game.config.width - 550);
                    var y = this.game.config.height / 3.5;
                    break;
            }
            switch (enemyTile2) {
                case 1:
                    var x2 = (this.game.config.width / 3) - 45;
                    var y2 = this.game.config.height - 275;

                    break;
                case 2:
                    var x2 = (this.game.config.width / 2);
                    var y2 = this.game.config.height - 275;

                    break;
                case 3:
                    var x2 = (this.game.config.width - 550);
                    var y2 = this.game.config.height - 275;

                    break;
                case 4:
                    var x2 = (this.game.config.width / 3) - 45;
                    var y2 = this.game.config.height / 2;

                    break;
                case 5:
                    var x2 = (this.game.config.width / 2);
                    var y2 = this.game.config.height / 2;

                    break;
                case 6:
                    var x2 = (this.game.config.width - 550);
                    var y2 = this.game.config.height / 2;

                    break;
                case 7:
                    var x2 = (this.game.config.width / 3) - 45;
                    var y2 = this.game.config.height / 3.5;

                    break;
                case 8:
                    var x2 = (this.game.config.width / 2);
                    var y2 = this.game.config.height / 3.5;

                    break;
                case 9:
                    var x2 = (this.game.config.width - 550);
                    var y2 = this.game.config.height / 3.5;

                    break;
            }

            var spawnAnim = this.add.sprite(x, y, 'spawn1');
            spawnAnim.play('spawnIn');
            this.spawnSound.play({
                mute: false,
                volume: 0.5,
                rate: 1.5,
                loop: false,
                delay: 0
            });

            spawnAnim.on('animationcomplete', function () {
                spawnAnim.destroy();
                var enemy = new Enemy(this, enemyTile, this.game.config.width, this.game.config.height, "enemy" + enemyType, 1);
                enemy.hp = enemyType;
                enemies[enemyTile - 1] = enemy;

                enemyElapsed[enemyTile - 1] = this.time.addEvent({
                    delay: 0,
                    loop: true
                });
                check_enemy[enemyTile - 1] = true;

            }, this);

            if (spawnAmt > 1) {
                var enemyType2 = Math.floor(Math.random() * 2) + 1;
                var spawnAnim2 = this.add.sprite(x2, y2, 'spawn1');
                spawnAnim2.play('spawnIn');
                this.spawnSound.play({
                    mute: false,
                    volume: 0.5,
                    rate: 1.5,
                    loop: false,
                    delay: 0
                });

                spawnAnim2.on('animationcomplete', function () {
                    spawnAnim2.destroy();
                    var enemy = new Enemy(this, enemyTile2, this.game.config.width, this.game.config.height, "enemy" + enemyType2, 1);
                    enemy.hp = enemyType2;
                    enemies[enemyTile2 - 1] = enemy;

                    enemyElapsed[enemyTile2 - 1] = this.time.addEvent({
                        delay: 0,
                        loop: true
                    });
                    check_enemy[enemyTile2 - 1] = true;

                }, this);
            }
        }
    }

    enemyDown(tilePos) {
        switch (tilePos) {
            case 1:
                var x = (this.game.config.width / 3) - 45;
                var y = this.game.config.height - 275;
                break;
            case 2:
                var x = (this.game.config.width / 2);
                var y = this.game.config.height - 275;
                break;
            case 3:
                var x = (this.game.config.width - 550);
                var y = this.game.config.height - 275;
                break;
            case 4:
                var x = (this.game.config.width / 3) - 45;
                var y = this.game.config.height / 2;
                break;
            case 5:
                var x = (this.game.config.width / 2);
                var y = this.game.config.height / 2;
                break;
            case 6:
                var x = (this.game.config.width - 550);
                var y = this.game.config.height / 2;
                break;
            case 7:
                var x = (this.game.config.width / 3) - 45;
                var y = this.game.config.height / 3.5;
                break;
            case 8:
                var x = (this.game.config.width / 2);
                var y = this.game.config.height / 3.5;
                break;
            case 9:
                var x = (this.game.config.width - 550);
                var y = this.game.config.height / 3.5;
                break;
        }

        var impact = this.add.sprite(x, y, 'impact1');
        impact.setScale(1.8);
        impact.play('impactAnim')
        impact.on('animationcomplete', function () {
            impact.destroy();
        }, this);
        this.score += 10;

    }
}