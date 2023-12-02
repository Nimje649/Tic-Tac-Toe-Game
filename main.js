const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartbtn = document.querySelector('#restart');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

init();

function init() {
  cells.forEach((cell) => cell.addEventListener('click', cellclicked));
  restartbtn.addEventListener('click', restart1);
  message.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function cellclicked() {
  const cellIndex = this.getAttribute('cellIndex');

  if (options[cellIndex] != '' || !running) {
    return;
  }

  updatecell(this, cellIndex);
  checkwinner();
}
function updatecell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changeplayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  message.textContent = `${currentPlayer}'s turn`;
}
function checkwinner() {
  let round = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    //console.log(cellA);
    //console.log(cellB);
    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      round = true;
      break;
    }
  }
  if (round) {
    message.textContent = `${currentPlayer} has won!`;
    running = false;
  } else if (!options.includes('')) {
    message.textContent = `Draw!`;
    running = false;
  } else {
    changeplayer();
  }
}
function restart1() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  message.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
}
