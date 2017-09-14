"use strict";

// $(function () {
    var score = 0;
    var questionCount = 0;
    var questionTime = 21;
    var intervalId;


    var questions = [{
            prompt: "Who built the Wall?",
            choices: ["Ned Stark", "Brandon Stark", "Aegon the IV", "Tormund Giantsbane"],
            answer: 1,
        },
        {
            prompt: "Where is the Citadel located?",
            choices: ["Kings Landing", "Harrenhall", "Oldtown", "Winterfell"],
            answer: 2
        },
        {
            prompt: "Who is not one of the Seven Gods of Westeros?",
            choices: ["The Drowned God", "The Mother", "The Stranger", "The Warrior"],
            answer: 0
        }

    ];

    function displayQuestion() {
        if(questionCount < questions.length) {
            $("#prompt").html(questions[questionCount].prompt);
            $("#selection_1").html(questions[questionCount].choices[0]);
            $("#selection_2").html(questions[questionCount].choices[1]);
            $("#selection_3").html(questions[questionCount].choices[2]);
            $("#selection_4").html(questions[questionCount].choices[3]);
        }
        else {
            displayEnd();
        }
    }
    function startTimer(){
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        questionTime--;
        $("#show-time").html(questionTime);
        if(questionTime === 0) {
            stop();
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    function displayEnd() {

    }

    $("#start").on("click", function () {
        $("#start").hide();
        startTimer();
        
        displayQuestion();
    });

    $(".selection").on("click", function(){
        //using weak comparison on purpose
        if(($(this).attr("data-answer-number")) == questions[questionCount].answer ){
            console.log("right anser");
            score++;
            questionCount++;
            displayQuestion();
            questionTime = 21;
            
        } 
    });
// });