demo.state3 = function(){};
demo.state3.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#B6FF6C'
        console.log('state3');
        addChangeStateEventListeners();
    },
    update: function(){}
};