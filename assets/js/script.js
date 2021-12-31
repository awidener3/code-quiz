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

// BUILD HOME
homeLi.addEventListener('click', printHome);

function printHome() {
    mainEl.textContent = '';
    stopTime();

    printTitle('Coding Quiz Challenge');
    
    var par = document.createElement('p');
    par.textContent = 'Prepare thyself! For a quiz of immeasurable difficulty awaits!';
    
    var button = document.createElement('button');
    button.textContent = 'Start Quiz!';
    button.setAttribute('id', 'start-button');
    button.addEventListener('click', startQuiz); // wait for user to click on start button
    
    mainEl.appendChild(par);
    mainEl.appendChild(button);
}

// BUILD HIGHSCORE PAGE
highscoreLi.addEventListener('click', printHighscores);

function printHighscores() {
    mainEl.textContent = ''; // clear the page
    stopTime();
    
    sortScoreboard(); // sort the scoreboard array by lowest score to highest

    printTitle('Leaderboard')

    var scores = document.createElement('div');
    scores.setAttribute('id', 'scoreboard');

    for (var i = 0; i < scoreboard.length; i++) {
        printPlayer(i, scores);
    }

    mainEl.appendChild(scores);
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
startBtn.addEventListener('click', startQuiz); // wait for user to click on start button

function startQuiz() {
    mainEl.textContent = ''; // clear page

    initializeTimer(); // start timer
    printQuestion(); // and print the first question
}

function printQuestion() {
    // var quizQuestions = JSON.parse(JSON.stringify(questions));
    // var quizAnswers = JSON.parse(JSON.stringify(answers));

    if (questions.length === 0) { // check if there are any remaining questions
        return endQuiz(); // if false, end the quiz
    }

    randomNum = randomNumber(questions.length); // generate a random number based on the number of questions available

    printTitle(questions[randomNum]);

    var answerList = document.createElement('ol');

    answerList.appendChild(createAnswerChoice(randomNum, 0)); // print questions from answerList array onto screen
    answerList.appendChild(createAnswerChoice(randomNum, 1));
    answerList.appendChild(createAnswerChoice(randomNum, 2));
    answerList.appendChild(createAnswerChoice(randomNum, 3));

    mainEl.appendChild(answerList);
}

function createAnswerChoice(randomNum, index) {
    var answer = document.createElement('li');

    answer.classList.add('answer-choice');
    answer.addEventListener('click', checkAnswer);
    answer.textContent = answers[randomNum][index][0];
    answer.dataset.answer = answers[randomNum][index][1];

    return answer;
}

function checkAnswer() {
    if (this.dataset.answer === 'true') { // check to see if the answer is true or false
        questions.splice(randomNum, 1); // remove the question and its corresponding answers from the array
        answers.splice(randomNum, 1);
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
    timer = 0;
    timerEl.textContent = timer;

    clearInterval(timerInterval);
    timerInterval = null;
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