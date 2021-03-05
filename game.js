var gamePattern=[];
var userClickedPattern = [];

var buttonColors=["red", "blue", "green", "yellow"];

var level=0;
var started=false;

  $(document).keydown(function(){
    if(!started){
      $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
    }
  });

  //play sound when btn clicked
  $(".btn").click(function(){

    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
  });


  function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
     if(gamePattern.length===userClickedPattern.length){
       setTimeout(function(){
      nextSequence();
    },1000);
     }
   }
   else{
     //console.log("wrong");
     playSound("wrong");
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press Any Key to Restart");

     setTimeout(function(){
       $("body").removeClass("game-over")
     },200);

     startOver();
     }
    }



function nextSequence(){

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour;
  randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
},100);
}
//animatePress("red");

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
