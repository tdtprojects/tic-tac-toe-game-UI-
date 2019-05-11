export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};

const maxPlayer = 'X';
const minPlayer = 'O';

const tie = board => board.filter(cell => !!cell).length === 9;

function copyBoard(board) {
  return board.slice(0);
}

function validMove(move, player, board) {
  const newBoard = copyBoard(board);

  if (newBoard[move] === null) {
    newBoard[move] = player;

    return newBoard;
  }

  return null;
}

function minScore(board) {
  const winner = calculateWinner(board);

  if (winner && winner.winner === 'X') {
    return 10;
  }

  if (winner && winner.winner === 'O') {
    return -10;
  }

  if (tie(board)) {
    return 0;
  }

  let bestMoveValue = 100;

  for (let i = 0; i < board.length; i += 1) {
    const newBoard = validMove(i, minPlayer, board);

    if (newBoard) {
      /* eslint-disable-next-line no-use-before-define */
      const predictedMoveValue = maxScore(newBoard);

      if (predictedMoveValue < bestMoveValue) {
        bestMoveValue = predictedMoveValue;
      }
    }
  }

  return bestMoveValue;
}

function maxScore(board) {
  const winner = calculateWinner(board);

  if (winner && winner.winner === 'X') {
    return 10;
  }

  if (winner && winner.winner === 'O') {
    return -10;
  }

  if (tie(board)) {
    return 0;
  }

  let bestMoveValue = -100;

  for (let i = 0; i < board.length; i += 1) {
    const newBoard = validMove(i, maxPlayer, board);

    if (newBoard) {
      const predictedMoveValue = minScore(newBoard);

      if (predictedMoveValue > bestMoveValue) {
        bestMoveValue = predictedMoveValue;
      }
    }
  }

  return bestMoveValue;
}

export const findAiMove = (board) => {
  let bestMoveScore = 100;
  let move = null;

  if (calculateWinner(board) || tie(board)) {
    return null;
  }

  for (let i = 0; i < board.length; i += 1) {
    const newBoard = validMove(i, minPlayer, board);

    if (newBoard) {
      const moveScore = maxScore(newBoard);

      if (moveScore < bestMoveScore) {
        bestMoveScore = moveScore;
        move = i;
      }
    }
  }

  return move;
};
