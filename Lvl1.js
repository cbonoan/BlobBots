var config = {
    type: Phaser.AUTO,
    width: 2000,
    height: 2300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var enemy;
var check_enemy = [false, false, false, false, false, false, false, false, false];
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
	this.load.image('level', 'assets/leveldesign/Base.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(0, 0, 'level').setOrigin(0).setScale(1);
	
    //enemy = this.physics.add.staticGroup();
	 //coordinates of platform 1 620, 180
	 //setup enemies
	 enemy1 = this.add.sprite(620, 180, 'star').setScale(2);
	 enemy1.visible = false;
	 enemy2 = this.add.sprite(1020, 180, 'star').setScale(2);
	 enemy2.visible = false;
	 enemy3 = this.add.sprite(1420, 180, 'star').setScale(2);
	 enemy3.visible = false;
	 enemy4 = this.add.sprite(620, 410, 'star').setScale(2);
	 enemy4.visible = false;
	 enemy5 = this.add.sprite(1020, 410, 'star').setScale(2);
	 enemy5.visible = false;
	 enemy6 = this.add.sprite(1420, 410, 'star').setScale(2);
	 enemy6.visible = false;
	 enemy7 = this.add.sprite(620, 630, 'star').setScale(2);
	 enemy7.visible = false;
	 enemy8 = this.add.sprite(1020, 630, 'star').setScale(2);
	 enemy8.visible = false;
	 enemy9 = this.add.sprite(1420, 630, 'star').setScale(2);
	 enemy9.visible = false;

	 cursors = this.input.keyboard.createCursorKeys();
	 //this.input.keyboard.on('keydown_W', this.yourFunction, this);
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
   

   
}
//measures time elapsed in ms
var startime = Math.floor(performance.now()/1000);
var checker = true;
var ostartime;
function update ()
{
	var keyObj1 = this.input.keyboard.addKey('NUMPAD_SEVEN');
	var keyObj2 = this.input.keyboard.addKey('NUMPAD_EIGHT');
	var keyObj3 = this.input.keyboard.addKey('NUMPAD_NINE');
	var keyObj4 = this.input.keyboard.addKey('NUMPAD_FOUR');
	var keyObj5 = this.input.keyboard.addKey('NUMPAD_FIVE');
	var keyObj6 = this.input.keyboard.addKey('NUMPAD_SIX');
	var keyObj7 = this.input.keyboard.addKey('NUMPAD_ONE');
	var keyObj8 = this.input.keyboard.addKey('NUMPAD_TWO');
	var keyObj9 = this.input.keyboard.addKey('NUMPAD_THREE');
	//console.log(Math.floor((Math.random() * 9) + 1));
	//check if 5 seconds have passed if so then spawn a monster! (update startime in here to current time if u get in here)
    if(startime + 5 == Math.floor(performance.now()/1000) && checker)
	{
		//pick a tile first 
		let tile = Math.floor((Math.random() * 9) + 1);
		//console.log(tile);
		//check to see if theres something there if there is then reroll
		while(check_enemy[tile - 1])
		{
			tile = Math.floor((Math.random() * 9) + 1);
			//console.log(tile);
		}
		console.log(tile);
		//add if statements for different tiles
		if(tile == 1)
		{
			enemy1.visible = true;
			check_enemy[0] = true;
		}
		else if(tile == 2)
		{
			enemy2.visible = true;
			check_enemy[1] = true;			
		}
		else if(tile == 3)
		{
			enemy3.visible = true;
			check_enemy[2] = true;			
		}
		else if(tile == 4)
		{
			enemy4.visible = true;
			check_enemy[3] = true;			
		}
		else if(tile == 5)
		{
			enemy5.visible = true;
			check_enemy[4] = true;			
		}
		else if(tile == 6)
		{
			enemy6.visible = true;
			check_enemy[5] = true;
		}
		else if(tile == 7)
		{
			enemy7.visible = true;
			check_enemy[6] = true;
		}
		else if(tile == 8)
		{
			enemy8.visible = true;
			check_enemy[7] = true;
		}
		else if(tile == 9)
		{
			enemy9.visible = true;
			check_enemy[8] = true;
		}
		checker = false;
		ostartime = startime;
		startime = Math.floor(performance.now()/1000);
	}
	//had to add this to make sure it didnt update like 40 times 
	if(ostartime + 6 == Math.floor(performance.now()/1000))
	{
		checker = true;
	}
	if(keyObj1.isDown)
	 {
		 console.log(1);
		 check_enemy[0] = false;		
		 enemy1.visible = false;
		 
		 
	 }
	  if(keyObj2.isDown && check_enemy[1])
	 {
		 console.log(2);
		 check_enemy[1] = false;		
		 enemy2.visible = false;
		 
	 }
	  if(keyObj3.isDown && check_enemy[2])
	 {
		 console.log(3);
		 check_enemy[2] = false;		
		 enemy3.visible = false;
	 } if(keyObj4.isDown && check_enemy[3])
	 {
		 console.log(4);
		 check_enemy[3] = false;		
		 enemy4.visible = false;
	 } if(keyObj5.isDown && check_enemy[4])
	 {
		 console.log(5);
		 check_enemy[4] = false;		
		 enemy5.visible = false;
	 } if(keyObj6.isDown && check_enemy[5])
	 {
		 console.log(6);
		 check_enemy[5] = false;		
		 enemy6.visible = false;
	 }if(keyObj7.isDown && check_enemy[6])
	 {
		 console.log(7);
		 check_enemy[6] = false;		
		 enemy7.visible = false;
	 } if(keyObj8.isDown && check_enemy[7])
	 {
		 console.log(8);
		 check_enemy[7] = false;		
		 enemy8.visible = false;
	 } if(keyObj9.isDown && check_enemy[8])
	 {
		 console.log(9);
		 check_enemy[8] = false;		
		 enemy9.visible = false;
	 }

   
}



