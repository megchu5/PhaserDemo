demo.state9 = function(){};
demo.state9.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#FF6C8A'
        console.log('state9');
        addChangeStateEventListeners();
    },
    update: function(){}
};