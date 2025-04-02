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
    displayedWord = '_'.repeat(selectedWord.length)

    updateDifficultyDisplay(level)
    updateUI()

    //show game area/difficulty display, hide selection buttons
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')
  
    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')
  
    document.getElementById('difficultySelection').classList.add('d-none')


    document.getElementById('letterInput').focus()
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
  
//adds the difficulty level in the text box 
if (level === 'easy') {
    difficultyBox.textContent = 'Difficulty: Easy'
    difficultyBox.classList.add('easy')
  } else if (level === 'medium') {
    difficultyBox.textContent = 'Difficulty: Medium'
    difficultyBox.classList.add('medium')
  } else if (level === 'hard') {
    difficultyBox.textContent = 'Difficulty: Hard'
    difficultyBox.classList.add('hard')
  }
}


//show word with spaces between
function updateUI() {
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')// adds space in between letters and splits the word up 

  document.getElementById('letterInput').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        guessLetter(); //adds event listener to see if enter is rpessed 
    }
});

}


function guessLetter () {
  
  let inputField = document.getElementById('letterInput')//get input field
  let guessedLetter = inputField.value.toLowerCase()// change letters to lowercase 

  //check and see if the value is input
  if (!guessedLetter.match(/^[a-z]$/)){
    alert('Please enter a valid letter.')//alert user if the input is valid
    inputField.value = ''
    return //exit function
  }

//check if letter was already guessed
if(guessedLetters.includes(guessedLetter)){
  alert(`You already guessed ${guessLetter}. Try a different letter.`)
  inputField.value = ''//clear input
  return
}

  //store guessed letter
guessedLetters.push(guessLetter)

//check if the letter is in the word
if (selectedWord.includes(guessLetter)){
  updateCorrectGuess(guessedLetter)
} else {
  updateWrongGuess(guessedLetter)
}

inputField.value = ''//clear input field
document.getElementById('letterInput').focus() //refocus 
}

function updateWrongGuess(guessedLetter){ 
  wrongGuesses++
  document.getElementById('wrongLetters').textContent += `${guessedLetter}`
  //document.getElementById('shamrock').src = `imgs/shamrock${6-wrongGuesses}.jpg`

  if (wrongGuesses === maxMistakes){
    endGame(false)
  }
}



function updateCorrectGuess(guessedLetter){
  let newDisplayedWord =''

  for (let i=0; i < selectedWord.length; i++){
    if (selectedWord[i] === guessedLetter){
    newDisplayedWord += guessedLetter // Replace underscore with correct letter
    }else{
    newDisplayedWord += displayedWord[i] // Keep existing correct letters
    }
  }

  displayedWord = newDisplayedWord
  updateUI()

  
  //  Check if the player has guessed all letters
  if (!displayedWord.includes('_')) {
    endGame(true)
  }

}

//popup for if player wins or loses game
function endGame(won){
  if (won){
    document.getElementById('popUpWon').classList.remove('d-none')
  } else {
    document.getElementById('popUpLost').classList.remove('d-none')
  }
  
}


function restartGame() {
  //reset every variable to 0
  wrongGuesses = 0;
  guessedLetters = [];
  selectedWord = "";
  displayedWord = "";
  
  //resets all elements to play game 
    document.getElementById('wordDisplay').textContent = '';
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses';
    document.getElementById('letterInput').value = '';

    //hides game area with difficulty box and displays the selection again 
    document.getElementById('gameArea').classList.add('d-none');
    document.getElementById('difficultyBox').classList.add('d-none');
    document.getElementById('difficultySelection').classList.remove('d-none');

    //hides popups 
    document.getElementById('popUpWon').classList.add('d-none');
    document.getElementById('popUpLost').classList.add('d-none');
}




