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
let scoreboardProto = {
    users: [{
        name: '',
        games: [{
            date: Date,
            score: 0,
            time: 0,
            get netScore() {
                return this.score - this.time
            }
        }]
    }],
    entriesCache: null,
    getEntries: function(page, entriesPerPage=10) {
        if (!this.entriesCache) {
            // sort all games

            let allGames = []
            for (let i in users) for (let j in users[i].games) {
                allGames.push(users[i].games[j]) // score good time bad
            }

            let sorted = false
            // what
            while (!sorted) {
                sorted = true
                for (let i in allGames) {
                    if (allGames[i].netScore < allGames[i + 1].netScore && allGames[i + 1]) {
                        sorted = false
                        let temp = allGames[i]
                        allGames[i] = allGames[i + 1]
                        allGames[i + 1] = temp
                    }
                }
            }
            this.entriesCache = allGames
        }
        
        page = page - 1

        let i = Math.max(page * entriesPerPage, this.entriesCache.length)

        if (i => this.entriesCache.length) {
            return false
        }

        return this.entriesCache.slice(i, Math.max((page + 1) * entriesPerPage, this.entriesCache.length))
    }
}

function quiz() {
    questions = shuffle(questions)
    document.getElementById('begin').style.display = 'none'
    document.getElementById('scoreboard').style.display = 'none'
    document.getElementById('quiz-end').style.display = 'none'
    document.getElementById('question-card').style.display = 'block'
    document.querySelectorAll('.option').forEach(elem => elem.addEventListener('click', answer))

    nextQuestion()

    document.getElementById('timer').innerHTML = totalTimeSec

    timer = setInterval(() => {
        let timerEl = document.getElementById('timer')
        let timeRemaining = parseInt(timerEl.innerHTML)

        if (timeRemaining > 0) {
            timerEl.innerHTML = timeRemaining - 1
        } else {
            clearInterval(timer)
            quizEnd()
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

function quizEnd() {
    document.getElementById('begin').style.display = 'none'
    document.getElementById('question-card').style.display = 'none'
    document.getElementById('scoreboard').style.display = 'none'
    document.getElementById('quiz-end').style.display = 'block'

    document.getElementById('score-display').innerHTML = `Your score is ${score}.`
    let timeTaken = totalTimeSec - parseInt(document.getElementById('timer'))
    document.getElementById('time-display').innerHTML = `You took ${timeTaken} seconds to complete the quiz.`

    
}

function scoreBoard() {
    document.getElementById('begin').style.display = 'none'
    document.getElementById('question-card').style.display = 'none'
    document.getElementById('quiz-end').style.display = 'none'
    document.getElementById('scoreboard').style.display = 'block'

    // Populate scoreboard
    if (localStorage.getItem('scoreboard')) {
        let scoreboard = JSON.parse(localStorage.getItem('scoreboard'))
        
    } else {
        document.getElementById('scoreboard-board').innerHTML = 'No scoreboard entries exist. <a href="#" onclick="quiz()"> Begin quiz.</a>'
    }
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
  