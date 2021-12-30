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
    ['Q1 answer 1', 'Q1 answer 2', 'Q1 answer 3', 'Q1 answer 4'],
    ['Q2 answer 1', 'Q2 answer 2', 'Q2 answer 3', 'Q2 answer 4'],
    ['Q3 answer 1', 'Q3 answer 2', 'Q3 answer 3', 'Q3 answer 4'],
    ['Q4 answer 1', 'Q4 answer 2', 'Q4 answer 3', 'Q4 answer 4']
];


startBtn.addEventListener("click", function () {
    // clear the screen
    mainEl.textContent = '';
    initializeTimer();
    askQuestion();
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

function askQuestion() {

    // !tests
    // console.log('Questions array before click: ' + questions);
    // console.log('Answers array before click: ' + answers);
    // !tests

    randomNum = randomNumber(questions.length);

    var questionTitle = document.createElement('h1')
    questionTitle.textContent = questions[randomNum];

    var answerList = document.createElement('ol');

    var answerOne = document.createElement('li');
    answerOne.textContent = answers[randomNum][0]
    answerList.appendChild(answerOne);

    var answerTwo = document.createElement('li');
    answerTwo.textContent = answers[randomNum][1];
    answerList.appendChild(answerTwo);

    var answerThree = document.createElement('li');
    answerThree.textContent = answers[randomNum][2];
    answerList.appendChild(answerThree);

    var answerFour = document.createElement('li');
    answerFour.textContent = answers[randomNum][3];
    answerList.appendChild(answerFour);

    var nextButton = document.createElement('button');
    nextButton.textContent = 'Next';

    nextButton.addEventListener('click', function () {
        // remove the questions and answers from their arrays
        questions.splice(randomNum, 1);
        answers.splice(randomNum, 1);

        // clear the screen
        mainEl.textContent = '';

            // !tests
            // console.log('Questions array after click: ' + questions);
            // console.log('Answers array after click: ' + answers);
            // !tests

        // check if there are any questions remaining in the questions array
        if (questions.length > 0) {
            askQuestion();
        } else {
            endQuiz();
        }
    })

    mainEl.appendChild(questionTitle);
    mainEl.appendChild(answerList);
    mainEl.appendChild(nextButton);
}

// function createAnswerLi() {

// }

function endQuiz() {
    stopTime();

    var title = document.createElement('h1')
    title.textContent = 'quiz over!';

    mainEl.appendChild(title);
};

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}