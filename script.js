const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Hyperlinks Text Mark Language', correct: false }
    ]
  },
  {
    question: 'What symbol indicates a tag?',
    answers: [
      { text: 'Commas e.g.', correct: false },
      { text: 'Curved brackets e.g. {,}', correct: false },
      { text: 'Angle brackets e.g.', correct: true },
      { text: 'Exclamation marks e.g. !', correct: false }
    ]
  },
  {
    question: 'What is the correct tag for a line break?',
    answers: [
      { text: '"bk /"', correct: false },
      { text: '"br /"', correct: true },
      { text: '"brk /"', correct: false },
      { text: '"line /"', correct: false }
    ]
  },
  {
    question: 'What does CSS stand for?',
     answers: [
      { text: 'Creative Style System', correct: false },
      { text: 'Cascading Style Sheet', correct: true },
      { text: 'Computing Style Sheet', correct: false },
      { text: 'Creative Styling Sheet', correct: false }
    ]
  },
  {
    question: 'What does JS stand for?',
     answers: [
      { text: 'JavaScript', correct: true },
      { text: 'JavaSheet', correct: false },
      { text: 'JavaSystem', correct: false },
      { text: 'JavaSoftware', correct: false }
    ]
  }
  
]