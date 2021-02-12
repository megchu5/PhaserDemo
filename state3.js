var sound;

demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){
        game.load.image('button1', 'assets/sprites/button1.png');
        game.load.image('button2', 'assets/sprites/button2.png');
        game.load.image('button3', 'assets/sprites/button3.png');
        game.load.audio('ding', 'assets/sounds/ding.mp3');
    },
    create: function(){
        game.stage.backgroundColor = '#B6FF6C'
        addChangeStateEventListeners();
        
        sound = game.add.audio('ding');
        sound.addMarker('dings', 0, 3);
        
        var b1 = game.add.button(100,100, 'button1', function() {
            changeState(null,1);
        });
        
        var b2 = game.add.button(400,400, 'button2', function() {
            changeState(null,2);
        });
        
        var b3 = game.add.button(700,700, 'button3', function() {
            changeState(null,3);
        });
        
        b3.onInputDown.add(this.tint, b3);
        b2.onInputDown.add(this.tint, b2);
        b1.onInputDown.add(this.tint, b1);
        
        b3.onInputUp.add(this.untint, b3);
        b2.onInputUp.add(this.untint, b2);
        b1.onInputUp.add(this.untint, b1);
        
    },
    tint: function(){
        this.tint = 0xbbbbbb;
        sound.play('dings');
        console.log('play ding');
    },
    
    untint: function() {
        this.tint = 0xFFFFFF;
        sound.play('ding');
    }
};