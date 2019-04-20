import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const InfoBlock = ({ gameScore, xIsNext, isDraw }) => (
  <div className={classNames(
    'info-block',
    { 'info-block--highlighted': isDraw },
  )}
  >
    <table className="info-block__table">
      <tbody>
        <tr>
          <td className={classNames(
            'info-block__player1-column',
            { 'info-block__player1-column--highlighted': xIsNext },
          )}
          >
            Player 1 (X)
          </td>
          <td>
            –
          </td>
          <td className={classNames(
            'info-block__player2-column',
            { 'info-block__player2-column--highlighted': !xIsNext },
          )}
          >
            Player 2 (O)
          </td>
        </tr>
        <tr>
          <td className={classNames(
            'info-block__player1-column',
            { 'info-block__player1-column--highlighted': xIsNext },
          )}
          >
            {gameScore.xWins}
          </td>
          <td>
            {gameScore.draws}
          </td>
          <td className={classNames(
            'info-block__player2-column',
            { 'info-block__player2-column--highlighted': !xIsNext },
          )}
          >
            {gameScore.oWins}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

InfoBlock.propTypes = {
  gameScore: PropTypes.shape({
    xWins: PropTypes.number.isRequired,
    oWins: PropTypes.number.isRequired,
    draws: PropTypes.number.isRequired,
  }).isRequired,
  xIsNext: PropTypes.bool.isRequired,
  isDraw: PropTypes.bool.isRequired,
};

export default InfoBlock;
