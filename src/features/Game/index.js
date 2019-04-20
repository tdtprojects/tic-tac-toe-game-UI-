import React from 'react';
import {
  fill,
  range,
  delay,
  isEmpty,
} from 'lodash';

import GameBoard from './GameBoard';
import { calculateWinner, findAiMove } from './utils';
import Cell from './GameBoard/Cell';
import InfoBlock from './InfoBlock';

import './index.scss';

/* eslint-disable react/no-unused-state */
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
    isOnePlayerMode: false,
    isXGoesFirst: true,
  };

  toggleGameMode = () => {
    clearTimeout(this.timerId);

    this.setState(({ isOnePlayerMode }) => ({
      isOnePlayerMode: !isOnePlayerMode,
      xIsNext: true,
      cells: fill(Array(9), null),
      winnerLine: [],
      isXGoesFirst: true,
      gameScore: {
        xWins: 0,
        oWins: 0,
        draws: 0,
      },
    }));
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

  checkWinner(AImoved) {
    const { cells } = this.state;

    const winner = calculateWinner(cells);
    const isDraw = cells.every(line => !!line);

    if (winner) {
      this.handleWinner(winner);
    } else if (isDraw) {
      this.handleDraw();
    } else {
      this.setState(({ xIsNext }) => ({
        xIsNext: AImoved ? xIsNext : !xIsNext,
      }), this.isAiShouldMove);
    }
  }

  aiMove() {
    this.setState(({ cells }) => {
      const updatedCells = [...cells];
      updatedCells[findAiMove(cells)] = 'O';

      return {
        cells: updatedCells,
        xIsNext: true,
      };
    }, () => this.checkWinner(true));
  }

  isAiShouldMove() {
    const { isOnePlayerMode, xIsNext } = this.state;

    if (isOnePlayerMode && !xIsNext) {
      this.aiMove();
    }
  }

  handleWinner({ winner, line }) {
    this.setState({
      winnerLine: line,
    });

    this.timerId = delay(() => {
      this.setState(({ isXGoesFirst, gameScore: { xWins, oWins, draws } }) => ({
        xIsNext: !isXGoesFirst,
        cells: fill(Array(9), null),
        winnerLine: [],
        isXGoesFirst: !isXGoesFirst,
        gameScore: {
          xWins: winner === 'X' ? xWins + 1 : xWins,
          oWins: winner === 'O' ? oWins + 1 : oWins,
          draws,
        },
      }), this.isAiShouldMove);
    }, 2500);
  }

  handleDraw() {
    this.setState({
      isDraw: true,
    });

    this.timerId = delay(() => {
      this.setState(({ isXGoesFirst, gameScore }) => ({
        xIsNext: !isXGoesFirst,
        cells: fill(Array(9), null),
        isDraw: false,
        isXGoesFirst: !isXGoesFirst,
        gameScore: {
          ...gameScore,
          draws: gameScore.draws + 1,
        },
      }), this.isAiShouldMove);
    }, 2500);
  }

  render() {
    const {
      cells,
      winnerLine,
      isDraw,
      gameScore,
      xIsNext,
      isOnePlayerMode,
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
            highlighted={isDraw || isOnePlayerMode}
            isOnePlayerMode={isOnePlayerMode}
            toggleGameMode={this.toggleGameMode}
          />
        </div>
      </div>
    );
  }
}

export default Game;
