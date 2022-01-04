// !DOCUMENT SELECTORS
var startBtn = document.querySelector('#start-button');
var timerEl = document.querySelector('#timer');
var mainEl = document.querySelector('#main');
var homeLi = document.querySelector('#home-link');
var highscoreLi = document.querySelector('#highscore-link')

// !GLOBAL VARIABLES
var timerInterval;
var secondsLeft;
var quizQuestions;
var quizAnswers;

const questions = [
    'question 1',
    'question 2',
    'question 3',
    'question 4'
];
const answers = [
    [['Q1 answer 1', true], ['Q1 answer 2', false], ['Q1 answer 3', false], ['Q1 answer 4', false]],
    [['Q2 answer 1', false], ['Q2 answer 2', true], ['Q2 answer 3', false], ['Q2 answer 4', false]],
    [['Q3 answer 1', false], ['Q3 answer 2', false], ['Q3 answer 3', true], ['Q3 answer 4', false]],
    [['Q4 answer 1', false], ['Q4 answer 2', false], ['Q4 answer 3', false], ['Q4 answer 4', true]],
];

// !HTML QUIZ
const htmlQuestions = [
    'What does HTML stand for?',
    'The <title> element must be located inside...',
    'Which tag is used to create a hyperlink?',
    'How do you open a link in a new window?',
    '<h3> is the largest default heading tag.',
    'Which of the following table tags is used to create a table row?',
    'Which of the following HTML tags is NOT valid?',
    'Which of the following is NOT an HTML attribute?',
    'What HTML form input must be used to present multiple options, but select only one?',
    'Which of the following tags is used to create an unordered list?',
    'Which element is NOT empty/self-closing?'

];
const htmlAnswers = [
    [['Hyper Text Markup Language', true], ['Hot Mail', false], ['How to Make Lasagna', false]],
    [['the <head> element', true], ['the <body> element', false]],
    [['<a>', true], ['<img>', false], ['<dl>', false], ['<link>', false]],
    [['target="_new"', false], ['target="_window"', false], ['target="_blank"', true]],
    [['True', false], ['False', true]],
    [['<th>', false], ['<td>', false], ['<tr>', true], ['<table>', false]],
    [['<h1>', false], ['<h8>', true], ['<h4>', false], ['<h5>', false]],
    [['alt', false], ['target', false], ['fontSize', true], ['id', false]],
    [['<input type="text">', false], ['<input type="radio">', true], ['<input type="checkbox">', false]],
    [['<ul>', true], ['<ol>', false]],
    [['<br>', false], ['<p>', true], ['<img>', false], ['<hr>', false]]
];

// !CSS QUIZ
const cssQuestions = [
    'Which CSS selector would we use if we wanted to define a style for a unique element?',
    'What does CSS stand for?',
    'What is the correct HTML for referring to an external style sheet?',
    'Where in an HTML document is the correct place to refer to an external style sheet?',
    'Which HTML tag is used to define an internal style sheet?',
    'Which HTML attribute is used to define inline styles?',
    'Which property is used to change the background color?',
    'Which CSS property controls the text size?'
];
const cssAnswers = [
    [['id', true], ['text', false], ['class', false]],
    [['Cascading Style Sheets', true], ['Computer Style Sheets', false], ['Colorful Style Sheets', false], ['Creative Style Sheets', false]],
    [['<style src="mystyle.css">', false], ['<stylesheet>mystyle.css</stylesheet>', false], ['<link rel="stylesheet" type="text/css" href="mystyle.css">', true]],
    [['In the <head> section', true], ['In the <body> section', false], ['At the end of the document', false]],
    [['<css>', false], ['<style>', true], ['<script>', false]],
    [['class', false], ['style', true], ['styles', false], ['font', false]],
    [['background-color', true], ['bgcolor', false], ['color', false]],
    [['text-size', false], ['font-size', true], ['text-style', false], ['font-style', false]]
];
// !JS QUIZ
const javascriptQuestions = [
    'javascript 1',
    'javascript 2',
    'javascript 3',
    'javascript 4'
];
const javascriptAnswers = [
    [['javascript1 answer 1', true], ['javascript1 answer 2', false], ['javascript1 answer 3', false], ['javascript1 answer 4', false]],
    [['javascript2 answer 1', false], ['javascript2 answer 2', true], ['javascript2 answer 3', false], ['javascript2 answer 4', false]],
    [['javascript3 answer 1', false], ['javascript3 answer 2', false], ['javascript3 answer 3', true], ['javascript3 answer 4', false]],
    [['javascript4 answer 1', false], ['javascript4 answer 2', false], ['javascript4 answer 3', false], ['javascript4 answer 4', true]],
];


