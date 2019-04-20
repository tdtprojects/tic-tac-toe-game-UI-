import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Cell = ({
  index,
  value,
  onClick,
  isWinnerShown,
  isDrawShown,
}) => {
  const cellClassNames = classNames('cell', `cell--${index}`,
    { 'cell--winner-highlighted': isWinnerShown },
    { 'cell--draw-highlighted': isDrawShown });

  return (
    <button
      className={cellClassNames}
      onClick={onClick}
      type="button"
    >
      {
        value && (
          <span className="cell__value">
            {value}
          </span>
        )
      }
    </button>
  );
};

Cell.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  isWinnerShown: PropTypes.bool,
  isDrawShown: PropTypes.bool,
};

Cell.defaultProps = {
  value: null,
  isWinnerShown: null,
  isDrawShown: null,
};

export default Cell;
