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
    },

    {   question : "IN 1967, SURGEON CHRISTIAAN BARNARD PERFORMED THE FIRST HUMAN HEART TRANSPLANT IN THIS AFRICAN COUNTRY",
        imageSource : "assets/images/southafrica.jpeg",
        choiceA : "Egypt",
        choiceB : "South Aftrica",
        choiceC : "Kenya",
        choiceD : "Algeria",
        correct : "B"
    },

    {   question : "IN 1985, ARKANSAS ADOPTED THIS INSTRUMENT AS ITS STATE MUSICAL INSTRUMENT",
        imageSource : "assets/images/instruments.jpg",
        choiceA : "Saxaphone",
        choiceB : "Trumpet",
        choiceC : "Fiddle",
        choiceD : "Piano",
        correct : "C"
    },

    {   question : "IT'S THE AREA ABOVE A NATIONAL TERRITORY THAT BELONGS TO THAT COUNTRY",
        imageSource : "assets/images/aerospace.jpg",
        choiceA : "Aerospace",
        choiceB : "The sky",
        choiceC : "Air",
        choiceD : "Water",
        correct : "A"
    },

    {   question : "IN MANY U.S. STATES, THIS TREE PLANTING HOLIDAY IS OBSERVED ON THE LAST FRIDAY IN APRIL",
        imageSource : "assets/images/arborday.png",
        choiceA : "Humanity Day",
        choiceB : "Tree Day",
        choiceC : "Earth Day",
        choiceD : "Arbor Day",
        correct : "D"
    },

    {   question : "KITES ARE FLOWN ON MAKAR SANKRANTI, A HOLIDAY ON THE CALENDAR OF THIS RELIGION",
        imageSource : "assets/images/kites.png",
        choiceA : "Hinduism",
        choiceB : "Buddhism",
        choiceC : "Christianity",
        choiceD : "Islam",
        correct : "A"
    },

    {   question : "SHE WROTE THE BOOK THAT WAS ADAPTED INTO THE FILM MARY POPPINS",
        imageSource : "assets/images/mary_poppins.jpg",
        choiceA : "Agatha Christie",
        choiceB : "P. L. Travers",
        choiceC : "J. K. Rowling",
        choiceD : "I wrote it!",
        correct : "B"
    },
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
