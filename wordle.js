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

const emojisStart = [
  '👽',
  '👾',
  '🤖',
  '🐒',
  '🦍',
  '🐕',
  '🐩',
  '🐺',
  '🐈',
  '🐅',
  '🐆',
  '🐴',
  '🐎',
  '🦌',
  '🦄',
  '🐂',
  '🐃',
  '🐄',
  '🐪',
  '🐫',
  '🐘',
  '🦏',
  '🐇',
  '🐿',
  '🦇',
  '🐻',
  '🐨',
  '🐼',
  '🐧',
  '🕊',
  '🦅',
  '🦆',
  '🦉',
  '🐸',
  '🐊',
  '🐢',
  '🦎',
  '🐋',
  '🐬',
  '🐟',
  '🐠',
  '🐡',
  '🦈',
  '🐚',
  '🦀',
  '🦐',
  '🦑',
  '🦋',
  '🐌',
  '🐛',
  '🐜',
  '🐝',
  '🐞',
  '🕷',
  '🦂',
  '🌲',
  '🌳',
  '🌴',
  '🌵',
  '🌾',
  '🌿',
  '🍀',
]
const emojisWin = [
  '👻',
  '💃',
  '💃🏻',
  '💃🏼',
  '💃🏽',
  '💃🏾',
  '💃🏿',
  '🕺',
  '🕺🏻',
  '🕺🏼',
  '🕺🏽',
  '🕺🏾',
  '🕺🏿',
  '👑',
  '💎',
  '🌺',
  '🌻',
  '🌼',
  '🥐',
  '🍦',
  '🍩',
  '🍰',
  '🍫',
  '🍭',
  '🍯',
  '🍾',
  '🍷',
  '🍸',
  '🍺',
  '🎷',
  '🔫',
]
const emojisLose = [
  '💀',
  '💩',
  '👀',
  '🍅',
  '🍑',
  '🤦',
  '🤦‍♂‍',
  '🤦‍♀‍',
  '🤷',
  '🤷‍♂‍',
  '🤷‍♀‍',
  '🚶',
  '🚶‍♂‍',
  '🚶‍♀‍',
  '🐣',
  '🧄',
  '🧅',
  '🩹',
  '🧻',
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
}
makeAWord()

let secretWord2 = [...secretWord]
console.log(secretWord)

keyboard.addEventListener('click', function (e) {
  let cell = document.querySelector(`.cell${i}`)
  if (
    e.target.classList.contains('lit') &&
    e.target.textContent != '⌫' &&
    e.target.textContent != '↵'
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
  if (e.target.textContent === '⌫') {
    i === 1 || i--
    cell = document.querySelector(`.cell${i}`)
    userWord.pop()
    cell.textContent = ''
  }
  if (e.target.textContent === '↵' && userWord.length === 5) {
    let b = i
    let startCell = b - 5
    let activeCells = []
    let guess = userWord.join('')
    for (let c = 0; c < color.length; c++) {
      span[c].classList.remove(`cell-span${color[c]}`)
    }

    if (guess === secretWord) {
      heading.innerHTML = `Победа! ${randomEmoji(emojisWin)}`
      againButton.classList.remove('hidden')
      keyboard.classList.toggle('hidden')
    }

    triesCount++
    if (triesCount === 5) {
      heading.innerHTML = `Не угадали ${randomEmoji(emojisLose)}`
      againButton.classList.remove('hidden')
      keyboard.classList.toggle('hidden')
    }

    for (let j = 0; j < 5; j++) {
      activeCells.push(startCell + j)
    }

    for (let j = 0; j < 5; j++) {
      if (secretWord2.includes(userWord[j]) && secretWord2[j] != userWord[j]) {
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
  }
})

night.addEventListener('click', function (e) {
  let icons = ['<h1>🌕</h1>', '<h1>🌘</h1>']
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
    if (cell.classList.contains('terms-cell') == false) {
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
  heading.innerHTML = `Во<span class="header-span">р</span><span class="header-span">д</span
  ><span class="header-span">л</span>и`
  makeAWord()
  secretWord2 = [...secretWord]
  keyboard.classList.toggle('hidden')
  this.classList.toggle('hidden')
})
