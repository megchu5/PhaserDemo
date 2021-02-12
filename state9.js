var hsText = [], hs = [10,9,8,7,6,5,4,3,2,1];

demo.state9 = function(){};
demo.state9.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#FF6C8A'
        addChangeStateEventListeners();
        
        for(var i = 1; i < 11; i++) {
            game.add.text(500,10+(i*90), i + '. ', {fontSize: '40px'}).anchor.setTo(1,0);
        }
        
        for (var i = 0; i < 10; i++) {
            hsText[game.add.text(500,10+((i+1)*90), hs[i], {fontSize: '40px'})]
        }
    },
    update: function(){}
};