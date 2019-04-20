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

import './index.scss';

class Game extends React.Component {
  state = {
    /* eslint-disable react/no-unused-state */
    xIsNext: true,
    cells: fill(Array(9), null),
    winnerLine: [],
    isDraw: false,
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
        xIsNext: !xIsNext,
      };
    }, this.checkWinner);
  };

  checkWinner() {
    const { cells } = this.state;

    const winner = calculateWinner(cells);
    const isDraw = cells.every(line => !!line);

    if (winner) {
      this.handleWinner(winner.line);
    } else if (isDraw) {
      this.handleDraw();
    }
  }

  handleWinner(winnerLine) {
    this.setState({
      winnerLine,
    });

    delay(() => {
      this.setState({
        xIsNext: true,
        cells: fill(Array(9), null),
        winnerLine: [],
      });
    }, 2500);
  }

  handleDraw() {
    this.setState({
      isDraw: true,
    });

    delay(() => {
      this.setState({
        xIsNext: true,
        cells: fill(Array(9), null),
        isDraw: false,
      });
    }, 2500);
  }

  render() {
    const { cells, winnerLine, isDraw } = this.state;

    return (
      <div className="game">
        <div className="game__board-wrapper">
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
        </div>
      </div>
    );
  }
}

export default Game;
