var timer = document.querySelector('#timer');
var button1 = document.querySelector('#button-1');
var button2 = document.querySelector('#button-2');
var button3 = document.querySelector('#button-3');
var button4 = document.querySelector('#button-4');
var question = document.querySelector('#question');
var image = document.querySelector('#question-image');
var startButton = document.querySelector('#start-button');
var startBox = document.querySelector('.start');
var questionBox = document.querySelector('.question-box');
var imageBox = document.querySelector('.image-box');
var confirmation = document.querySelector('#confirmation');
var fail = document.querySelector('#fail');
var quiz = document.querySelector('#quiz');
var tryAgain = document.querySelector('#try-again');

var shuffledQuestions = [];
var curIdx = 0;
var remainingTime = 90;
var curQuestion, timerInterval;

var questions = [
    {
        question: "What is the title of the album from the art shown?",
        A: "Glass Animals",
        B: "Dreamland",
        C: "ZABA",
        D: "How to Be a Human Being",
        answer: "B",
        image: "dreamland.jpg"
    },
    {
        question: "For which popular UK music festival (shown) is Glass Animals known for?",
        A: "Coachella",
        B: "Osfest",
        C: "Glastonbury",
        D: "Let's Rock",
        answer: "C",
        image: "glastonbury.jpg"
    },
    {
        question: "Which band member is pictured here?",
        A: "Drew MacFarlane",
        B: "Joe Seaward",
        C: "Ed Irwin-Singer",
        D: "Dave Bayley",
        answer: "B",
        image: "joe.png",
    },
    {
        question: "Which song in How to Be a Human Being features the character shown here?",
        A: "Youth",
        B: "Agnes",
        C: "Pork Soda",
        D: "Season 2 Episode 3",
        answer: "D",
        image: "liz.jpg"
    },
];

function initialize() {
    curIdx = 0;
    remainingTime = 90;
    shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    
    timerInterval = setInterval(function () {
        remainingTime--;
        if (remainingTime <= 0) {
            timer.textContent = 'You lose!';
            endQuiz(false);
            clearInterval(timerInterval);
        } else {
            timer.textContent = `Time: ${remainingTime}`;
        }
    }, 1000);
}

function start(event) {
    startBox.classList.add('hidden');
    questionBox.classList.remove('hidden');
    imageBox.classList.remove('hidden');
    fail.classList.add('hidden');
    quiz.classList.remove('hidden');

    initialize();

    displayQuestion();
}

function displayQuestion() {
    if (remainingTime <= 0) {
        return;
    }

    curQuestion = shuffledQuestions[curIdx];
    curIdx++;

    console.log(shuffledQuestions);

    question.textContent = curQuestion.question;
    button1.textContent = curQuestion.A;
    button2.textContent = curQuestion.B;
    button3.textContent = curQuestion.C;
    button4.textContent = curQuestion.D;
    button1.style.backgroundColor = '#4B0082';
    button2.style.backgroundColor = '#4B0082';
    button3.style.backgroundColor = '#4B0082';
    button4.style.backgroundColor = '#4B0082';
    image.src = `./assets/images/${curQuestion.image}`;
}

function checkAnswer(event) {
    console.log(event);
    console.log(event.target.dataset.label);

    if (event.target.dataset.label === curQuestion.answer) {
        confirmation.textContent = "Correct!";
        if (curIdx < shuffledQuestions.length) {
            displayQuestion();
        } else {
            endQuiz(true);
        }
    } else {
        confirmation.textContent = "Incorrect.";
        event.target.style.backgroundColor = "#FF004F";
        setTimeout(function () {
            confirmation.textContent = '';
        }, 2000);
        remainingTime -= 10;
        // timer.textContent = `Time: ${remainingTime}`;
    }
}

function endQuiz(isWon) {
    if (isWon) {

    } else {
        quiz.classList.add('hidden');
        fail.classList.remove('hidden');
    }
}

startButton.addEventListener('click', start);
button1.addEventListener('click', checkAnswer);
button2.addEventListener('click', checkAnswer);
button3.addEventListener('click', checkAnswer);
button4.addEventListener('click', checkAnswer);
tryAgain.addEventListener('click', start);
