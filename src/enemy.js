// Class for each new enemy creation
class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, enemyNum, width,height, enemyType, scale) {
        switch(enemyNum) {
            case 1:
                var x = (width/3)-45;
                var y =  height-275;
                break;
            case 2:
                var x = (width/2);
                var y =  height-275;
                break;
            case 3:
                var x = (width-550);
                var y =  height-275;
                break;
            case 4:
                var x = (width/3)-45;
                var y =  height/2;
                break;
            case 5:
                var x = (width/2);
                var y =  height/2;
                break;
            case 6:
                var x = (width-550);
                var y =  height/2;
                break;
            case 7:
                var x = (width/3)-45;
                var y =  height/3.5;
                break;
            case 8:
                var x = (width/2);
                var y =  height/3.5;
                break;
            case 9: 
                var x = (width-550);
                var y =  height/3.5;
                break;    
        }
        super(scene, x, y, enemyType+'_idle')
        //console.log(x+" "+y)
        scene.add.existing(this).setScale(scale);

        //Make sure sprite object key has "_idle" at the end of it
        //This is if enemy has animation for it 
        //this.play(enemyType+'_idle');


    }

    destroyEnemy() {
        this.destroy();
    }
}
