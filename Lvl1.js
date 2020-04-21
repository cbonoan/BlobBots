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
var health = 5;

function preload ()
{
    
    this.load.image('enemy1', 'assets/enemy1.png');
    
	this.load.image('level', 'assets/leveldesign/Base.png');
    
}

function create ()
{
    //  A simple background for our game
    this.add.image(0, 0, 'level').setOrigin(0).setScale(1);
	
    //enemy = this.physics.add.staticGroup();
	 //coordinates of platform 1 620, 180
	 //setup enemies
	 enemy1 = this.add.sprite(600, 120, 'enemy1').setScale(1);
	 enemy1.visible = false;
	 enemy2 = this.add.sprite(1000, 120, 'enemy1').setScale(1);
	 enemy2.visible = false;
	 enemy3 = this.add.sprite(1380, 120, 'enemy1').setScale(1);
	 enemy3.visible = false;
	 enemy4 = this.add.sprite(600, 350, 'enemy1').setScale(1);
	 enemy4.visible = false;
	 enemy5 = this.add.sprite(1000, 350, 'enemy1').setScale(1);
	 enemy5.visible = false;
	 enemy6 = this.add.sprite(1380, 350, 'enemy1').setScale(1);
	 enemy6.visible = false;
	 enemy7 = this.add.sprite(600, 580, 'enemy1').setScale(1);
	 enemy7.visible = false;
	 enemy8 = this.add.sprite(1000, 580, 'enemy1').setScale(1);
	 enemy8.visible = false;
	 enemy9 = this.add.sprite(1380, 580, 'enemy1').setScale(1);
	 enemy9.visible = false;

	 cursors = this.input.keyboard.createCursorKeys();
	 //this.input.keyboard.on('keydown_W', this.yourFunction, this);
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
   

   
}
//measures time elapsed in ms
var startime = Math.floor(performance.now()/1000);
var checker = true;
//invincibility frame tracker (so that the user doesnt instantly kill themselves due to pressing a button too much)
var healthfreetime = true;
var ostartime;
//with the way phaser.io works with update it checks update approx >50 times per second so we must give the user some invincibility frames 
var hstartime = startime;
//for now if enemy is alive for more then 3 seconds you take dmg then the enemy disappears
var time_dmg = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//score/money tracker, lvl 1 mobs will all give 10 score/money
var score = 0;
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
	if(health > 0)
	{
	//MONSTER GENERATION	
    if(startime + 5 == Math.floor(performance.now()/1000) && checker && !(check_enemy[0] && check_enemy[1] && check_enemy[2] && check_enemy[3] && check_enemy[4] && check_enemy[5] && check_enemy[6] && check_enemy[7] && check_enemy[8]))
	{
		//pick a tile first 
		let tile = Math.floor((Math.random() * 9) + 1);
		let tile2 = Math.floor((Math.random() * 9) + 1);
		//console.log(tile);
		//check to see if theres something there if there is then pick a different tile
		while(check_enemy[tile - 1] && tile != tile2 && check_enemy[tile2 - 1])
		{
			tile = Math.floor((Math.random() * 9) + 1);
			tile2 = Math.floor((Math.random() * 9) + 1);
			//console.log(tile);
		}
		console.log(tile);
		console.log(tile2);
		//add if statements for different tiles(the above while statement guarantees that two tiles won't be equal)
		if(tile == 1 || tile2 == 1)
		{
			enemy1.visible = true;
			check_enemy[0] = true;
			time_dmg[0] = Math.floor(performance.now()/1000);
			console.log("hi");
		}
		 if(tile == 2 || tile2 == 2)
		{
			enemy2.visible = true;
			check_enemy[1] = true;		
			time_dmg[1] = Math.floor(performance.now()/1000);
		}
		if(tile == 3 || tile2 == 3)
		{
			enemy3.visible = true;
			check_enemy[2] = true;
			time_dmg[2] = Math.floor(performance.now()/1000);
		}
		if(tile == 4 || tile2 == 4)
		{
			enemy4.visible = true;
			check_enemy[3] = true;
			time_dmg[3] = Math.floor(performance.now()/1000);
		}
	    if(tile == 5 || tile2 == 5)
		{
			enemy5.visible = true;
			check_enemy[4] = true;	
			time_dmg[4] = Math.floor(performance.now()/1000);
		}
		 if(tile == 6 || tile2 == 6)
		{
			enemy6.visible = true;
			check_enemy[5] = true;
			time_dmg[5] = Math.floor(performance.now()/1000);
		}
		 if(tile == 7 || tile2 == 7)
		{
			enemy7.visible = true;
			check_enemy[6] = true;
			time_dmg[6] = Math.floor(performance.now()/1000);
		}
		 if(tile == 8 || tile2 == 8)
		{
			enemy8.visible = true;
			check_enemy[7] = true;
			time_dmg[7] = Math.floor(performance.now()/1000);
		}
		 if(tile == 9 || tile2 == 9)
		{
			enemy9.visible = true;
			check_enemy[8] = true;
			time_dmg[8] = Math.floor(performance.now()/1000);
			console.log("tile9");
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
	if(hstartime + 2 <= Math.floor(performance.now()/1000))
	{
		healthfreetime = true;
		
	}
	//USER INPUTTING
	if(keyObj1.isDown && check_enemy[0])
	 {
		 time_dmg[0] = 0;
		 check_enemy[0] = false;		
		 enemy1.visible = false;
		 healthfreetime = false;
		 //original did - 1 for invincibility time for getting the right press but if the user held the key even slightly then it would deduct a health so changed to .5 to give slightly more time
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
		 
	 }
	 else if(keyObj1.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);		 
	 }
	  if(keyObj2.isDown && check_enemy[1])
	 {
		 time_dmg[1] = 0;
		 check_enemy[1] = false;		
		 enemy2.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
		 
	 }
	 else if(keyObj2.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	  if(keyObj3.isDown && check_enemy[2])
	 {
		 time_dmg[2] = 0;
		 check_enemy[2] = false;		
		 enemy3.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
	 }
		else if(keyObj3.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	 if(keyObj4.isDown && check_enemy[3])
	 {
		 time_dmg[3] = 0;
		 check_enemy[3] = false;		
		 enemy4.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
	 } 
	 else if(keyObj4.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	 if(keyObj5.isDown && check_enemy[4])
	 {
		 time_dmg[4] = 0;
		 check_enemy[4] = false;		
		 enemy5.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
	 }
	else if(keyObj5.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	 if(keyObj6.isDown && check_enemy[5])
	 {
		 time_dmg[5] = 0;
		 check_enemy[5] = false;		
		 enemy6.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
	 }
	 else if(keyObj6.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	 if(keyObj7.isDown && check_enemy[6])
	 {
		 time_dmg[6] = 0;
		 check_enemy[6] = false;		
		 enemy7.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
	 }
	else if(keyObj7.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	 if(keyObj8.isDown && check_enemy[7])
	 {
		 time_dmg[7] = 0;
		 check_enemy[7] = false;		
		 enemy8.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
	 } 
	 else if(keyObj8.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	 if(keyObj9.isDown && check_enemy[8])
	 {
		 time_dmg[8] = 0;
		 check_enemy[8] = false;		
		 enemy9.visible = false;
		 healthfreetime = false;
		 hstartime = Math.floor(performance.now()/1000) - .5;
		 score = score + 10;
		 document.getElementById('score').innerHTML = score;
	 }
	 else if(keyObj9.isDown && healthfreetime)
	 {
		 health--;
		 document.getElementById('health').innerHTML = health;
		 healthfreetime = false;		
		 hstartime = Math.floor(performance.now()/1000);
		 
	 }
	 //MONSTER DETECTION(if a monster is up for too long u take dmg and monster leaves)
	 //no invincibility frames for this part if u miss an enemy
	 if(((time_dmg[0] + 3) < Math.floor(performance.now()/1000)) && time_dmg[0] != 0)
	 {
		 check_enemy[0] = false;
		 enemy1.visible = false;
		 time_dmg[0] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 //missing multiple enemies will dmg you for each one you miss (might change this later based on balanced decisions of play through tests)
	  if(((time_dmg[1] + 3) < Math.floor(performance.now()/1000)) && time_dmg[1] != 0)
	 {
		 check_enemy[1] = false;
		 enemy2.visible = false;
		 time_dmg[1] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 if(((time_dmg[2] + 3) < Math.floor(performance.now()/1000)) && time_dmg[2] != 0)
	 {
		 check_enemy[2] = false;
		 enemy3.visible = false;
		 time_dmg[2] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 if(((time_dmg[3] + 3) < Math.floor(performance.now()/1000)) && time_dmg[3] != 0)
	 {
		 check_enemy[3] = false;
		 enemy4.visible = false;
		 time_dmg[3] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 if(((time_dmg[4] + 3) < Math.floor(performance.now()/1000)) && time_dmg[4] != 0)
	 {
		 check_enemy[4] = false;
		 enemy5.visible = false;
		 time_dmg[4] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 if(((time_dmg[5] + 3) < Math.floor(performance.now()/1000)) && time_dmg[5] != 0)
	 {
		 check_enemy[5] = false;
		 enemy6.visible = false;
		 time_dmg[5] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 if(((time_dmg[6] + 3) < Math.floor(performance.now()/1000)) && time_dmg[6] != 0)
	 {
		 check_enemy[6] = false;
		 enemy7.visible = false;
		 time_dmg[6] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 if(((time_dmg[7] + 3) < Math.floor(performance.now()/1000)) && time_dmg[7] != 0)
	 {
		 check_enemy[7] = false;
		 enemy8.visible = false;
		 time_dmg[7] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	  if(((time_dmg[8] + 3) < Math.floor(performance.now()/1000)) && time_dmg[8] != 0)
	 {
		 check_enemy[8] = false;
		 enemy9.visible = false;
		 time_dmg[8] = 0;
		 health--;
		 document.getElementById('health').innerHTML = health;		 
	 }
	 
	}
	else{
		window.location.href = "index.html";
	}
	

   
}



