import React from 'react';
import { PropTypes } from 'prop-types';

import './index.scss';

const GameBoard = ({ children }) => (
  <div className="game-board">
    {children}
  </div>
);

GameBoard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default GameBoard;
