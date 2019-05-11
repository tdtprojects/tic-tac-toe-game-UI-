import { ENABLE_SOCKET, DISABLE_SOCKET } from './types';

const initialState = {
  socket: null,
};

const gameOnlineReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ENABLE_SOCKET:
      return {
        socket: payload,
      };

    case DISABLE_SOCKET:
      state.socket.disconnect();

      return {
        socket: null,
      };

    default:
      return state;
  }
};

export default gameOnlineReducer;
