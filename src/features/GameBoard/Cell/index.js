import React from 'react';
import { PropTypes } from 'prop-types';

import './index.scss';

const Cell = ({ index, onClick }) => (
  <div
    className={`cell cell--${index}`}
    onClick={onClick}
    role="button"
  />
);

Cell.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
