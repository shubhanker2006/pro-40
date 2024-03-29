class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            if(index === player.index){
                FileList("black")
                textSixe(25)
                text(allPlayers[plr].name.x-25,y+25);
            }

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            textSize(25)
            text("Player 1:" +allPlayers.player1.score,50,50)
            text("Player 2:" +allPlayers.player2.score,50,100)


        }
        if(KeyIsDown(39)&& player.index!==null){
            player.distance-=18
            player.update();
        }
        if(KeyIsDown(37)&& player.index !== null){
            player.distance+=10
            player.update();
        }
        if(frameCount% 20===0){
            fruits=createSprite(100,1000,0,100,100)
            fruits.velocityY=7
            var random=Math.round(random1,5);
            switch(random){
                case 1:fruits.addImage("fruits",friut_img);
                break;
                case 2: fruits.addImage("fruit1",fruit2_img);
                break;
                case 3: fruits.addImage("fruit1",fruit3_img);
                break;
                case 4: fruits.addImage("fruit1",fruit4_img);
                break;
                case 5: fruits.addImage("fruit1",fruit5_img);
                break;

            }
            fruitGroup.add(fruits);
        }
        if(player.index !==null){
            for(var i=0; i<fruitGroup.length;i++){
                if(fruitGroup.get(i).isTouching(players)){
                    fruitGroup.get(i).destroy();
                    player.score=player.score+1;
                    player.update();
                }
            }
        
        }


        // Give movements for the players using arrow keys


        // Create and spawn fruits randomly

        
    }
   

    end(){
       console.log("Game Ended");
    }
}