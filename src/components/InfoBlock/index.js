import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import './index.scss';

const InfoBlock = ({
  gameScore,
  xIsNext,
  highlighted,
  isOnePlayerMode,
  toggleGameMode,
  handleToggleOnlineModeButtonClick,
  toggleOnlineModeButtonName,
  player1,
  player2,
}) => {
  const renderPlayer1Name = () => (
    player1 ? `${player1.name} (${player1.icon})` : 'Player 1 (X)'
  );

  const renderPlayer2Name = () => {
    if (player2) {
      return `${player2.name} (${player2.icon})`;
    }

    return isOnePlayerMode ? 'AI (O)' : 'Player 2 (O)';
  };

  return (
    <>
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
            {renderPlayer1Name()}
          </span>
          <span className="info-block__scores">
            {gameScore.player1}
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
            {renderPlayer2Name()}
          </span>
          <span className="info-block__scores">
            {gameScore.player2}
          </span>
        </div>
        {toggleGameMode && (
          <button
            className="info-block__toggle-mode-button"
            type="button"
            onClick={toggleGameMode}
            title={isOnePlayerMode ? 'Switch to two player mode' : 'Switch to game mode with AI'}
          >
            <Icon className="info-block__mode-icon">
              {isOnePlayerMode ? 'people' : 'person'}
            </Icon>
            {isOnePlayerMode ? '2P' : '1P'}
          </button>
        )}
      </div>
      <Button
        variant="outlined"
        type="button"
        color="primary"
        fullWidth={false}
        onClick={handleToggleOnlineModeButtonClick}
      >
        {toggleOnlineModeButtonName}
      </Button>
    </>
  );
};

InfoBlock.propTypes = {
  gameScore: PropTypes.shape({
    player1: PropTypes.number.isRequired,
    player2: PropTypes.number.isRequired,
    draws: PropTypes.number.isRequired,
  }).isRequired,
  xIsNext: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool,
  isOnePlayerMode: PropTypes.bool.isRequired,
  toggleGameMode: PropTypes.func,
  handleToggleOnlineModeButtonClick: PropTypes.func.isRequired,
  toggleOnlineModeButtonName: PropTypes.string.isRequired,
  player1: PropTypes.shape(Object),
  player2: PropTypes.shape(Object),
};

InfoBlock.defaultProps = {
  toggleGameMode: null,
  highlighted: false,
  player1: null,
  player2: null,
};

export default InfoBlock;
