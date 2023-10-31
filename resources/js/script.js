let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const boardElement = document.getElementById("board");
const msgElement = document.getElementById("msg");
let msg = "&nbsp;";

function renderBoard() {
  boardElement.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.textContent = board[i]; // Set the text content from the board state
    cell.addEventListener("click", handleCellClick);
    boardElement.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (board[index] === "") {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      //   alert(currentPlayer + " wins!");
      msg = `${currentPlayer} + " wins!"`;
      resetBoard();
    } else if (board.every((cell) => cell !== "")) {
      //   alert("It's a draw!");
      msg = `It's a draw!`;
      resetBoard();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      msg = "&nbsp;";
    }
  }
  msgElement.innerHTML = msg;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function resetBoard() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  msgElement.innerHTML = "&nbsp;";
  renderBoard();
}

renderBoard();
