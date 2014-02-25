
WORDS = ["AND","AWAY","BLUE","BIG","CAN","COME","DOWN","FIND","FOR","FUNNY","GO","HELP"]


  var Game = {
    score: 0,
    current_correct: "",
    words: ["AND","AWAY","BLUE","BIG","CAN","COME","DOWN","FIND","FOR","FUNNY","GO","HELP","GOES","HOME","PLAY","RED","ONE","TWO","THREE","SEE","THE"]
  }
$(document).ready(function(){
  $("body").on("click","button#play-again",go_to_home)
  console.log("ready")
  new_words();
  function correct_click(){
    $("#words").on("click","button",add_corret_event)
  }
  function add_corret_event(){
    console.log("this",this);
    if ($(this).hasClass("correct")){
      var correct = new SpeechSynthesisUtterance("Good Job");
      window.speechSynthesis.speak(correct)
      $(this).removeClass("correct")
      console.log("correct")
      $(this).addClass("ui-btn-a");
         $(this).buttonMarkup({theme:"c"});
      Game.score +=1;
      update_stars();
      $("#words").off("click",add_corret_event)
      $("body").off("click", "#repeat", repeat_correct)

    } else {
      //       var incorrect = new SpeechSynthesisUtterance("Sorry, try again");
      // window.speechSynthesis.speak(incorrect)
      // console.log("oops, incorrect")
    }
    console.log("data",$(this).attr("data-word"));
    }
  correct_click();
  $("body").on("click","#repeat", repeat_correct)
  $("body").on("click","#next", function(e){
    console.log("e",e);
    console.log("this",this);
    new_words();
    correct_click();
  })
})
function repeat_correct(){
    console.log("this",this);
    var correct_word = Game.current_correct;
    speak_correct(correct_word)
  }
function new_words(){
  $("button").buttonMarkup({theme:"a"})
  $("button").removeClass("ui-btn-a")
  var current_list = Game.words.slice(0);
  for( var i=1; i<5;i++){
    var word = current_list.splice(Math.floor(Math.random()*current_list.length),1)
      console.log(i,word)
    $("#words button:nth-child("+i+")").text(word).attr("data-word",word);
  }
  var position_of_correct = Math.floor(Math.random()*4+1);
  var correct_word = $("#words button:nth-child("+position_of_correct+")").attr("data-word");
  Game.current_correct = correct_word;
  $("#words button:nth-child("+position_of_correct+")").addClass("correct");
  $("button data-attr")
  console.log("new_words",correct_word)
  speak_correct(correct_word);
  $("body").on("click","#repeat", repeat_correct)
}

function speak_correct(correct_word){
  var word = new SpeechSynthesisUtterance(correct_word)
  window.speechSynthesis.speak(word);
  console.log("correct",correct_word)
}

function congratulate(message){
  var msg = new SpeechSynthesisUtterance(message);
  window.speechSynthesis.speak(msg);
}
function go_to_home(){
  window.location.href="#one";
  console.log("what")
  window.location.reload();
}
function update_stars(){
  var number_of_stars = Game.score;
  $("#stars span:nth-child("+number_of_stars+")").html("&#9733")
  Game.words.splice(Game.words.indexOf(Game.current_correct),1)
  if(Game.score === 5){
    congratulate("you did it")
    congratulate("do you want to play again")
   window.location.href="#two"
    // location.reload();
  }
  console.log(number_of_stars)
}