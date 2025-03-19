//word list
const wordList = [
    'gold',
    'luck',
    'clover',
    'rain',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'tradition'
]

//declare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = ''
let guessedLetters = []
const maxMistakes = 6


//start game function (runs everything)
function startGame(level){
    //reset game
    wrongGuesses = 0
    guessedLetters = []
    //function to get random word
    selectedWord = getRandomWord(level)

    updateDifficultyDisplay(level)

    //show game area/difficulty display, hide selection buttons
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')
  
    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')
  
    document.getElementById('difficultySelection').classList.add('d-none')
}

//function for getting random word 
function getRandomWord(level) {
//filter condition triggers the word list array and picks only words with length less than 4 for easy
    let filteredWords = wordList.filter ( word=> {
        if (level === 'easy') return word.length <=4
        if (level === 'medium') return word.length >=5 &&word.length <=7
        if (level === 'hard') return word.length >=8
    })

    return filteredWords[Math.floor(Math.random() *filteredWords.length)]
}


//update difficulty display
function updateDifficultyDisplay (level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')
  
//add the difficulty level in the text box 
if (level === 'easy') {
    difficultyBox.textContent = 'Difficulty: Easy 🍀'
    difficultyBox.classList.add('easy')
  } else if (level === 'medium') {
    difficultyBox.textContent = 'Difficulty: Medium 🌟'
    difficultyBox.classList.add('medium')
  } else if (level === 'hard') {
    difficultyBox.textContent = 'Difficulty: Hard 💀'
    difficultyBox.classList.add('hard')
  }
}

