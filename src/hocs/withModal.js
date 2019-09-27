import React from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from '../features/Modals/actions';

const withModal = (Component) => {
  const Wrapper = (props) => (
    <Component {...props} />
  );

  return connect(
    null,
    { showModal, hideModal },
  )(Wrapper);
};

export default withModal;
