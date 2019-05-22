// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {   question : "According to C.S. Lewis, it was bordered on the east by the Eastern Ocean and on the north by the River Shribble.",
        imageSource : "assets/images/Narnia_Lightpost.jpg",
        choiceA : "Narnia",
        choiceB : "The North Pole",
        choiceC : "Atlantis",
        choiceD : "Chipolte",
        correct : "A"
    },

    {   question : "Similar to sarcastic, it's an adjective meaning disdainful or ironically mocking.",
        imageSource : "assets/images/sardonic.jpg",
        choiceA : "Sadistic",
        choiceB : "Sardonic",
        choiceC : "Sarcophaguses",
        choiceD : "Scaroplasm",
        correct : "B"
    },

    {   question : "Based on almonds, not tomatoes, ajo blanco is a white version of this chilled soup.",
        imageSource : "assets/images/gazpacho.jpg",
        choiceA : "Cucumber",
        choiceB : "Carrot",
        choiceC : "Gazpacho",
        choiceD : "Avocado",
        correct : "C"
    }
];

const lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 10;
const questionTime = 0; // 10s
var timer;
var score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    questionImage.innerHTML = "<img src="+ q.imageSource +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderCounter();
    timer = setInterval(renderCounter,1000); // 1000ms = 1s
}

// counter render

function renderCounter(){
    if (count >= questionTime){
        counter.innerHTML = count;
        count--;
    } else {
        count = 10;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(timer);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 10;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(timer);
        scoreRender();
    }
}

function answerIsCorrect(){
    $("#question").text("Correct!")
}

function answerIsWrong(){
    $("#question").text("Wrong!")
}

function scoreRender(){
    scoreDiv.style.display = "block";
    const percentRight = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p> You Scored "+ percentRight +"%</p>";
}
