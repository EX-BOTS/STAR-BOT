class Minesweeper {
  constructor(rows, cols, mines) {
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.board = this.initializeBoard();
    this.revealed = this.initializeRevealed();
    this.placeMines();
    this.calculateNumbers();
    this.gameOver = false;
  }

  initializeBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  initializeRevealed() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
  }

  placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (this.board[row][col] !== 'M') {
        this.board[row][col] = 'M';
        minesPlaced++;
      }
    }
  }

  calculateNumbers() {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], /*M*/  [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col] === 'M') continue;
        let mineCount = 0;
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
            if (this.board[newRow][newCol] === 'M') mineCount++;
          }
        });
        this.board[row][col] = mineCount;
      }
    }
  }

  reveal(row, col) {
    if (
      isNaN(row) || isNaN(col) ||
      row < 0 || row >= this.rows ||
      col < 0 || col >= this.cols ||
      this.revealed[row][col] ||
      this.gameOver
    ) {
      return 'Invalid move or game over.';
    }
    this.revealed[row][col] = true;
    if (this.board[row][col] === 'M') {
      this.gameOver = true;
      this.revealAll();
      return 'You hit a mine! Game over.';
    }
    if (this.board[row][col] === 0) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /*M*/  [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols && !this.revealed[newRow][newCol]) {
          this.reveal(newRow, newCol);
        }
      });
    }
    return 'Keep going Star🤩!';
  }

  revealAll() {
    this.revealed = this.revealed.map(row => row.map(() => true));
  }

  display() {
    const emojis = ['⬛', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    const columnEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    let displayBoard = '  ';
    for (let i = 0; i < this.cols; i++) {
      displayBoard += columnEmojis[i + 1] + ' ';
    }
    displayBoard += '\n';
    for (let row = 0; row < this.rows; row++) {
      displayBoard += columnEmojis[row + 1] + ' ';
      for (let col = 0; col < this.cols; col++) {
        if (this.revealed[row][col]) {
          displayBoard += this.board[row][col] === 'M' ? '💣 ' : emojis[this.board[row][col]] + ' ';
        } else {
          displayBoard += '⬜️ ';
        }
      }
      displayBoard += '\n';
    }
    return displayBoard;
  }
}

// Test Minesweeper class
const game = new Minesweeper(8, 8, 10);
console.log(game.display());
console.log(game.reveal(0, 0)); // Change coordinates as needed for testing
console.log(game.display());