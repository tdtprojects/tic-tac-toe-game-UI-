import React from 'react';
import { PropTypes } from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalInfo = ({
  isModalShown,
  modalProps: {
    onClose,
    message,
    onConfirm,
  },
}) => {
  const Transition = props => (<Slide direction="up" {...props} />);

  return (
    <Dialog
      open={isModalShown}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          Yes
        </Button>
        <Button onClick={onClose} color="primary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalInfo.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  modalProps: PropTypes.shape(Object).isRequired,
};

export default ModalInfo;
