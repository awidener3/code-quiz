var startBtn = document.getElementById('start-button');
var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');
var homeLi = document.getElementById('home-link');
var highscoreLi = document.getElementById('highscore-link')

var timerInterval;
var timer = 0;

var scoreboard = [{name: 'SJ', score: 40}, {name: 'DR', score: 3}, { name: 'YRM', score: 69}];

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

// HTML QUIZ

const htmlQuestions = [
    'What does HTML stand for?',
    'How many tags are in a regular element?',
    'What is the difference between an opening tag and a closing tag?',
    '<br/> What type of tag is this?'
];

const htmlAnswers = [
    [['Hyper Text Markup Language', true], ['Hot Mail', false], ['How to Make Lasagna', false]],
    [['2', true], ['1', false], ['3', false]],
    [['Opening tag has a / in front', false], ['Closing tag has a / in front', true], ['There is no difference', false]],
    [['Break tag', true], ['A broken one', false], ['An opening tag', false]],
];

// CSS QUIZ

const cssQuestions = [
    'css 1',
    'css 2',
    'css 3',
    'css 4'
];

const cssAnswers = [
    [['css1 answer 1', true], ['css1 answer 2', false], ['css1 answer 3', false], ['css1 answer 4', false]],
    [['css2 answer 1', false], ['css2 answer 2', true], ['css2 answer 3', false], ['css2 answer 4', false]],
    [['css3 answer 1', false], ['css3 answer 2', false], ['css3 answer 3', true], ['css3 answer 4', false]],
    [['css4 answer 1', false], ['css4 answer 2', false], ['css4 answer 3', false], ['css4 answer 4', true]],
];

// JS QUIZ

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

var quizQuestions;
var quizAnswers;

// BUILD HOME
homeLi.addEventListener('click', printHome);

function printHome() {
    mainEl.textContent = '';
    stopTime();
    resetTimer();
    resetQuiz();

    printTitle('Coding Quiz Challenge');
    
    var par = document.createElement('p');
    par.textContent = 'Prepare thyself! For a quiz of immeasurable difficulty awaits!';

    var label = document.createElement('label');
    label.textContent = 'Choose a Category:'

    var select = document.createElement('select');
    select.setAttribute('id', 'select')
    
    select.appendChild(createChoice('HTML'));
    select.appendChild(createChoice('CSS'));
    select.appendChild(createChoice('JavaScript'));
    select.appendChild(createChoice('Testing'));
    
    var button = document.createElement('button');
    button.textContent = 'Start Quiz!';
    button.setAttribute('id', 'start-button');
    button.addEventListener('click', startQuiz); // wait for user to click on start button
    
    mainEl.appendChild(par);
    mainEl.appendChild(label);
    mainEl.appendChild(select);
    mainEl.appendChild(button);
}



function createChoice(choiceName) {
    var choice = document.createElement('option');
    choice.textContent = choiceName;
    return choice;
}

// BUILD HIGHSCORE PAGE
highscoreLi.addEventListener('click', printHighscores);

function printHighscores() {
    mainEl.textContent = ''; // clear the page
    stopTime();
    resetTimer();
    resetQuiz();
    
    sortScoreboard(); // sort the scoreboard array by lowest score to highest

    printTitle('Leaderboard')

    var scores = document.createElement('div');
    scores.setAttribute('id', 'scoreboard');

    for (var i = 0; i < scoreboard.length; i++) {
        printPlayer(i, scores);
    }

    var button = document.createElement('button');
    button.textContent = 'Back to Home';
    button.addEventListener('click', printHome);

    mainEl.appendChild(scores);
    mainEl.appendChild(button)
}

