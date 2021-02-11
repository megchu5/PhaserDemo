demo.state1 = function(){}; 

var cursors, vel = 500, rocks, grass;

demo.state1.prototype = {
    preload: function(){
        game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON); //first arg is the key, second arg is the path, third arg is null, fourth arg changes the default from CSV to JSON
        
        //loading the tile images and the sprite
        game.load.image('grassTiles', 'assets/tilemaps/grassTiles.png'); // first arg is the key, second is the path
        game.load.image('rockTiles', 'assets/tilemaps/rockTiles.png');
        game.load.image('girl', 'assets/sprites/girl.png');
    },
    
    create: function(){
        game.stage.backgroundColor = "#FFB66C"
        addChangeStateEventListeners();
        
        var map = game.add.tilemap('field'); // create the tile map 
        
        //adding tile set images
        map.addTilesetImage('grassTiles');
        map.addTilesetImage('rockTiles');
        
        // creating layers for the tilemap
        // layers are also drawn in the order they are defined, so define grass first
        var grass = map.createLayer('grass'); 
        var rocks = map.createLayer('rocks');
        
        //setting collisions between the sprite and the rock
        map.setCollisionBetween(3,11, true, 'rocks'); // looking at the JSON file shows that the rock tiles range from indices 3-11, third arg is a boolean that says whether or not collisions are enabled, fourth arg is the layer that has the collisions
        map.setCollision(2, true, 'grass');
        
        girl = game.add.sprite(200,200,'girl'); // position the sprite
        girl.scale.setTo(0.2,0.2); // scaling the sprite
        game.physics.enable(girl); // enabling physics on the girl
        
        cursors = game.input.keyboard.createCursorKeys(); // functionality of keyboard to control the sprite
        
    },
    update: function(){
        game.physics.arcade.collide(girl, rocks, function(){ console.log('hitting rocks'); }); // 
        game.physics.arcade.collide(girl, grass, function(){ console.log('hitting grass'); }); // 
        
        if(cursors.up.isDown) {
            girl.body.velocity.y = -vel;
        }
        else if(cursors.down.isDown) {
            girl.body.velocity.y = vel;
        }
        else {
            girl.body.velocity.y = 0;
        }
        if(cursors.left.isDown) {
            girl.body.velocity.x = -vel;
        }
        else if(cursors.right.isDown) {
            girl.body.velocity.x = vel;
        }
        else {
            girl.body.velocity.x = 0;
        }

    }
};