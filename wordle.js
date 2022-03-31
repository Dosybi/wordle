var secretWord = ''
var secretWordArray = []
var tries = 0
userWord = ''
var rows = 0
var scored = 0


var fiveLetterWords = require('./words')
getAllWords() = require('./words')

function getRandomWord(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}

function makeAWord() {
  getAllWords()
  secretWord = getRandomWord(fiveLetterWords)
  console.log(secretWord)
}

function getTheWord() {
  secretWordArray = secretWord.split('')
  console.log(secretWordArray)
  document.getElementById('hint').textContent = ''
  userWordPre = document.getElementById('userWordGuess').value
  userWord = userWordPre.toLowerCase()
  document.getElementById('descriptionBox').className = 'description2'

  document.getElementById('userWordGuess').value = ''
  let userWordArray = userWord.split('')

  function userWordModification() {
    if (userWordArray.length > 0) {
      let usLen = userWordArray.length
      let text = ''
      for (let i = 0; i < usLen; i++) {
        text += '<span>' + userWordArray[i] + ' </span>'
      }
    }
  }

  function userWordLengthCheck() {
    if (tries < 5 && userWordArray.length < 5) {
      document.getElementById('hint').innerHTML = 'Слишком короткое слово'
      document.getElementById('userWordOnScreen' + tries).innerHTML = ''
      stopAll()
    } else if (tries < 5 && userWordArray.length > 5) {
      document.getElementById('hint').innerHTML = 'Слишком длинное слово'
      document.getElementById('userWordOnScreen' + tries).innerHTML = ''
      stopAll()
    } else if (tries < 5 && userWordArray.length == 5 && fiveLetterWords.includes(userWord) == false) {
      document.getElementById('hint').innerHTML = 'Такого слова нет в словаре'
      document.getElementById('userWordOnScreen' + tries).innerHTML = ''
      stopAll()
    } else if (tries >= 5) {
      colorElements()
      triesAndResult()
    }
  }
  
  function colorElements() {
    var keyboardArr = []
    for (var i = 1; i <= 32; i++) {
      var lit = document.getElementById('lit' + i).textContent
      keyboardArr.push(lit)
    }
    let text = []
    if (userWordArray.length == 5) {
      for (let i = 0; i < userWordArray.length; i++) {
        if (userWordArray[i] == secretWordArray[i]) {
          text.push(
            '<span class="letterGuessed">' + userWordArray[i] + '</span>'
          )
          indexlit = keyboardArr.indexOf(userWordArray[i])
          document.getElementById('lit' + (indexlit + 1)).style = 'background-color: #76ce29'
        } else if (
          secretWordArray.includes(userWordArray[i]) &&
          userWordArray[i] !== secretWordArray[i]
        ) {
          text.push(
            '<span class="letterAlmost">' + userWordArray[i] + '</span>'
          )
          indexlit = keyboardArr.indexOf(userWordArray[i])
          document.getElementById('lit' + (indexlit + 1)).style = 'background-color: yellow'
        } else if (secretWordArray.includes(userWordArray[i]) == false) {
          text.push('<span class="letterNo">' + userWordArray[i] + '</span>')
          indexlit = keyboardArr.indexOf(userWordArray[i])
          document.getElementById('lit' + (indexlit + 1)).style = 'background-color: #c3c3c3'
        }
      }
      // document.getElementById('hint').innerHTML = ''
      document.getElementById('userWordOnScreen' + rows).innerHTML =
        text.join(' ')
    }
    rows += 1
  }

  function triesAndResult() {
    var link = 'https://ru.wiktionary.org/wiki/' + secretWord
    tries += 1
    var triesCount = 5 - tries
    document.getElementById('numberOfTries').textContent = triesCount

    if (triesCount == 4 || triesCount == 3 || triesCount == 2) {
      document.getElementById('triesEnd').textContent = 'ки'
    } else if (triesCount == 1) {
      document.getElementById('triesEnd').textContent = 'ка'
      document.getElementById('triesStart').textContent = 'ась '
    }

    if (tries >= 5 && userWord !== secretWord) {
      // document.getElementById('button').disabled = true
      document.getElementById('hint').textContent = 'Вы потратили все попытки'
      document.getElementById('tries').textContent = 'Загаданное слово — ' + '«' + secretWord + '»'
    } else if (userWord == secretWord) {
      document.getElementById('hint').textContent = ''
      // document.getElementById('button').disabled = true
      document.getElementById('hint').textContent = 'Победа!'
      document.getElementById('tries').textContent = ' '
    }
  }

  // function score () {
  //   let ww = ''
  //   if (userWord == secretWord && tries == 1) {
  //     scored += 5
  //     ww = ' очков'
  //     document.getElementById('tries').textContent = 'Вы набрали ' + scored + ww
  //   } else if (userWord == secretWord && tries == 2) {
  //     scored += 4
  //     ww = ' очка'
  //     document.getElementById('tries').textContent = 'Вы набрали ' + scored + ww
  //   } else if (userWord == secretWord && tries == 3) {
  //     scored += 3
  //     ww = ' очка'
  //     document.getElementById('tries').textContent = 'Вы набрали ' + scored + ww
  //   } else if (userWord == secretWord && tries == 4) {
  //     scored += 2
  //     ww = ' очка'
  //     document.getElementById('tries').textContent = 'Вы набрали ' + scored + ww
  //   } else if (userWord == secretWord && tries == 5) {
  //     scored += 1
  //     ww = ' очко'
  //     document.getElementById('tries').textContent = 'Вы набрали ' + scored + ww
  //   }
  // }

  triesAndResult()
  userWordModification()
  userWordLengthCheck()
  colorElements()
}
