// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {   question : "According to C.S. Lewis, it was bordered on the east by the Eastern Ocean and on the north by the River Shribble.",
        imgSrc : "assets/images/Narnia_Lightpost.jpg",
        choiceA : "Narnia",
        choiceB : "The North Pole",
        choiceC : "Atlantis",
        choiceD : "Chipolte",
        correct : "A"
    },

    {   question : "Similar to sarcastic, it's an adjective meaning disdainful or ironically mocking.",
        imgSrc : "assets/images/sardonic.jpg",
        choiceA : "Sadistic",
        choiceB : "Sardonic",
        choiceC : "Sarcophaguses",
        choiceD : "Scaroplasm",
        correct : "B"
    },

    {   question : "Based on almonds, not tomatoes, ajo blanco is a white version of this chilled soup.",
        imgSrc : "assets/images/gazpacho.jpg",
        choiceA : "Cucumber",
        choiceB : "Carrot",
        choiceC : "Gazpacho",
        choiceD : "Avocado",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 10;
const questionTime = 0; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
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
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if (count >= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
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
            clearInterval(TIMER);
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
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    $("#question").text("Correct! The answer was ")
}

function answerIsWrong(){
    $("#question").text("Wrong! The answer was ")
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const percentRight = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p>"+ percentRight +"%</p>";
}
