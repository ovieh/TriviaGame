"use strict";

$(function () {
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unanswered = 0;
    var questionCount = 0;
    var questionTime;
    var intervalId;
    var answerStatus;


    var questions = [{
            prompt: "Who built the Wall?",
            choices: ["Ned Stark", "Brandon Stark", "Aegon the IV", "Tormund Giantsbane"],
            answer: 1,
            gifName: "wall"
        },
        {
            prompt: "Where is the Citadel located?",
            choices: ["Kings Landing", "Harrenhall", "Oldtown", "Winterfell"],
            answer: 2,
            gifName: "citadel"
        },
        {
            prompt: "Who is not part of the Faith of the Seven?",
            choices: ["The Drowned God", "The Mother", "The Stranger", "The Warrior"],
            answer: 0,
            gifName: "drownedgod"
        },
        {
            prompt: "What is the name of Jon Snow's Direwolf?",
            choices: ["Shaggydog", "Grey Wolf", "Shadow", "Ghost"],
            answer: 3,
            gifName: "ghost"
        },
        {
            prompt: "What is the house sword of Hourse Mormont?",
            choices: ["Longclaw", "Ice", "Widowsbane", "Oathkeeper"],
            answer: 0,
            gifName: "longclaw"
        },
        {
            prompt: "Where is the last place Lyanna Stark was seen alive?",
            choices: ["The Red Keep","The Tower of Joy", "The Trident", "West Phildelphia"],
            answer: 1,
            gifName: "joy"
        },
        {
            prompt: "Besides Dragonglass, what is the only other subtance that can kill Wights?",
            choices: ["Valaryian Steel", "Wildfire","Raven's Feather", "Eye of Newt"],
            answer: 0,
            gifName: "sword"
        },
        {
            prompt: "How many times has Beric Dondarrion been resurrected?",
            choices: ["Three", "Once", "Six", "Five"],
            answer: 2,
            gifName: "beric"   
        },
        {
            prompt: "The name of Tommen's pet cat?",
            choices: ["Mittens", "Spot", "Captain Fuzzy", "Ser Pounce"],
            answer: 3,
            gifName: "pounce"
        },
        {
            prompt: "What is not one of Dany's titles?",
            choices: ["Queen of the Andals", "Mother of Dragons", "Keeper of The Real", "Breaker of Chains?"],
            answer: 2, 
            gifName: "titles"
        }
    ];

    $("#restart").hide();
    $("#show-time").hide();

    function displayQuestion() {
        questionTime = 20;
        $("#show-time").html(questionTime);
        
        if (questionCount < questions.length) {
            $("#answer-screen").hide();
            $("#show-time").show();
            
            $(".selection").show();
            $("#prompt").html(questions[questionCount].prompt);
            $("#selection_1").html(questions[questionCount].choices[0]);
            $("#selection_2").html(questions[questionCount].choices[1]);
            $("#selection_3").html(questions[questionCount].choices[2]);
            $("#selection_4").html(questions[questionCount].choices[3]);
            startTimer();
        } else {
            displayEnd();
        }
    }

    function startTimer() {
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        questionTime--;
        
        $("#show-time").html(questionTime);
        if (questionTime === 0) {
            stop();
            answerStatus = false;
            questionCount++;
            unanswered++;
            displayAnswer();
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    function displayEnd() {
        console.log("you done done it");
        $("#answer-screen").hide();

        $("#prompt").hide();
        $("#end-screen").show();
        $("#results").html("You've finished it game, here's how you did.");
        $("#correct-answers").html("Correct answers: " + correctAnswers);
        $("#wrong-answers").html("Incorret answers: " + wrongAnswers);
        $("#not-answered").html("Unswered questions: " + unanswered);

        $("#restart").show();
        $("#restart").on("click", function () {
            correctAnswers = 0;
            wrongAnswers = 0;
            unanswered = 0;
            questionCount = 0;
            stop();

            displayQuestion();

            $("#end-screen").hide();
            $("#prompt").show();

        });
    }

    function displayAnswer() {
        stop();
        $("#answer-screen").show();
        $(".selection").hide();
        var gif = $("<img>");
        gif.attr("src", "assets/images/" + questions[questionCount - 1].gifName + ".gif");
        $("#image").html(gif);

        if (answerStatus) {
            $("#response").html("You are correct!");
        } else if (!answerStatus) {
            $("#response").html("The correct is answer is: " + questions[questionCount - 1].choices[questions[questionCount - 1].answer] + ".");
        }
        setTimeout(displayQuestion, 3000);
    }

    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
    });

    $(".selection").on("click", function () {
        answerStatus = false;
        //using weak comparison on purpose
        if (($(this).attr("data-answer-number")) == questions[questionCount].answer) {
            console.log("right answer");
            correctAnswers++;
            questionCount++;
            answerStatus = true;
            displayAnswer();

        } else {
            wrongAnswers++;
            questionCount++;
            answerStatus = false;
            displayAnswer();
        }
    });
});