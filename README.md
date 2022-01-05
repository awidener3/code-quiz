# 📝 Homework Assignment #4: Code Quiz

📌[Link to Live Website](https://awidener3.github.io/code-quiz/)

## 🔨 Task
To create a timed coding quiz with multiple-choice questions. The application will offer multiple topics to take a quiz on, along with a high score leaderboard that is stored in the localStorage database. The application should also have a clean and polished, responsive user interfacte that adapts to multiple screen sizes.

## 📎 How to Play
Select a quiz category you would like to take. Then, click the "Start Quiz!" button to begin the quiz. You will be presented with a multiple-choice question, and will be alerted if you have selected a right or wrong answer. Be careful though, every time you select a wrong answer, you lose 15 points from your score!

The quiz is over when you have completed all questions correctly, or the timer reaches 0. You will then be asked to enter your initials, where you will then be added and sorted into the leaderboards.

## 🔍 Preview
![A gif of the quiz in action!](assets/images/coding-quiz-preview.gif)

## 📝 User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## 💡 Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```