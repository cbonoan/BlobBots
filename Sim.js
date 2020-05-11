var check_enemy = [];

class Sim extends Phaser.Scene{
    constructor(){
        super('Training');
    }

    create() {
        this.config = this.game.config;
        this.beamSound = this.sound.add('beam');
        //Putting keyObjs into an array for easier use 
        //Key values for numpad 1-9 is 97-105
        for(var keyValue = 97; keyValue < 106; keyValue++) {
            keyObjs.push(this.input.keyboard.addKey(keyValue));
        }

        this.background = this.add.tileSprite(0,0,this.config.width,this.config.height,'bg');
        this.background.setOrigin(0,0);
        
        this.enemies = this.add.group();
        for(var i=1; i<10; i++) {
            //var enemy = "enemy"+(i+1);
            //Paramets are (scene, tile position, width of scene, height of scene, enemy sprite key to be used)
            var enemy = new Enemy(this,i,this.config.width,this.config.height,"targetPractice", 0.4);
            //Add new enemy into enemies group 
            enemy.play("targetPractice_idle");
            enemies[i-1] = enemy;
            check_enemy[i-1] = true;
        }
        console.log(enemies);
        this.cameras.main.on('camerafadeoutcomplete',  function() {
            keyObjs = [];
            this.scene.resume("bootGame");
            this.scene.stop();
        }, this);
    }
    update() {
        this.background.tilePositionX += 3;
        for(var i = 0; i < keyObjs.length; i++) {
            if(Phaser.Input.Keyboard.JustDown(keyObjs[i]) && check_enemy[i]) {
                this.beamSound.play();
                var enemy = enemies[i];
                //console.log(enemies);
                this.enemyDown(enemies[i])
                enemies[i] = null;
                check_enemy[i] = false;
            }
        }

        
        if(this.isSimComplete()) {
            this.cameras.main.fade(1500);
        }
    }

    enemyDown(enemy) {
        enemy.play("targetPractice_dead");
        enemy.on('animationcomplete', function() {
            enemy.destroy();
        }, this);
    }

    isSimComplete() {
        var simComplete = true;
        for(var i=0; i<enemies.length; i++) {
            if(enemies[i] != null) {
                simComplete = false;
            }
        }
        return simComplete;
    }
}