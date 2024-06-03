// Define the Minesweeper class
class Minesweeper {
  constructor(rows, cols, mines) {
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.board = this.initializeBoard();
    this.revealed = this.initializeRevealed();
    this.placeMines();
    this.calculateNumbers();
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
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || this.revealed[row][col]) return;
    this.revealed[row][col] = true;
    if (this.board[row][col] === 0) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /*M*/  [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      directions.forEach(([dx, dy]) => {
        this.reveal(row + dx, col + dy);
      });
    }
  }

  display() {
    const emojis = ['⬛', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    const lines = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    return lines.map((_, rowIndex) => 
      this.board[rowIndex].map((cell, colIndex) => 
        this.revealed[rowIndex][colIndex] ? emojis[cell] : '⬜️').join('')
    ).join('\n');
  }
}

// Integrate Minesweeper with the bot
const handler = async (m, { conn, command, text }) => {
  if (!global.minesweeper) {
    global.minesweeper = new Minesweeper(8, 8, 10); // Create a new game with 8x8 board and 10 mines
  }

  if (command === 'start') {
    conn.reply(m.chat, 'Minesweeper game started!\n\n' + global.minesweeper.display(), m);
  } else if (command.startsWith('reveal')) {
    const [_, row, col] = command.split(' ');
    global.minesweeper.reveal(parseInt(row), parseInt(col));
    conn.reply(m.chat, global.minesweeper.display(), m);
  }
};

handler.help = ['start', 'reveal <row> <col>'];
handler.tags = ['game'];
handler.command = ['start', 'reveal'];
handler.rowner = true;

export default handler;