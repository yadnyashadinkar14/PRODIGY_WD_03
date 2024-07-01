let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let twoPlayerMode = true; // Starts in two-player mode

function makeMove(index) {
  if (!gameOver && board[index] === "") {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerHTML = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
    if (!twoPlayerMode && currentPlayer === "O" && !gameOver) {
      // AI's turn (you can implement AI logic here)
      setTimeout(makeAIMove, 500);
    }
  }
}

function toggleGameMode() {
  twoPlayerMode = !twoPlayerMode; // Toggle the game mode
  const modeButton = document.getElementById("modeButton");
  modeButton.innerText = twoPlayerMode ? "Two Players" : "Player vs. AI";
  resetBoard(); // Reset the board when switching modes
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6] // Diagonals
  ];

  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById("winner").innerHTML = `Player ${board[a]} wins!`;
      gameOver = true;
      setTimeout(resetBoard, 1500); // Reset the game after 1.5 seconds
      return;
    }
  }

  if (!board.includes("") && !gameOver) {
    document.getElementById("winner").innerHTML = "It's a tie!";
    gameOver = true;
    setTimeout(resetBoard, 1500); // Reset the game after 1.5 seconds
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  document.getElementById("winner").innerHTML = "";
  const cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    cell.innerHTML = "";
  }
}

function makeAIMove() {
  let bestMove;

  // Check if AI can win on the next move
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      if (checkWinner(board, "O")) {
        bestMove = i;
        board[i] = ""; // Reset the board state
        break;
      }
      board[i] = ""; // Reset the board state
    }
  }

  // If AI can't win immediately, choose a random empty cell
  if (bestMove === undefined) {
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        emptyCells.push(i);
      }
    }
    if (emptyCells.length > 0) {
      bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
  }

  // Make the best move
  makeMove(bestMove);
}
