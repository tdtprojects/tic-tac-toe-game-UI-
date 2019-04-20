import React from 'react';
import {
  fill,
  range,
  delay,
  isEmpty,
} from 'lodash';

import GameBoard from './GameBoard';
import { calculateWinner } from './GameBoard/utils';
import Cell from './GameBoard/Cell';
import InfoBlock from './InfoBlock';

import './index.scss';

class Game extends React.Component {
  state = {
    xIsNext: true,
    cells: fill(Array(9), null),
    winnerLine: [],
    isDraw: false,
    gameScore: {
      xWins: 0,
      oWins: 0,
      draws: 0,
    },
  };

  handleCellClick = index => () => {
    const { cells, winnerLine } = this.state;

    if (cells[index] || !isEmpty(winnerLine)) {
      return;
    }

    this.setState((state) => {
      const { cells: currentCells, xIsNext } = state;
      const updatedCells = [...currentCells];

      updatedCells[index] = xIsNext ? 'X' : 'O';

      return {
        cells: updatedCells,
      };
    }, this.checkWinner);
  };

  checkWinner() {
    const { cells } = this.state;

    const winner = calculateWinner(cells);
    const isDraw = cells.every(line => !!line);

    if (winner) {
      this.handleWinner(winner);
    } else if (isDraw) {
      this.handleDraw();
    } else {
      this.setState(({ xIsNext }) => ({
        xIsNext: !xIsNext,
      }));
    }
  }

  handleWinner({ winner, line }) {
    this.setState(({ gameScore: { xWins, oWins, draws } }) => ({
      winnerLine: line,
      gameScore: {
        xWins: winner === 'X' ? xWins + 1 : xWins,
        oWins: winner === 'O' ? oWins + 1 : oWins,
        draws,
      },
    }));

    delay(() => {
      this.setState(({ xIsNext }) => ({
        xIsNext: !xIsNext,
        cells: fill(Array(9), null),
        winnerLine: [],
      }));
    }, 2500);
  }

  handleDraw() {
    this.setState(({ gameScore }) => ({
      isDraw: true,
      gameScore: {
        ...gameScore,
        draws: gameScore.draws + 1,
      },
    }));

    delay(() => {
      this.setState(({ xIsNext }) => ({
        xIsNext: !xIsNext,
        cells: fill(Array(9), null),
        isDraw: false,
      }));
    }, 2500);
  }

  render() {
    const {
      cells,
      winnerLine,
      isDraw,
      gameScore,
      xIsNext,
    } = this.state;

    return (
      <div className="game">
        <div className="game__main-block">
          <GameBoard>
            {(range(9).map(index => (
              <Cell
                key={index}
                index={index}
                value={cells[index]}
                onClick={this.handleCellClick(index)}
                isWinnerShown={winnerLine.includes(index)}
                isDrawShown={isDraw}
              />
            )))}
          </GameBoard>
          <InfoBlock
            gameScore={gameScore}
            xIsNext={xIsNext}
            isDraw={isDraw}
          />
        </div>
      </div>
    );
  }
}

export default Game;
