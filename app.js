const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#acdFF1', '#29e310', '#e310e3', '#e3d510', '#e31056', '#10e341', '#c0e310', '#10e3ca', '#4038d1', '#8a26bf', '#e079e0', '#4fe319']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  screens[1].classList.add('up')
  timeEl.innerHTML = `00:${time}`
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }

}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(50, 100)
  const {
    width,
    height
  } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)


  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  const color1 = getRandomColors()
  const color2 = getRandomColors()
  const color3 = getRandomColors()
  const angleGradient = getRandomNumber(0, 360)
  const colorStop1 = getRandomNumber(0, 100)
  const colorStop2 = getRandomNumber(0, 100)
  const colorStop3 = getRandomNumber(0, 100)
  circle.style.background = `linear-gradient(${angleGradient}deg, ${color1} ${colorStop1}%, ${color2} ${colorStop2}%, ${color3} ${colorStop3}%)`

  board.append(circle)

}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColors() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
