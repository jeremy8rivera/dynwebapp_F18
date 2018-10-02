//global variables

//hangman object
var hangedMan = {
  safeWord: "",
  lives: 8,
}

hangedMan.loseLife = function(){
  this.lives -= 1;
}

var player = {
  name: "",
  guessedChars: [],
  knownChars: []
}

//arrays to be used
var wordPool = ["wheelbarrow", "magnet", "sprinkler", "sailboat", "guitar", "lightsaber", "fallout", "hippo", "bethesda", "butcher", "cow", "closed", "neon", "hydrogen", "methane", "sign", "safe", "combination"];

//functions
function randomWordChooser(){
  let randomPos = Math.floor(Math.random()*wordPool.length);
  return wordPool[randomPos];
}

function generatePlayerKnown(){
  for(let i = 0; i < hangedMan.safeWord.length; i++){
    player.knownChars.push('_ ');
  }
}

function compareCharacters(charGuess){
  if(player.guessedChars.indexOf(charGuess) != -1){ 
    alert("You've already guessed this! Words Guessed: " + player.guessedChars); 
    return;
  }

  player.guessedChars.push(charGuess);
  for(let i = 0; i < hangedMan.safeWord.length; i++){
    if(charGuess === hangedMan.safeWord[i]){ player.knownChars[i] = charGuess; };
  }
  if(player.knownChars.indexOf(charGuess) == -1){
    hangedMan.loseLife(); 
    alert("OOF(sfx). " + hangedMan.lives + " attempts left! Letters Guessed: " + player.guessedChars);
    return;
    }
}

function checkWin(){
  for(let i = 0; i < hangedMan.safeWord.length; i++){
    if(hangedMan.safeWord[i] != player.knownChars[i]) {return false;}
  }

  return true;
}

function main(){
  hangedMan.safeWord = randomWordChooser();
  generatePlayerKnown();
  player.name = prompt("Who is the savior (hopefully)?", "Name");

  while(hangedMan.lives > 0){
    let charGuess = prompt("Guess a character! Word so far: " + player.knownChars.join('')).toLowerCase();
    compareCharacters(charGuess);

    if(checkWin() == true){ alert("You saved them, " + player.name + "! The word was: " + hangedMan.safeWord); return; };
  }

  if(hangedMan.lives === 0){
    alert("How could you leave him hanging " + player.name + "? The word was: " + hangedMan.safeWord);
  }

}

main();