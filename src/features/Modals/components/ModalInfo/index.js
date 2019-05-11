import React from 'react';
import { PropTypes } from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './index.scss';

const ModalInfo = ({
  isModalShown,
  modalProps: {
    onClose,
    message,
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
      <DialogTitle
        classes={{
          root: 'modal-info__title',
        }}
        id="alert-dialog-slide-title"
      >
        <p className="modal-info__title-text">
          {message.title}
        </p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Ok
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
