import { fiveLetterWords } from './words.js'

const container = document.querySelector('.container')
const keyboard = document.querySelector('.keyboard')
const key = document.querySelectorAll('.lit')
const heading = document.querySelector('.heading')
const span = document.querySelectorAll('.header-span')
const againButton = document.querySelector('.again-button')
const night = document.querySelector('.night')
const termsIcon = document.querySelector('.terms-icon')
const terms = document.querySelector('.terms')
const termsClose = document.querySelector('.terms-close')
const answer = document.querySelector('.answer')
const answerCell = document.querySelectorAll('.answer-cell')

const emojisStart = [
  'π½',
  'πΎ',
  'π€',
  'π',
  'π¦',
  'π',
  'π©',
  'πΊ',
  'π',
  'π',
  'π',
  'π΄',
  'π',
  'π¦',
  'π¦',
  'π',
  'π',
  'π',
  'πͺ',
  'π«',
  'π',
  'π¦',
  'π',
  'πΏ',
  'π¦',
  'π»',
  'π¨',
  'πΌ',
  'π§',
  'π',
  'π¦',
  'π¦',
  'π¦',
  'πΈ',
  'π',
  'π’',
  'π¦',
  'π',
  'π¬',
  'π',
  'π ',
  'π‘',
  'π¦',
  'π',
  'π¦',
  'π¦',
  'π¦',
  'π¦',
  'π',
  'π',
  'π',
  'π',
  'π',
  'π·',
  'π¦',
  'π²',
  'π³',
  'π΄',
  'π΅',
  'πΎ',
  'πΏ',
  'π',
]
const emojisWin = [
  'π»',
  'π',
  'ππ»',
  'ππΌ',
  'ππ½',
  'ππΎ',
  'ππΏ',
  'πΊ',
  'πΊπ»',
  'πΊπΌ',
  'πΊπ½',
  'πΊπΎ',
  'πΊπΏ',
  'π',
  'π',
  'πΊ',
  'π»',
  'πΌ',
  'π₯',
  'π¦',
  'π©',
  'π°',
  'π«',
  'π­',
  'π―',
  'πΎ',
  'π·',
  'πΈ',
  'πΊ',
  'π·',
  'π«',
]
const emojisLose = [
  'π',
  'π©',
  'π',
  'π',
  'π',
  'π€¦',
  'π€¦βββ',
  'π€¦βββ',
  'π€·',
  'π€·βββ',
  'π€·βββ',
  'πΆ',
  'πΆβββ',
  'πΆβββ',
  'π£',
  'π§',
  'π§',
  'π©Ή',
  'π§»',
]
let i = 1
let userWord = []
let secretWord = ''
let color = [1, 2, 3]
let switchCount = 0
let triesCount = 0