// !HOME
homeLi.addEventListener('click', printHome);

function printHome() {
    mainEl.textContent = '';
    resetQuiz();

    printTitle('Coding Quiz Challenge');
    
    var par = document.createElement('p');
    par.textContent = 'Prepare thyself! For a quiz of immeasurable difficulty awaits!';

    var categoryDiv = document.createElement('div');
    categoryDiv.classList.add('selection-div');

    var label = document.createElement('label');
    label.textContent = 'Select a Category:'

    var select = document.createElement('select');
    select.setAttribute('id', 'select')
    
    select.appendChild(createChoice('HTML Basics'));
    select.appendChild(createChoice('CSS Basics'));
    select.appendChild(createChoice('JavaScript Basics'));
    select.appendChild(createChoice('Testing'));

    categoryDiv.appendChild(label);
    categoryDiv.appendChild(select);
    
    var button = document.createElement('button');
    button.textContent = 'Start Quiz!';
    button.setAttribute('id', 'start-button');
    button.addEventListener('click', startQuiz); // ? wait for user to click on start button
    
    mainEl.appendChild(par);
    mainEl.appendChild(categoryDiv);
    mainEl.appendChild(button);
}

function createChoice(choiceName) {
    var choice = document.createElement('option');
    choice.textContent = choiceName;
    return choice;
}

// !HIGHSCORE
highscoreLi.addEventListener('click', renderHighScores);

function renderHighScores() {
    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    mainEl.textContent = ''; // clear the page

    resetQuiz();

    printTitle('Leaderboard')

    var scores = document.createElement('div');
    scores.setAttribute('id', 'scoreboard');

    for (var i = 0; i < scoreboard.length; i++) {
        renderPlayer(i, scores);
    }

    var button = document.createElement('button');
    button.textContent = 'Back to Home';
    button.addEventListener('click', printHome);

    mainEl.appendChild(scores);
    mainEl.appendChild(button)
}

function addHighScore() {
    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    if (scoreboard == null) {
        scoreboard = [];    
    }

    var playerName = document.getElementById('initials-input').value.toUpperCase();
    var playerScore = secondsLeft;

    var player = {
        'name': playerName,
        'score': playerScore
    };

    scoreboard.push(player);                        // ? push player object onto localStorage array
    scoreboard.sort((a,b) => b.score - a.score);    // ? sort the array lowest to highest

    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
}

function renderPlayer(index, scores) {
    var scoreboard = JSON.parse(localStorage.getItem('scoreboard'));

    var row = document.createElement('div');
    row.classList.add('score-row');

    var playerInitials = document.createElement('p');
    playerInitials.textContent = scoreboard[index].name;

    var playerScore = document.createElement('p');
    playerScore.textContent = scoreboard[index].score;

    row.appendChild(playerInitials);
    row.appendChild(playerScore);

    scores.appendChild(row);
}

// !QUIZ

function startQuiz() {
    setQuiz();                              // ? Set quiz questions based on selection on homepage

    mainEl.textContent = '';                // ? clear page

    initializeTimer();                      // ? start timer
    printQuestion();                        // ? and print the first question
}

function setQuiz() {
    var selection = document.getElementById('select');
    
    if (selection.value === 'HTML Basics') {
        quizQuestions = JSON.parse(JSON.stringify(htmlQuestions));
        quizAnswers = JSON.parse(JSON.stringify(htmlAnswers));
    } else if (selection.value === 'CSS Basics') {
        quizQuestions = JSON.parse(JSON.stringify(cssQuestions));
        quizAnswers = JSON.parse(JSON.stringify(cssAnswers));
    } else if (selection.value === 'JavaScript Basics') {
        quizQuestions = JSON.parse(JSON.stringify(javascriptQuestions));
        quizAnswers = JSON.parse(JSON.stringify(javascriptAnswers));
    } else {
        quizQuestions = JSON.parse(JSON.stringify(questions));
        quizAnswers = JSON.parse(JSON.stringify(answers));
    }
}

