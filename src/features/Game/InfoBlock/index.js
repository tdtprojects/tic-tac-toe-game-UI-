import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

import './index.scss';

const InfoBlock = ({
  gameScore,
  xIsNext,
  highlighted,
  isOnePlayerMode,
  toggleGameMode,
}) => (
  <div className={classNames(
    'info-block',
    { 'info-block--highlighted': highlighted },
  )}
  >
    <div className={classNames(
      'info-block__player1-column',
      { 'info-block__player1-column--highlighted': xIsNext },
    )}
    >
      <span>
        Player 1 (X)
      </span>
      <span className="info-block__scores">
        {gameScore.xWins}
      </span>
    </div>
    <div className="info-block__draws-column">
      <span>
        –
      </span>
      <span className="info-block__scores">
        {gameScore.draws}
      </span>
    </div>
    <div className={classNames(
      'info-block__player2-column',
      { 'info-block__player2-column--highlighted': !xIsNext },
    )}
    >
      <span>
        {isOnePlayerMode ? 'AI (O)' : 'Player 2 (O)'}
      </span>
      <span className="info-block__scores">
        {gameScore.oWins}
      </span>
    </div>
    <button
      className="info-block__toggle-mode-button"
      type="button"
      onClick={toggleGameMode}
    >
      <Icon className="info-block__mode-icon">
        {isOnePlayerMode ? 'person' : 'people'}
      </Icon>
      {isOnePlayerMode ? '1P' : '2P'}
    </button>
  </div>
);

InfoBlock.propTypes = {
  gameScore: PropTypes.shape({
    xWins: PropTypes.number.isRequired,
    oWins: PropTypes.number.isRequired,
    draws: PropTypes.number.isRequired,
  }).isRequired,
  xIsNext: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool.isRequired,
  isOnePlayerMode: PropTypes.bool.isRequired,
  toggleGameMode: PropTypes.func.isRequired,
};

export default InfoBlock;
