var timer = document.querySelector('#timer');
var button1 = document.querySelector('#button-1');
var button2 = document.querySelector('#button-2');
var button3 = document.querySelector('#button-3');
var button4 = document.querySelector('#button-4');
var question = document.querySelector('#question');
var image = document.querySelector('#question-image');

var questions = [
    {
        question: "What is the title of the album shown?",
        A: "Glass Animals",
        B: "ZABA",
        C: "Dreamland",
        D: "How to Be a Human Being",
        answer: "B",
        image: "zaba.png"
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