function resetQuiz() {
    stopTime();
    resetTimer();

    quizQuestions = null;
    quizAnswers = null;
}

function endQuiz() {
    mainEl.textContent = '';

    stopTime();                                 // ? stop the interval
    quizQuestions = null;                       // ? remove parsed arrays
    quizAnswers - null;

    var affirmations = ['Keep it up, pal!', 'You\'re doing great!', 'I bet you could do this with your eyes closed!', 'I\'m sure everyone would be impressed if they saw you take this quiz!', 'Steve Jobs? Is that you?!', 'Excelsior!']

    var title = document.createElement('h1');
    title.textContent = 'Quiz Over!';

    var results = document.createElement('p');
    results.textContent = 'You scored ' + secondsLeft + ' points. ' + affirmations[randomNumber(affirmations.length)];

    var enterInitials = document.createElement('p');
    enterInitials.textContent = 'Please enter your initials:'
    enterInitials.classList.add('enter-initials')

    var initialsInput = document.createElement('input');
    initialsInput.classList.add('initials-input');
    initialsInput.setAttribute('id', 'initials-input');
    initialsInput.maxLength = 3;
    initialsInput.size = 4;

    var button = document.createElement('button');
    button.textContent = 'Go to Highscores';

    button.addEventListener('click', function () {
        if (initialsInput.value) {
            addHighScore();
            renderHighScores();
        }
    })

    mainEl.appendChild(title);
    mainEl.appendChild(results);
    mainEl.appendChild(enterInitials);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(button);
};

function printQuestion() {
    if (quizQuestions.length === 0) {       // ? check if there are any remaining questions
        mainEl.textContent = '';
        return endQuiz();                   // ? if false, end the quiz
    }

    randomNum = randomNumber(quizQuestions.length); // ? generate a random number based on the number of questions available

    mainEl.textContent = '';                // ? clear the screen

    var card = document.createElement('div');
    card.classList.add('card');

    var icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-question-circle');
    icon.classList.add('fa-4x');

    card.appendChild(icon);

    card.appendChild(printQuestionTitle(quizQuestions[randomNum]));

    var answerList = document.createElement('ol');

    for (var i = 0; i < quizAnswers[randomNum].length; i++) {
        answerList.appendChild(createAnswerChoice(randomNum, i)); // ? print questions depending on how many there are for that question
    }

    card.appendChild(answerList);

    mainEl.appendChild(card);
}

function createAnswerChoice(randomNum, index) {
    var answer = document.createElement('li');

    answer.classList.add('answer-choice');
    answer.addEventListener('click', checkAnswer);
    answer.textContent = quizAnswers[randomNum][index][0];
    answer.dataset.answer = quizAnswers[randomNum][index][1];

    return answer;
}

function checkAnswer() {
    if (this.dataset.answer === 'true') {       // ? check to see if the answer is true or false
        quizQuestions.splice(randomNum, 1);     // ? remove the question and its corresponding answers from the array
        quizAnswers.splice(randomNum, 1);
        this.classList.add('correct');          // ? add correct class for pseudo element

        setTimeout(printQuestion, 500);        // ? print the next question

    } else {
        if (!this.textContent.endsWith('❌')) {
            this.textContent = this.textContent + ' ' + '❌'; // ? add an 'x' signifying a wrong answer
            secondsLeft -= 15;                        // ? add a 15 second penalty to the timer
        }
    }
}

// !TIMER
function initializeTimer() {
    secondsLeft = 75;

   if (!timerInterval) {
        timerInterval = setInterval(startTime, 1000);
    }
}

function startTime() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if(secondsLeft <= 0) {
        stopTime();
        secondsLeft = 0;
        timerEl.textContent = secondsLeft;
        timerInterval = null;
        endQuiz();
    }
}

function stopTime() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    secondsLeft = 0;
    timerEl.textContent = secondsLeft;
}

// !UTILITY
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function printTitle(titleContent) {
    var title = document.createElement('h1');
    title.textContent = titleContent;
    title.classList.add('page-title');
    mainEl.appendChild(title);
}

function printQuestionTitle(titleContent) {
    var title = document.createElement('h2');
    title.textContent = titleContent;
    title.classList.add('question-title');

    return title;
}

printHome();