function randomEmoji(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

for (let c = 0; c < color.length; c++) {
  span[c].classList.add(`cell-span${color[c]}`)
}

function makeAWord() {
  secretWord =
    fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
  console.log(fiveLetterWords.length)
}
makeAWord()

let secretWord2 = [...secretWord]
console.log(secretWord)

keyboard.addEventListener('click', function (e) {
  let cell = document.querySelector(`.cell${i}`)
  if (
    e.target.classList.contains('lit') &&
    e.target.textContent != 'β«' &&
    e.target.textContent != 'β΅'
  ) {
    if (
      userWord.length != 5 &&
      userWord.length != 10 &&
      userWord.length != 15 &&
      userWord.length != 20 &&
      userWord.length != 25
    ) {
      cell.textContent = e.target.textContent
      userWord.push(cell.textContent)
      i++
    }
  }
  if (e.target.textContent === 'β«') {
    userWord.length != 0 ? i-- : null
    cell = document.querySelector(`.cell${i}`)
    let deleted = userWord.pop()
    cell.textContent == deleted ? (cell.textContent = '') : null
    console.log(i, cell, userWord)
  }
  if (e.target.textContent === 'β΅' && userWord.length === 5) {
    console.log(userWord)
    let b = i
    let startCell = b - 5
    let activeCells = []
    let guess = userWord.join('')

    if (fiveLetterWords.includes(userWord.join(''))) {
      for (let c = 0; c < color.length; c++) {
        span[c].classList.remove(`cell-span${color[c]}`)
      }

      if (guess === secretWord) {
        heading.innerHTML = `JeΓ±is! ${randomEmoji(emojisWin)}`
        againButton.classList.remove('hidden')
        keyboard.classList.toggle('hidden')
      }

      triesCount++
      if (triesCount === 5 && guess != secretWord) {
        heading.innerHTML = `BoljamadΔ±Γ±Δ±z ${randomEmoji(emojisLose)}`
        againButton.classList.remove('hidden')
        keyboard.classList.toggle('hidden')
        for (let i = 0; i < answerCell.length; i++) {
          answer.classList.toggle('hidden')
          answerCell[i].innerHTML = secretWord2[i].toUpperCase()
          console.log(secretWord2)
        }
      }

      for (let j = 0; j < 5; j++) {
        activeCells.push(startCell + j)
      }

      for (let j = 0; j < 5; j++) {
        if (
          secretWord2.includes(userWord[j]) &&
          secretWord2[j] != userWord[j]
        ) {
          document
            .querySelector(`.cell${activeCells[j]}`)
            .classList.add('cell-almost')
          for (let c = 0; c < key.length; c++) {
            key[c].textContent == userWord[j]
              ? key[c].classList.add('key-almost')
              : null
          }
        } else if (secretWord2[j] == userWord[j]) {
          document
            .querySelector(`.cell${activeCells[j]}`)
            .classList.add('cell-guessed')
          for (let c = 0; c < key.length; c++) {
            key[c].textContent == userWord[j]
              ? key[c].classList.add('key-guessed')
              : null
          }
        } else {
          document
            .querySelector(`.cell${activeCells[j]}`)
            .classList.add('cell-no')
          for (let c = 0; c < key.length; c++) {
            key[c].textContent == userWord[j]
              ? key[c].classList.add('key-no')
              : null
          }
        }
      }
      userWord = []
    } else alert('Π’Π°ΠΊΠΎΠ³ΠΎ ΡΠ»ΠΎΠ²Π° Π½Π΅Ρ Π² Π±Π°Π·Π΅')
  }
})

night.addEventListener('click', function (e) {
  let icons = ['<h1>π</h1>', '<h1>π</h1>']
  this.innerHTML = icons[switchCount]
  if (switchCount === 0) {
    switchCount++
  } else switchCount--
  document.body.classList.toggle('night-mode')
  const cellsNight = document.querySelectorAll('#cell')
  for (const item of cellsNight) {
    item.classList.toggle('night-mode')
  }
  for (const item of key) {
    item.classList.toggle('night-mode')
  }
  againButton.classList.toggle('night-mode')
  terms.classList.toggle('night-mode')
})

termsIcon.addEventListener('click', function (e) {
  terms.classList.toggle('hidden')
  container.classList.toggle('hidden')
})

termsClose.addEventListener('click', function (e) {
  terms.classList.toggle('hidden')
  container.classList.toggle('hidden')
})

againButton.addEventListener('click', function (e) {
  for (const cell of document.querySelectorAll('#cell')) {
    if (
      cell.classList.contains('terms-cell') == false &&
      cell.classList.contains('answer-cell') == false
    ) {
      cell.innerHTML = ''
      cell.classList.remove('cell-no', 'cell-almost', 'cell-guessed')
    }
  }
  for (const item of key) {
    item.classList.remove('key-no', 'key-almost', 'key-guessed')
  }
  i = 1
  userWord = []
  triesCount = 0
  heading.innerHTML = `Wo<span class="header-span">r</span><span class="header-span">d</span
  ><span class="header-span">l</span>Δ±`
  makeAWord()
  secretWord2 = [...secretWord]
  keyboard.classList.toggle('hidden')
  answer.classList.contains('hidden') || answer.classList.toggle('hidden')
  this.classList.toggle('hidden')
})
