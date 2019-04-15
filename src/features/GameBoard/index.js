import React from 'react';
import Grid from '@material-ui/core/Grid';

import Cell from './Cell';

import './index.scss';

class GameBoard extends React.Component {
  state = {
    cross: [],
    zero: [],
    turn: 'cross',
  };

  handleCellClick = index => () => {
    this.setState((state) => {
      if (state.turn === 'cross') {
        return {
          cross: [...state.cross, index],
          turn: 'zero',
        };
      }
      return {
        zero: [...state.zero, index],
        turn: 'cross',
      };
    }, console.log(this.state));
  };

  render() {
    return (
      <Grid container className="game-board" alignItems="center">
        <Grid item md={12}>
          <Grid container justify="center">
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Cell index={value} onClick={this.handleCellClick(value)} />
              </Grid>
            ))}
          </Grid>
          <Grid container justify="center">
            {[3, 4, 5].map(value => (
              <Grid key={value} item>
                <Cell index={value} onClick={this.handleCellClick(value)} />
              </Grid>
            ))}
          </Grid>
          <Grid container justify="center">
            {[6, 7, 8].map(value => (
              <Grid key={value} item>
                <Cell index={value} onClick={this.handleCellClick(value)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default GameBoard;
