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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        //pre-loading the zombies
		game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
    }
    
   
	var mummies;
    
    function create() {
        
		//creating mummies
		mummies = game.add.group();
		
		//Creating 10 mummies, each initially dead
		mummies.createMultiple(20,"mummy",0,false);
		
		
		
		//bringing mummies to life!
		game.time.events.repeat(Phaser.Timer.SECOND, 20, resurrect, this);
 
        
      
		game.physics.enable(mummies,Phaser.Physics.ARCADE);
		
        // Make it bounce off of the world bounds.
    
		mummies.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something awesome.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
	
	
	function resurrect() {

		//  Get a dead item
		var item = mummies.getFirstDead();

		if (item)
		{
			//  And bring it back to life
			item.reset(game.world.randomX, game.world.randomY);

			//  This just changes its frame
			item.frame = game.rnd.integerInRange(0, 36);
			
			//getting the mummies to run
			item.animations.add('walk');

			item.animations.play('walk', 30, true);
			
			//and move towards cursor
			item.rotation = game.physics.arcade.accelerateToPointer( item, this.game.input.activePointer, 500, 500, 500 );
		}

	}
    
    
};
