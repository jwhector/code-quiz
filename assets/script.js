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
var fail = document.querySelector('#fail');
var quiz = document.querySelector('.quiz');
var tryAgain = document.querySelector('#try-again');
var highScores = document.querySelector('.highscores');
var scoreInput = document.querySelector('#score-input');
var scoreList = document.querySelector('#score-list');
var initialsInput = document.querySelector('#initials');
var clearHighscores = document.querySelector('#clear-highscores');

var shuffledQuestions = [];
var highScoreValues = [];
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
        image: "dreamland.jpg",
        alt: "A teal background with a pink head modeled after Dave Bayley."
    },
    {
        question: "For which popular UK music festival (shown) is Glass Animals known for?",
        A: "Coachella",
        B: "Osfest",
        C: "Glastonbury",
        D: "Let's Rock",
        answer: "C",
        image: "glastonbury.jpg",
        alt: "A festival stage with a squared roof an large half-dome on top."
    },
    {
        question: "Which band member is pictured here?",
        A: "Drew MacFarlane",
        B: "Joe Seaward",
        C: "Ed Irwin-Singer",
        D: "Dave Bayley",
        answer: "B",
        image: "joe.png",
        alt: "A bandd dmember with an earring, pointed eyebrows, and messy hair."
    },
    {
        question: "Which song in How to Be a Human Being features the character shown here?",
        A: "Youth",
        B: "Agnes",
        C: "Pork Soda",
        D: "Season 2 Episode 3",
        answer: "D",
        image: "liz.jpg",
        alt: "A woman in a teal sweatshirt sits casually on a couch behind a table full of old food."
    },
    {
        question: "Which hit song from the shown album contains the lyrics 'Twitch their toes...'?",
        A: "Black Mambo",
        B: "Gooey",
        C: "Toes",
        D: "Cocoa Hooves",
        answer: "A",
        image: "zaba-new.png",
        alt: "Album art of jungle ambiance."
    },
];

function initialize() {
    const scoreValues = localStorage.getItem('scores');
    if (scoreValues) highScoreValues = JSON.parse(scoreValues);

    for (var i = 0; i < highScoreValues.length; i++) {
        const li = document.createElement('li');
        li.textContent = `${highScoreValues[i].initials}: ${highScoreValues[i].score}`;
        scoreList.appendChild(li);
    }
}

function start(event) {
    startBox.classList.add('hidden');
    questionBox.classList.remove('hidden');
    imageBox.classList.remove('hidden');
    fail.classList.add('hidden');
    quiz.classList.remove('hidden');
    tryAgain.classList.add('hidden');
    highScores.classList.add('hidden');
    clearHighscores.classList.add('hidden');


    curIdx = 0;
    remainingTime = 90;
    shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    
    timerInterval = setInterval(function () {
        remainingTime--;
        if (remainingTime <= 0) {
            // timer.textContent = 'You lose!';
            endQuiz(false);
        } else {
            timer.textContent = `Time: ${remainingTime}`;
        }
    }, 1000);

    displayQuestion();
}

function displayQuestion() {
    if (remainingTime <= 0) {
        return;
    }

    curQuestion = shuffledQuestions[curIdx];
    curIdx++;

    // console.log(shuffledQuestions);

    question.textContent = curQuestion.question;
    button1.textContent = curQuestion.A;
    button2.textContent = curQuestion.B;
    button3.textContent = curQuestion.C;
    button4.textContent = curQuestion.D;
    button1.classList.remove('button-incorrect');
    button2.classList.remove('button-incorrect');
    button3.classList.remove('button-incorrect');
    button4.classList.remove('button-incorrect');

    image.src = `./assets/images/${curQuestion.image}`;
    image.alt = curQuestion.alt;
}

function checkAnswer(event) {
    console.log(event);
    console.log(event.target.dataset.label);

    if (event.target.dataset.label === curQuestion.answer) {
        if (curIdx < shuffledQuestions.length) {
            displayQuestion();
        } else {
            endQuiz(true);
        }
    } else {
        event.target.classList.add('button-incorrect');
        remainingTime -= 10;
        // timer.textContent = `Time: ${remainingTime}`;
    }
}

function endQuiz(isWon) {
    quiz.classList.add('hidden');
    clearInterval(timerInterval);
    tryAgain.classList.remove('hidden');
    imageBox.classList.add('hidden');


    if (isWon) {
        highScores.classList.remove('hidden');
        clearHighscores.classList.remove('hidden');
        // renderScores();
    } else {
        fail.classList.remove('hidden');
    }
}

function addHighScore(event) {
    event.preventDefault();

    const initials = initialsInput.value.trim();

    if (!initials) return;

    highScoreValues.push({ initials: initials, score: remainingTime});
    localStorage.setItem('scores', JSON.stringify(highScoreValues));

    const li = document.createElement('li');
    li.textContent = `${initials}: ${remainingTime}`;
    scoreList.appendChild(li);

    initialsInput.value = '';

}

function clearScores() {
    localStorage.clear();

    while(scoreList.hasChildNodes()) {
        scoreList.removeChild(scoreList.lastChild);
    }
}



startButton.addEventListener('click', start);
button1.addEventListener('click', checkAnswer);
button2.addEventListener('click', checkAnswer);
button3.addEventListener('click', checkAnswer);
button4.addEventListener('click', checkAnswer);
tryAgain.addEventListener('click', start);
scoreInput.addEventListener('submit', addHighScore);
clearHighscores.addEventListener('click', clearScores);

initialize();