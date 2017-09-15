"use strict";

// $(function () {
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
    }

];

function displayQuestion() {
    if (questionCount < questions.length) {
        $(".selection").show();
        $("#prompt").html(questions[questionCount].prompt);
        $("#selection_1").html(questions[questionCount].choices[0]);
        $("#selection_2").html(questions[questionCount].choices[1]);
        $("#selection_3").html(questions[questionCount].choices[2]);
        $("#selection_4").html(questions[questionCount].choices[3]);
        questionTime = 3;
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
    $("#prompt").html("You've finished it game, here's how you did.");
    $("#prompt").append("Correct answers: " + correctAnswers);
    $("#prompt").append("Incorret answers: " + wrongAnswers);
    $("#prompt").append("Unswered questions: " + unanswered);
}

function displayAnswer() {
    stop();
    $(".selection").hide();
    var gif = $("<img>");
    gif.attr("src", "assets/images/" + questions[questionCount - 1].gifName + ".gif");
    $("#prompt").append(gif);

    if (answerStatus) {
        $("#prompt").append("You are correct!");
    } else if (!answerStatus) {
        $("#prompt").append("The correct is answer is: " + questions[questionCount - 1].choices[questions[questionCount - 1].answer] + ".");
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
        questionCount++;
        answerStatus = false;
        displayAnswer();
    }
});
// });