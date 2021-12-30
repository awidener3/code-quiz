var startBtn = document.getElementById('start-button');
var timerEl = document.getElementById('timer');
var mainEl = document.getElementById('main');

var timerInterval;
var timer = 0;

var questions = [
    'question 1',
    'question 2',
    'question 3',
    'question 4'
];

var scoreboard = [['SJ', 40], ['DR', 3], ['YRM', 600]];

var answers = [
    [['Q1 answer 1', true], ['Q1 answer 2', false], ['Q1 answer 3', false], ['Q1 answer 4', false]],
    [['Q2 answer 1', false], ['Q2 answer 2', true], ['Q2 answer 3', false], ['Q2 answer 4', false]],
    [['Q3 answer 1', false], ['Q3 answer 2', false], ['Q3 answer 3', true], ['Q3 answer 4', false]],
    [['Q4 answer 1', false], ['Q4 answer 2', false], ['Q4 answer 3', false], ['Q4 answer 4', true]],
];

startBtn.addEventListener("click", function () {
    mainEl.textContent = '';
    initializeTimer();
    printQuestion();
});

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

// QUIZ HANDLING

function printQuestion() {
    // check if there are any questions remaining in the questions array
    if (questions.length === 0) {
        endQuiz();
        return;
    }

    randomNum = randomNumber(questions.length);

    var questionTitle = document.createElement('h1')
    questionTitle.textContent = questions[randomNum];

    var answerList = document.createElement('ol');

    answerList.appendChild(createAnswerChoice(randomNum, 0));
    answerList.appendChild(createAnswerChoice(randomNum, 1));
    answerList.appendChild(createAnswerChoice(randomNum, 2));
    answerList.appendChild(createAnswerChoice(randomNum, 3));

    mainEl.appendChild(questionTitle);
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
    if (this.dataset.answer === 'true') {
        questions.splice(randomNum, 1);
        answers.splice(randomNum, 1);
        mainEl.textContent = '';
        printQuestion();
    } else {
        this.textContent = this.textContent + ' ' + '❌';
        timer += 15;
    }
}

function endQuiz() {
    stopTime();

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

    button.addEventListener('click', function() {
        console.log(initialsInput.value);

        if (!initialsInput.value) {
            console.log('nothing to see here...')
        } else {
            var playerInitials = initialsInput.value;
            var playerScore = timer;
            var playerInfo = [playerInitials, playerScore]
            printHighscores(playerInfo);
        }
    })

    mainEl.appendChild(title);
    mainEl.appendChild(results);
    mainEl.appendChild(enterInitials);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(button);
};

function printHighscores(playerInfo) {
    scoreboard.push(playerInfo);

    sortScoreboard();
    
    mainEl.textContent = '';

    var title = document.createElement('h1');
    title.textContent = 'Leaderboard';

    mainEl.appendChild(title);

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
    playerInitials.textContent = scoreboard[index][0];

    var playerScore = document.createElement('p');
    playerScore.textContent = scoreboard[index][1];

    row.appendChild(playerInitials);
    row.appendChild(playerScore);

    scores.appendChild(row);
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}