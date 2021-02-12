var barrel, bullets, velocity = 1000, nextFire = 0, fireRate = 200, enemy, bullet, enemyGroup;
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        // loading the cannon images
        game.load.image('base', 'assets/sprites/cannonBase.png');
        game.load.image('barrel', 'assets/sprites/cannonBarrel.png');
        game.load.image('bullet', 'assets/sprites/cannonBullet.png');
    },
    create: function(){
        game.stage.backgroundColor = '#6CBBFF'
        addChangeStateEventListeners();
        
        //base
        var base = game.add.sprite(centerX, centerY, 'base');
        base.anchor.setTo(0.5);
        base.scale.setTo(0.9);

        //bullets
        bullets = game.add.group(); // making bullets a group
        bullets.enableBody = true; 
        bullets.physicsBodyType = Phaser.Physics.ARCADE; //setting physics of the bullets
        bullets.createMultiple(50, 'bullet'); // first arg is the number of things being added to the group, second arg is the key
        bullets.setAll('checkWorldBounds','true')
        bullets.setAll('outOfBoundsKill','true')
        bullets.setAll('anchor.y',0.5);
        bullets.setAll('scale.x', 0.85);
        
        //barrel
        barrel = game.add.sprite(centerX, centerY, 'barrel');
        barrel.anchor.setTo(0.1,0.5);
        
        //enemies
        enemy = game.add.sprite(100,200,'girl');
        game.physics.enable(enemy);
        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        for (var i = 0; i <3; i++) {
            enemyGroup.create(1300, 350 * i + 100, 'girl');
        } // makes the enemies
        
        enemyGroup.setAll('anchor.y',0.5);
        enemyGroup.setAll('anchor.x',0.5);
        enemyGroup.setAll('scale.y',0.5);
        enemyGroup.setAll('scale.y',0.5);
    
    },
    update: function(){
        barrel.rotation = game.physics.arcade.angleToPointer(barrel);
        if (game.input.activePointer.isDown) {
            this.fire();
        }
        
        game.physics.arcade.overlap(bullets, enemy, this.hitEnemy); // first two args are the two sprites that will be overlapping, third ard is the function it calls
        game.physics.arcade.overlap(bullets, enemyGroup, this.hitGroup); 
    },
    
    fire: function(){
        if(game.time.now > nextFire) {
            nextFire = game.time.now + fireRate; // only allows bullets to be fired if a certain amount of time has passed
            console.log('firing');
            bullet = bullets.getFirstDead();
            bullet.reset(barrel.x, barrel.y);
        
            game.physics.arcade.moveToPointer(bullet, velocity); // first arg is the sprite we want to move, second is the speed
            bullet.rotation = game.physics.arcade.angleToPointer(bullet); // makes the bullet face the correct orientation
           
           }
    },
    
    hitEnemy: function() {
        console.log('hit');
        enemy.kill();
        bullet.kill();
    },
    
    hitGroup: function(b,e) {
        b.kill();
        e.kill();
    }
        

};