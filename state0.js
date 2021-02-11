var demo = {}, centerX = 1500/2, centerY = 1000/2, girl, speed = 6; // since we will use the center of our game a lot of the time, we can just define                                                                           those as variables to begin with --> also must declare the sprite variable as global
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        // Loading the assets
        /* when loading, remember to edit the picture so that the excess invisible space is cropped out */
        game.load.spritesheet('girl', 'assets/spritesheets/girlSheet.png', 320, 320); // first arg is the key for image, second arg is path for image,                                                                                      third/fourth arg is the height and width of the sprite
        game.load.image('sunset', 'assets/backgrounds/sunset.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE); // initialize the physics engine for the game
        game.stage.backgroundColor = '#FF6C6C' // sets the background color of the state
        
        /* anything created in the demo object is a LOCAL variable. Therefore, instead of listing commands to change for every other state in each state, we can make a function outside of the demo which is global so 
        that we can just call the function in each state instead of repeating a bunch of code. */
        
        addChangeStateEventListeners(); // function call that allows changing of state
        game.world.setBounds(0,0, 2000, 1000) // sets the bounds of the game (usually make it the height and width of the background)
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL // changes to the SHOW_ALL scale mode so that the game will scale depending on the size of the screen
        
        // images are drawn on top of each other in the order in which they are defined. Therefore, we should define the background first, and then define the sprite.
        var sunset = game.add.sprite(0,0, 'sunset'); // adding in the background
        
        // origin of the game (0,0) is in the top left corner
        girl = game.add.sprite(centerX, centerY,'girl'); // places the sprite in the center width and center height of the game world
        girl.anchor.setTo(0.5,0.5); // allows the sprite to be drawn from the center
        girl.scale.setTo(0.8,0.8); // changes the scale of the sprite 
        
        game.physics.enable(girl); // add physics to a specified image (girl)
        girl.body.collideWorldBounds = true; // make the girl image collide with the bounds of the world
    
        // Animating the sprite
        girl.animations.add('walk', [0,1,2,3,4]) //first arg defines the key for the animation, second arg is the frames
        //setting camera movement
        game.camera.follow(girl);
        game.camera.deadzone = new Phaser.Rectangle(centerX-300, 0, 600, 1000); //setting the rectangle area in which the camera will not follow the girl.                                                                           But if the girl goes outside this rectangle, then follow. 
        /*Args for the deadzone
        Let's make the rectangle 600px wide.
        First and second args: origin of where the rectangle is drawn,
        Third arg: width of the rectangle
        Fourth arg: height of the rectangle */

    },
    update: function(){
        
        //horizontal movement
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { // if the right arrow is pressed, add to the sprites x-position
            //changing scale of image
            girl.scale.setTo(0.8,0.8); //changing scale of image as to flip the image when going a different direction
            girl.x += speed;
            girl.animations.play('walk', 14, true) //first arg is the key of the animation, second arg is the fps, third arg is whether or not the                                                  movement will be looping
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { // if the left arrow is pressed, subtract from the sprites x-position
            girl.scale.setTo(-0.8,0.8); //changing scale of image as to flip the image when going a different direction
            girl.x -= speed;
            girl.animations.play('walk', 14, true) 
        }     
        else {
            girl.animations.stop('walk'); //stops the girl from animating when the character is not walking
            girl.frame = 0; // that way, when the girl stops, she will end up looking like she does in the first frame.
        }
        // vertical movement
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) { //if the up arrow is pressed, subtracts from the sprites y-position to move up
            girl.y -= speed;
            if (girl.y < 604) { // 604 is the y position of the girl when she's at the top of the road (girl.y)
                girl.y = 604  // this if statement forces the girl to stay on the road
            }
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) { //if the down arrow is pressed, adds to the sprites y-position to move down
            girl.y += speed;
        }
    }
};

function changeState(i, stateNum) { // changes the state
    console.log('state'+stateNum);// allows us to see that the state has switched states
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners() { // function that allows the state to change on keypress
    addKeyCallback(Phaser.Keyboard.ZERO, changeState,0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState,1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState,2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState,3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState,4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState,5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState,6); 
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState,7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState,8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState,9);

}