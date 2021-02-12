var text;

demo.state8 = function(){};
demo.state8.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#E16CFF'
        addChangeStateEventListeners();
        
        text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur illum eos iusto! Sint incidunt temporibus, repellendus, reiciendis voluptates voluptatem. Quaerat consequuntur vero, ipsum aut quam adipisci incidunt debitis, assumenda fugiat. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione pariatur esse assumenda odit, voluptatem. Eius quam magni molestiae corrupti debitis quasi rerum dolores earum quis, perspiciatis suscipit soluta et ab.'
        
        this.spellOutText(100, 100, 1000, text, 30, 40, '#fff');
    },
    spellOutText: function(x, y, width, text, fontSize, speed, fill, font){
        var sentence = game.add.text(x,y, '', {fontSize: fontSize +'px', fill:fill, font: font});
        var currentLine = game.add.text(10, 10, '', {fontSize: fontSize +'px', font: font}); // tracks whne we need to add another line to the text
        currentLine.alpha = 0; // sets the opacity
        var loop = game.time.events.loop(speed, addChar);
        
        var index = 0;
        
        function addChar() {
            sentence.text += text[index];
            currentLine.text += text[index];
            
            if (currentLine.width > width && text[index] == ' ') { //only goes down to a new line if the character is a space
                sentence.text += '\n' //go to another line
                currentLine.text = ''
            }
            
            if (index >= text.length -1) { // gets rid of undefined error
                game.time.events.remove(loop);
                console.log('stop');
            }
            index++;
        }
    }
};