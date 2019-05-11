import { ENABLE_SOCKET, DISABLE_SOCKET } from './types';

export const enableSocket = payload => ({
  type: ENABLE_SOCKET,
  payload,
});

export const disableSocket = payload => ({
  type: DISABLE_SOCKET,
  payload,
});
