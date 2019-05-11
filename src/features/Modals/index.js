import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import MODAL_ONLINE_GAME from './components/ModalOnlineGame';
import MODAL_INFO from './components/ModalInfo';
import MODAL_CONFIRM from './components/ModalConfirm';

const Modal = (props) => {
  const { modalType, isModalShown } = props;

  const MODAL_TYPES = {
    MODAL_ONLINE_GAME,
    MODAL_INFO,
    MODAL_CONFIRM,
  };

  const SpecificModal = MODAL_TYPES[modalType];

  if (!isModalShown) return null;

  return (
    <SpecificModal {...props} />
  );
};

Modal.propTypes = {
  modalType: PropTypes.string,
  isModalShown: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  modalType: null,
};

const mapStateToProps = state => ({
  isModalShown: state.modal.isModalShown,
  modalProps: state.modal.modalProps,
  modalType: state.modal.modalType,
});

export default connect(mapStateToProps)(Modal);
