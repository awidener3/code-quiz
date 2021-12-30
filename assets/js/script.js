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

    answerList.appendChild(createAnswerLi(randomNum, 0));
    answerList.appendChild(createAnswerLi(randomNum, 1));
    answerList.appendChild(createAnswerLi(randomNum, 2));
    answerList.appendChild(createAnswerLi(randomNum, 3));

    mainEl.appendChild(questionTitle);
    mainEl.appendChild(answerList);
}

function createAnswerLi(randomNum, index) {
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
        timer += 15;
    }
}

function endQuiz() {
    stopTime();

    var title = document.createElement('h1')
    title.textContent = 'quiz over!';

    mainEl.appendChild(title);
};

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}