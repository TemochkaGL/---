const canvas = document.getElementById("canva");
const winner = document.getElementById("winner");
canvas.setAttribute("width", (document.documentElement.clientHeight - 50))
canvas.setAttribute("height", (document.documentElement.clientHeight - 50))

const ctx = canva.getContext("2d");

let board = [['', '', ''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';
let bool = false;
winner.textContent = "Идёт игра...";


function drawLines() {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.clientWidth / 3, 0);
  ctx.lineTo(canvas.clientWidth / 3, canvas.clientHeight);
  ctx.moveTo(2 * canvas.clientWidth / 3, 0);
  ctx.lineTo(2 * canvas.clientWidth / 3, canvas.clientHeight);
  ctx.moveTo(0, canvas.clientHeight / 3);
  ctx.lineTo(canvas.clientWidth, canvas.clientHeight / 3);
  ctx.moveTo(0, 2 * canvas.clientHeight / 3);
  ctx.lineTo(canvas.clientWidth, 2 * canvas.clientHeight / 3);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "";
}


function drawSymbol(row, col, player) {
  const centerX = col * (canvas.clientWidth / 3) + (canvas.clientWidth / 6);
  const centerY = row * (canvas.clientHeight / 3) + (canvas.clientHeight / 6);
  const radius = 80;

  ctx.beginPath();
  ctx.lineWidth = 5;
  if (player === 'X') {
    ctx.strokeStyle = "darkslateblue";
    ctx.moveTo(centerX - radius, centerY - radius);
    ctx.lineTo(centerX + radius, centerY + radius);
    ctx.moveTo(centerX + radius, centerY - radius);
    ctx.lineTo(centerX - radius, centerY + radius);
  } else {
    ctx.strokeStyle = "red";
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  }

  ctx.stroke();
}


function switchPlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  }
  else {
    currentPlayer = "X";
  }
}

function resetGame() {
  board = [['', '', ''], ['', '', ''], ['', '', '']];
  currentPlayer = 'X';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines();
}

function checkWin() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] != '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  }

  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }

  return false;
}

canvas.addEventListener('click', function (event) {
  if (!bool) {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;

    const row = Math.floor(y / (canvas.clientHeight / 3));
    const col = Math.floor(x / (canvas.clientWidth / 3));
    if (board[row][col] == '') {
      board[row][col] = currentPlayer;
      drawSymbol(row, col, currentPlayer);
      if (checkWin()) {
        winner.textContent = (currentPlayer === 'X' ? 'Игрок на Х победил!' + "\n\r Для новой игры - нажмите" : 'Игрок на О победил!' + '\n\r Для новой игры - нажмите');
        bool = true;
        return 1;
      }
      switchPlayer();
    }
  }
  else{
    resetGame();
    winner.textContent = "Идёт игра...";
    bool = false;
  }

});

drawLines();