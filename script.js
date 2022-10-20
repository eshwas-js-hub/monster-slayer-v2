const playerHealthIndicator1 = document.querySelector('#health_indicator-player-1');
const playerHealthIndicator2 = document.querySelector('#health_indicator-player-2');
// Reference to health indicator count
const player1HealthIndicatorCount = document.querySelector('.health_indicator-player-1-count');
const player2HealthIndicatorCount = document.querySelector('.health_indicator-player-2-count');
// Pointer to game controls
const gameStartBtn = document.querySelector('#game_control-start');
const gameAttackBtn = document.querySelector('#game_control-attack');
const gameResetBtn = document.querySelector('#game_control-reset');
// Pointer to score board 
const firstPlayerScore = document.querySelector('.score_player-1');
const secondPlayerScore = document.querySelector('.score_player-2');
const matchDrawn = document.querySelector('.matchDraw');
// Pointer to alert message
const alertBoxDisplay = document.querySelector('#alert');
const alertMsg = document.querySelector('.alert-message');


const RANDOM_POWER_VALUE = 5;

let playersMaxLife = 100;
let currentplayer1Life = playersMaxLife;
let currentplayer2Life = playersMaxLife;

let firstPlayerTotalWin = 0;
let secondPlayerTotalWin = 0;
let matchTied = 0;

let alertMessage;

let rounds = 1;

let bestOf = parseInt(prompt('Enter the best of Matches'));

function displayAlertBox(){
    alertMessage = `Round 1`
    alertMsg.innerText = alertMessage;
    gameAttackBtn.disabled = false;
    gameResetBtn.disabled = false;

    if( gameAttackBtn.disabled == false || gameResetBtn.disabled == false ){
      gameStartBtn.classList.remove('game_control-start')
    }
}

  function displayWinAlert(message){
      alertMsg.innerText = message;
  }

  function  displayWinSeriesAlert(message){
    alertMsg.innerText = message;
    
    
    setTimeout(() => {
      alertMsg.innerText = 'New Match: Round 1';
    },2000);

    setTimeout(() => {
    bestOf = parseInt(prompt('Enter the best of Matches'));
    },5000);

  }

  // Adjust Health Bar to Maximum
  function adjustHealthBars(maxLife) {
    playerHealthIndicator1.max = maxLife;
    playerHealthIndicator1.value = maxLife;
    playerHealthIndicator2.max = maxLife;
    playerHealthIndicator2.value = maxLife;
  }

  function Player1Damage(damage) {
    const damageCount = Math.random() * damage;
    playerHealthIndicator1.value = +playerHealthIndicator1.value - damageCount;
    return damageCount;
  }

  function Player2Damage(damage) {
    const damageCount = Math.random() * damage;
    playerHealthIndicator2.value = +playerHealthIndicator2.value - damageCount;
    return damageCount;
  }

  function resetGame(value) {
    playerHealthIndicator1.value = value;
    playerHealthIndicator2.value = value;
  }

  function reset(){
    currentplayer1Life = playersMaxLife;
    currentplayer2Life = playersMaxLife;
    resetGame(playersMaxLife);
    player1HealthIndicatorCount.innerText = 100;
    player2HealthIndicatorCount.innerText = 100;
  }

  function resetScoreCard(){
    secondPlayerScore.innerText = 0;
    firstPlayerScore.innerText = 0;
    matchDrawn.innerText = 0;
    firstPlayerTotalWin = 0;
    secondPlayerTotalWin = 0;
    matchTied = 0;
    rounds = 1;
  }


function attackLogicHandler(){

      if(currentplayer1Life <= 0 && currentplayer2Life > 0){ 
        rounds++;
        displayWinAlert(`Player 2 is the Winner. Now Round ${rounds}`);
        reset();
        secondPlayerTotalWin += 1;
        secondPlayerScore.innerText = secondPlayerTotalWin;
      } else if ( currentplayer2Life <= 0 && currentplayer1Life > 0){
        rounds++;
        displayWinAlert(`Player 1 is the winner. Now Round ${rounds}`);
        reset();
        firstPlayerTotalWin += 1;
        firstPlayerScore.innerText = firstPlayerTotalWin;
      } else if ( currentplayer1Life <= 0 && currentplayer2Life <=0 ){
        rounds++;
        displayWinAlert(`The Match is Tied. Now Round ${rounds}`);
        reset();
        matchTied += 1;
        matchDrawn.innerText = matchTied;
      }

      // Logic to Display the winner of the series
      if(firstPlayerTotalWin === bestOf){
        displayWinAlert(`Player 1 is the winner!`);
        setTimeout(() => {
            displayWinSeriesAlert('Player 1 Won the series');
        },2000);
        resetScoreCard();
      } else if (secondPlayerTotalWin === bestOf ){
        displayWinAlert(`Player 2 is the winner!`);
        setTimeout(() => {
            displayWinSeriesAlert('Player 2 Won the series');
        },2000);
        resetScoreCard();
      }

}

    //Attack Handler function 
    function attackHandler(){
        
        // let i = 0;
        // do{
          const player1Damage = Player1Damage(RANDOM_POWER_VALUE);
          currentplayer1Life -= player1Damage;
          player1HealthIndicatorCount.innerText = Math.round(currentplayer1Life);
        
          const player2Damage = Player2Damage(RANDOM_POWER_VALUE);
          currentplayer2Life -= player2Damage;
          player2HealthIndicatorCount.innerText = Math.round(currentplayer2Life);
  
          attackLogicHandler();
          // i++;
        // } while(i < inputMatchesToBePlayed );
      
    }


    gameStartBtn.addEventListener('click', displayAlertBox);
    adjustHealthBars(playersMaxLife);

    // Do not execute the attack and reset until the button is enabled
    if(gameAttackBtn.disabled === true || gameResetBtn.disabled === true ){
      gameAttackBtn.addEventListener('click', attackHandler);
      gameResetBtn.addEventListener('click', reset);
    }

    enterMatchDetails();

