var accel = 400, platform, platformGroup;

demo.state5 = function(){};
demo.state5.prototype = {
    preload: function(){
        game.load.image('platform', 'assets/sprites/platform.png');
    },
    create: function(){
        game.stage.backgroundColor = '#FFFF6C'
        addChangeStateEventListeners();
        
        girl = game.add.sprite(centerX, 500, 'girl');
        platform = game.add.sprite(0, 800, 'platform');
        platformGroup = game.add.group();
        platformGroup.create(650, 400, 'platform');
        platformGroup.create(1300, 400,'platform');
        
        game.physics.enable([girl,platform, platformGroup]);
        
        girl.body.gravity.y = 500; //vertical gravity
        girl.body.bounce.y = 0.3; // allows girl to bounce
        girl.body.drag.x = 400; // allows girl to slow down
        girl.body.collideWorldBounds = true; // collides with bounds of game
        
        platform.body.immovable = true;
        platformGroup.setAll('body.immovable', true);

    },
    update: function(){
        game.physics.arcade.collide(girl, [platform, platformGroup]);
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            girl.body.acceleration.x = -accel; // accelerates to the left
           }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            girl.body.acceleration.x = accel; // accelerates to the right
        }
        else {
            girl.body.acceleration.x = 0; // if no keypress, does not accelerate
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            girl.body.velocity.y = -300; // accelerates to the left
           }
    }
};