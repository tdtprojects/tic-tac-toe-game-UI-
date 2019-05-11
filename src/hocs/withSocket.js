import React from 'react';
import { connect } from 'react-redux';

import { enableSocket, disableSocket } from '../features/GameOnline/actions';

const mapStateToProps = state => ({
  socket: state.gameOnline.socket,
});

const withSocket = (Component) => {
  const Wrapper = props => (
    <Component {...props} />
  );

  return connect(
    mapStateToProps,
    { enableSocket, disableSocket },
  )(Wrapper);
};

export default withSocket;
