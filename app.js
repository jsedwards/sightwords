$(document).ready(function(){
  $("body").on("click","button#play-again",Game.go_to_home)
  Game.new_words();
  Game.correct_click();
  $("body").on("click","#repeat", Game.repeat_correct)
  $("body").on("click","#next", function(e){
    Game.new_words();
    Game.correct_click();
  })
})

var Game = {
    score: 0,
    current_correct: "",
    words: ["AND","AWAY","BLUE","BIG","CAN","COME","DOWN","FIND","FOR","FUNNY","GO","HELP","GOES","HOME","PLAY","RED","ONE","TWO","THREE","SEE","THE"],
  
    correct_click: function(){
      $("#words").on("click","button",this.add_correct_event);
    },

    add_correct_event: function(){
      if ($(this).hasClass("correct")){
        var correct = new SpeechSynthesisUtterance("Good Job");
        var voices = window.speechSynthesis.getVoices();
        window.speechSynthesis.speak(correct);
        $(this).removeClass("correct");
        $(this).addClass("ui-btn-a");
        $(this).buttonMarkup({theme:"c"});
        Game.score +=1;
        Game.update_stars();
        $("#words").off("click",this.add_correct_event);
        $("body").off("click", "#repeat", this.repeat_correct);
      } 
    },
    
    repeat_correct: function(){
      var correct_word = Game.current_correct;
      Game.speak_correct(correct_word);
    },

    prep_buttons_for_new_words: function(){
      $("button").buttonMarkup({theme:"a"});
      $("button").removeClass("ui-btn-a");
    },

    randomly_select_correct_word: function(){
      var position_of_correct = Math.floor(Math.random()*4+1);
      this.correct_word = $("#words button:nth-child("+position_of_correct+")").attr("data-word");
      this.current_correct = this.correct_word;
      $("#words button:nth-child("+position_of_correct+")").addClass("correct");
    },

    new_words: function(){
      this.prep_buttons_for_new_words();
      var current_list = Game.words.slice(0);
      for( var i=1; i<5;i++){
      var word = current_list.splice(Math.floor(Math.random()*current_list.length),1);
      $("#words button:nth-child("+i+")").text(word).attr("data-word",word);
      }
      this.randomly_select_correct_word();
      this.speak_correct(this.correct_word);
      $("body").on("click","#repeat", this.repeat_correct);
      },

      speak_correct: function(correct_word){
        var word = new SpeechSynthesisUtterance(correct_word);
        window.speechSynthesis.speak(word);
      },

      congratulate: function(message){
        var msg = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(msg);
      },

      go_to_home: function(){
        window.location.href="#one";
        window.location.reload();
      },

      update_stars: function(){
        var number_of_stars = Game.score;
        $("#stars span:nth-child("+number_of_stars+")").html("&#9733");
        Game.words.splice(Game.words.indexOf(Game.current_correct),1);
        this.check_if_five_stars();
       }, 

       check_if_five_stars: function(){
        if(Game.score === 5){
          this.congratulate("you did it");
          this.congratulate("do you want to play again");
          window.location.href="#two";
          Game.score = 0;
        }
      }
}