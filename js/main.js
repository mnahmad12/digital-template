window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
	
	var P2Game = {};
	
	P2Game.StateA = function (game) {

		this.message;
		this.cursors;
		this.logo;

	};
	
	P2Game.StateA.prototype = 
	{
		
		
		 gotoStateB: function () 
		{

			this.state.start('StateB');

		},
		
		update: function()
		{
			this.game.stage.backgroundColor = '#806000';
			this.cursors = this.input.keyboard.createCursorKeys();
			if (this.cursors.left.isDown)
			{
				this.gotoStateB();
			}
		}
	
	}
	
	
	P2Game.StateC = function (game) {

		this.message;
		this.cursors;
		this.logo;
		this.text;
		this.style;

	};
	
	P2Game.StateC.prototype = 
	{
		
		
		 gotoStateA: function () 
		{

			this.state.start('StateA');

		},
		
		update: function()
		{
			this.game.stage.backgroundColor = '#806000';
			this.cursors = this.input.keyboard.createCursorKeys();
			
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "You Lose! Want to Play Again? Press The Left Arrow!", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
			
			if (this.cursors.left.isDown)
			{
				this.gotoStateA();
			}
		}
	
	}
    
	
	P2Game.StateB = function(game)
		{
			this.mummies;
			this.bob;
			this.keys;
			this.text;
			this.style;
		}
	
	P2Game.StateB.prototype=
	{
		preload: function() 
		{
        //pre-loading the zombies
			this.load.spritesheet('bob', 'assets/phaser-dude.png', 28, 28, 18);
			this.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 15);
			this.game.stage.backgroundColor = '#000000';
		},
    

	
		create: function() 
		{
			
			
		//starting physics:
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//creating mummies
			this.mummies = this.add.group();
		//and bob
			this.bob = this.add.sprite(300,100,'bob');
		
		
		
		//Creating 10 mummies, each initially dead
			this.mummies.createMultiple(20,"mummy",0,false);
		
		
			this.game.physics.enable(this.mummies,Phaser.Physics.ARCADE);
			this.game.physics.enable(this.bob,Phaser.Physics.ARCADE);
		
		//bringing mummies to life!
			
			this.game.time.events.repeat(Phaser.Timer.SECOND, 20, this.resurrect,this );
 
        
      
			
	
		
		},
	
	
	
		resurrect: function()
		{
			
		 //Get a dead item
			var item = this.mummies.getFirstDead();

			if (item)
			{
			 //And bring it back to life
				item.reset((this.world.randomX + (this.bob.x)), (this.world.randomY+(this.bob.y)));

			 //This just changes its frame
				item.frame = this.rnd.integerInRange(0, 36);
			
			//getting the mummies to run
				item.animations.add('walk');

				item.animations.play('walk', 30, true);
			
			//and move towards cursor
				item.rotation = this.physics.arcade.moveToObject( item,this.bob, 100 );
			}

		},
	
		update: function()
		{
			//window.alert("here?");
		
		// Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
			this.style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
			this.text = this.add.text( this.world.centerX, 15, "Don't Let the Mummies Get You!.", this.style );
			this.text.anchor.setTo( 0.5, 0.0 );
		
		
			this.keys = this.input.keyboard.createCursorKeys();
		
			if(this.bob.exists)
			{
				
				this.bob.body.velocity.x=0;
				this.bob.body.velocity.y=0;
				
				if (this.keys.left.isDown)
				{
					this.bob.body.velocity.x=-200;	
				}
			
				if (this.keys.right.isDown)
				{
					this.bob.body.velocity.x=200;	
				}
			
				if (this.keys.up.isDown)
				{	
					this.bob.body.velocity.y=-200;	
				}
			
				if (this.keys.down.isDown)
				{	
					this.bob.body.velocity.y=200;
				}
		
				if(this.physics.arcade.collide(this.mummies,this.bob))
				{
					this.bob.kill();
					this.bob.exists=false;	
					this.goToStateC();
				}
			
			}
				
			
		
		},
		
		goToStateC: function () 
		{

			this.state.start('StateC');

		}
	}
	var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
	game.state.add('StateA', P2Game.StateA);
	game.state.add('StateB', P2Game.StateB);
	game.state.add('StateC', P2Game.StateC);

	game.state.start('StateA');
    
    
 };
