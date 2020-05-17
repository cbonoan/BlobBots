var healthBar
var health = 5;
var score = 0; 
var keyObjs = [];
//Will keep track of how long an enemy has stayed on screen in ms
var enemyElapsed = [];
for(var i =0; i<9; i++) {
    enemyElapsed[i] = null;
}
for(var i=0; i<9; i++) {
    enemies[i] = null; 
}
var check_enemy = [false, false, false, false, false, false, false, false, false];

class Lvl1 extends Phaser.Scene {
    constructor() {
        super('Level1');
    }

    //This will help keep track of data i.e. level user is on, score, and health 
    init(data) {
        this.level = data.level;
    }

    preload() {
    }

    create() {
        this.config = this.game.config;

        this.beamSound = this.sound.add('beam');
        this.spawnSound = this.sound.add('spawnSoundEffect');

        music.pause();

        this.lvl1Music = this.sound.add('lvl1Music');
        this.lvl1Music.play({
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        //To add fade out effect for game over 
        this.gameOverCam = this.cameras.add();

        //To make sure audio keeps playing
        if (this.sound.context.state === 'suspended') {
            this.sound.context.resume();
        }

        this.key = 0
        for (var keyValue = 97; keyValue < 106; keyValue++) {
            keyObjs[this.key] = this.input.keyboard.addKey(keyValue);
            this.key++;
        }

        //Background 
        this.add.image(0, 0,'level1').setOrigin(0).setDisplaySize(this.config.width,this.config.height);
    
        //Health and score 
        healthBar = this.add.image(255, 30, 'hb5')
        this.scoreText =  this.add.bitmapText(10,70,'font', 'SCORE: ' + score, 35);

        for(var i=0; i<check_enemy.length;i++) {
            check_enemy[i] = false; 
        }

        this.timer = this.time.addEvent({ 
            delay: 0,
            loop: true
        });
        this.spawnTime = this.time.addEvent({
            delay: 0, 
            loop: true
        });
        this.enemySpawnTime = 3500;

        this.lvl1Music.on('complete', function() {
            this.cameras.main.fade(1500);
            this.enemySpawnTime = 10000;
        }, this);

        this.cameras.main.on('camerafadeoutcomplete',  function() {
            this.scene.start('Tut2', {level: 2, health: health, score: score});
            this.scene.stop();
        }, this);
        
    }

    update() {
        healthBar.setTexture('hb'+health);
        this.scoreText.text = "SCORE: " + score;
       
        if(health <= 0) {
            //this.gameOverCam.fade(1000);
            health = 0; 
        }

        for(var i = 0; i < keyObjs.length; i++) {
            if(Phaser.Input.Keyboard.JustDown(keyObjs[i])) {
                if(check_enemy[i]) {
                    this.beamSound.play();
                    enemies[i].hp -= playerDamage; 
                    if(enemies[i].hp <= 0) {
                        enemies[i].setX(this.game.config.width+1000).setY(this.game.config.height+1000);
                        enemies[i].destroyEnemy();
                        //Passing in tile pos enemy was on 
                        enemies[i] = null;
                        check_enemy[i] = false;
                        enemyElapsed[i] = null;
                        this.enemyDown(i+1)
                    }
                } else if(!check_enemy[i]) {
                    health--;
                }
            } 
        }

        if(this.spawnTime.getElapsed() > this.enemySpawnTime){
            this.spawnEnemy();
            this.spawnTime.reset({
                delay: 0,
                loop: true
            });
        }

        //After amount of seconds, speed up spawn time
        if(this.timer.getElapsed() > 5500 && this.enemySpawnTime > 1000) {
            this.enemySpawnTime -= 250; 
            this.timer.reset({
                delay: 0,
                loop: true
            });
        }

        //If an enemy is on screen for more than 3.5 secs, then take health and score away 
        for(var i=0; i<enemyElapsed.length; i++) {
            if(enemyElapsed[i] != null) {
                if(enemyElapsed[i].getElapsed() > 3500) {
                    enemies[i].destroyEnemy();
                    score -= 5;
                    health --; 
                    enemyElapsed[i] = null; 
                    enemies[i] = null;
                    check_enemy[i] = false;
                }
            }
        }
    }    

    spawnEnemy() {
        //To make sure multiple enemies don't spawn in the same grid space
        var gridFilled = true;
        for(var i=0; i<check_enemy.length; i++) {
            if(!check_enemy[i]) {
                gridFilled = false
            }
        }
        //console.log(gridFilled)
        //console.log(check_enemy)
        if(!gridFilled){
            //console.log(this.this.enemySpawnTime)
            var enemyTile = Math.floor(Math.random()*9) + 1;
            //Choose a tile that doesn't have an enemy on it 
            while(check_enemy[enemyTile-1]) {
                enemyTile = Math.floor(Math.random()*9) + 1;
            }
            switch(enemyTile) {
                case 1:
                    var x = (this.game.config.width/3)-45;
                    var y =  this.game.config.height-275;
                    break;
                case 2:
                    var x = (this.game.config.width/2);
                    var y =  this.game.config.height-275;
                    break;
                case 3:
                    var x = (this.game.config.width-550);
                    var y =  this.game.config.height-275;
                    break;
                case 4:
                    var x = (this.game.config.width/3)-45;
                    var y =  this.game.config.height/2;
                    break;
                case 5:
                    var x = (this.game.config.width/2);
                    var y =  this.game.config.height/2;
                    break;
                case 6:
                    var x = (this.game.config.width-550);
                    var y =  this.game.config.height/2;
                    break;
                case 7:
                    var x = (this.game.config.width/3)-45;
                    var y =  this.game.config.height/3.5;
                    break;
                case 8:
                    var x = (this.game.config.width/2);
                    var y =  this.game.config.height/3.5;
                    break;
                case 9: 
                    var x = (this.game.config.width-550);
                    var y =  this.game.config.height/3.5;
                    break;    
            }

            var spawnAnim = this.add.sprite(x,y,'spawn1');
            spawnAnim.play('spawnIn');
            this.spawnSound.play({
                mute: false,
                volume: 0.5,
                rate: 1.5,
                loop: false,
                delay: 0
            });

            spawnAnim.on('animationcomplete', function() {
                spawnAnim.destroy();
                //new Enemy(scene, enemyTile, x pos of sprite, y pos of sprite, enemy texture, scale)
                var enemy = new Enemy(this, enemyTile, this.game.config.width, this.game.config.height, "enemy1",1);
                //Adding health for enemies
                //For lvl 1, all enemies will only take one hit to kill, but good to note for future ref
                enemy.hp = 1; 
                enemies[enemyTile-1] = enemy;

                enemyElapsed[enemyTile-1] = this.time.addEvent({
                    delay: 0, 
                    loop: true
                });

                check_enemy[enemyTile-1] = true;
            },  this);
            //enemyElapsed[enemyTile-1] = Math.floor(performance.now());  
            //console.log(enemyElapsed[enemyTile-1].getElapsed());
        } 
    }

    enemyDown(tilePos) {
        switch(tilePos) {
            case 1:
                var x = (this.game.config.width/3)-45;
                var y =  this.game.config.height-275;
                break;
            case 2:
                var x = (this.game.config.width/2);
                var y =  this.game.config.height-275;
                break;
            case 3:
                var x = (this.game.config.width-550);
                var y =  this.game.config.height-275;
                break;
            case 4:
                var x = (this.game.config.width/3)-45;
                var y =  this.game.config.height/2;
                break;
            case 5:
                var x = (this.game.config.width/2);
                var y =  this.game.config.height/2;
                break;
            case 6:
                var x = (this.game.config.width-550);
                var y =  this.game.config.height/2;
                break;
            case 7:
                var x = (this.game.config.width/3)-45;
                var y =  this.game.config.height/3.5;
                break;
            case 8:
                var x = (this.game.config.width/2);
                var y =  this.game.config.height/3.5;
                break;
            case 9: 
                var x = (this.game.config.width-550);
                var y =  this.game.config.height/3.5;
                break;    
        }

        var impact = this.add.sprite(x,y,'impact1');
        impact.setScale(1.8);
        impact.play('impactAnim')
        impact.on('animationcomplete', function() {
            impact.destroy();
        }, this);
        score += 10;

    }

}