import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const Cell = ({ index, onClick }) => (
  <button
    className={classNames('cell', `cell--${index}`)}
    onClick={onClick}
    type="button"
  />
);

Cell.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
