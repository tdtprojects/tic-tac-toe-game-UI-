import { SHOW_MODAL, HIDE_MODAL } from './types';

const initialState = {
  isModalShown: false,
  modalProps: {},
  modalType: null,
};

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_MODAL:
      return {
        isModalShown: true,
        modalProps: payload.modalProps,
        modalType: payload.modalType,
      };

    case HIDE_MODAL:
      return {
        ...state,
        isModalShown: false,
        modalType: null,
      };

    default:
      return state;
  }
};

export default modalReducer;
