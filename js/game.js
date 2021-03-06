const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = {}

var timerEl = document.getElementById('countdown');

let questions = [{
    question: "What is this symbol in JavaScript '%'?",
    choice1: 'Percent', 
    choice2: 'Modulus', 
    choice3: 'Pie', 
    choice4: 'Remainder',
    answer: 2,
  },
  {
    question: "What is String Concatenation?",
    choice1: 'Formulating a string', 
    choice2: 'Defining strings', 
    choice3: 'Appending one string to another', 
    choice4: 'Dividing a string',
    answer: 3,
  },
  {
    question: "What can be held within a variable?",
    choice1: 'Numbers', 
    choice2: 'Strings', 
    choice3: 'Objects', 
    choice4: 'All of the above',
    answer: 4,
  },
  {
    question: "What are variables identified with?",
    choice1: 'Unique terms', 
    choice2: 'Identifiers', 
    choice3: 'Words', 
    choice4: 'Names',
    answer: 2,
  },
  {
    question: "What is a Conditional Statement?",
    choice1: 'Boolean', 
    choice2: 'Loop', 
    choice3: 'Variable', 
    choice4: 'None of the above',
    answer: 4,
  }]
console.log(questions);

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    // needs to be timer
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
            decreaseScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

// Timer that counts down from 5
function countdown() {
    var timeLeft = 15;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        displayMessage();
      }
    }, 1000);
  }

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

decreaseScore = num => {
    score -=num
    scoreText.innerText = score
}

startGame()



