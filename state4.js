demo.state4 = function(){};
demo.state4.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#6CFFB6'
        console.log('state4')
        addChangeStateEventListeners();
    },
    update: function(){}
};