function printPlayer(index, scores) {
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

function sortScoreboard() {
    scoreboard.sort((a,b) => a.score - b.score);
}

// QUIZ HANDLING

function startQuiz() {
    setQuiz();

    mainEl.textContent = ''; // clear page

    initializeTimer(); // start timer
    printQuestion(); // and print the first question
}

function setQuiz() {
    var selection = document.getElementById('select');
    
    if (selection.value === 'HTML') {
        console.log('html!');
        quizQuestions = JSON.parse(JSON.stringify(htmlQuestions));
        quizAnswers = JSON.parse(JSON.stringify(htmlAnswers));
    } else if (selection.value === 'CSS') {
        console.log('css!');
        quizQuestions = JSON.parse(JSON.stringify(cssQuestions));
        quizAnswers = JSON.parse(JSON.stringify(cssAnswers));
    } else if (selection.value === 'JavaScript') {
        console.log('javascript!');
        quizQuestions = JSON.parse(JSON.stringify(javascriptQuestions));
        quizAnswers = JSON.parse(JSON.stringify(javascriptAnswers));
    } else {
        quizQuestions = JSON.parse(JSON.stringify(questions));
        quizAnswers = JSON.parse(JSON.stringify(answers));
    }
}

function printQuestion() {
    if (quizQuestions.length === 0) { // check if there are any remaining questions
        return endQuiz(); // if false, end the quiz
    }

    randomNum = randomNumber(quizQuestions.length); // generate a random number based on the number of questions available

    printQuestionTitle(quizQuestions[randomNum]);

    var answerList = document.createElement('ol');

    for (var i = 0; i < quizAnswers[randomNum].length; i++) {
        answerList.appendChild(createAnswerChoice(randomNum, i)); // print questions depending on how many there are for that question
    }

    mainEl.appendChild(answerList);
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
    if (this.dataset.answer === 'true') { // check to see if the answer is true or false
        quizQuestions.splice(randomNum, 1); // remove the question and its corresponding answers from the array
        quizAnswers.splice(randomNum, 1);
        mainEl.textContent = ''; // clear the screen
        printQuestion(); // print the next question
    } else {
        this.textContent = this.textContent + ' ' + '❌'; // add an 'x' signifying a wrong answer
        timer += 15; // add a 15 second penalty to the timer
    }
}

function endQuiz() {
    stopTime(); // stop the interval

    var affirmations = ['Keep it up, pal!', 'You\'re doing great!', 'I bet you could do this with your eyes closed!', 'I\'m sure everyone would be impressed if they saw you take this quiz!', 'Steve Jobs? Is that you?!', 'Excelsior!']

    var title = document.createElement('h1');
    title.textContent = 'Quiz Over!';

    var results = document.createElement('p');
    results.textContent = 'You scored ' + timer + ' points. ' + affirmations[randomNumber(affirmations.length)];

    var enterInitials = document.createElement('p');
    enterInitials.textContent = 'Please enter your initials.'

    var initialsInput = document.createElement('input');
    initialsInput.maxLength = 2;
    initialsInput.maxLength = 3;
    initialsInput.size = 4;
    initialsInput.required = true;

    var button = document.createElement('button');
    button.textContent = 'Go to Highscores';

    button.addEventListener('click', function () {
        if (initialsInput.value) {
            var playerInfo = {
                name: initialsInput.value.toUpperCase(), // change the input to uppercase
                score: timer
            }
            scoreboard.push(playerInfo); // add the object to the array
            printHighscores();
        }
    })

    mainEl.appendChild(title);
    mainEl.appendChild(results);
    mainEl.appendChild(enterInitials);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(button);
};

function resetQuiz() {
    quizQuestions = null;
    quizAnswers = null;
}

// TIMER HANDLING
function initializeTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(startTime, 1000);
    }
}

function startTime() {
    timer++;
    timerEl.textContent = timer;
}

function stopTime() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    timer = 0;
    timerEl.textContent = timer;
}

// UTILITY
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function printTitle(titleContent) {
    var title = document.createElement('h1');
    title.textContent = titleContent;
    mainEl.appendChild(title);
}

function printQuestionTitle(titleContent) {
    var title = document.createElement('h2');
    title.textContent = titleContent;
    mainEl.appendChild(title);
}

printHome();