let questions = [
    {
        question: 'What is a variable?',
        options: ['a fruit', 'a vegetable', 'an identified piece of data that can be stored, accessed and changed', 'a sphere'],
        correctOption: 'an identified piece of data that can be stored, accessed and changed'
    },
    {
        question: 'What is the big variable?',
        options: ['Window', 'document', 'html', 'javascript'],
        correctOption: 'Window'
    }
]

const totalTimeSec = 60
let score = 0
let timer

function quiz() {
    questions = shuffle(questions)
    document.getElementById('begin').style.display = 'none'
    document.getElementById('question-card').style.display = 'block'
    document.querySelectorAll('.option').forEach(elem => elem.addEventListener('click', answer))

    nextQuestion()

    document.getElementById('timer').innerHTML = totalTimeSec

    timer = setInterval(() => {
        let timerEl = document.getElementById('timer')
        let timeRemaining = parseInt(timerEl.innerHTML)

        if (!(timeRemaining < 0)) {
            timerEl.innerHTML = timeRemaining - 1
        } else {
            clearInterval(timer)
            finishQuiz()
        }
    }, 1000)
}

function nextQuestion() {
    let question = questions.pop()
    if (question) {
        questions.push(question)
        document.getElementById('question').innerHTML = question.question
        question.options = shuffle(question.options)

        for (let i in document.querySelectorAll('.option')) {
            document.querySelectorAll('#options button')[i].innerHTML = question.options[i]
        }
    } else {
        scoreBoard()
    }
}

function answer(event) {
    console.log(event.target.innerHTML)
    let question = questions.pop()
    document.getElementById('incorrect').className = 'text-danger mx-1 hide'
    document.getElementById('correct').className = 'text-success mx-1 hide'

    if (event.target.innerHTML == question.correctOption) {
        console.log('correct')
        score++
        document.getElementById('correct').className += ' fade'
    } else {
        console.log('incorrect')
        document.getElementById('timer').innerHTML = parseInt(document.getElementById('timer').innerHTML) - 10
        document.getElementById('incorrect').className += ' fade'
    }
    nextQuestion()
}

function scoreBoard() {

}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
  
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }
  