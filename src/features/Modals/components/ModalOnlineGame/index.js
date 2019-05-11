import React from 'react';
import { compose } from 'redux';
import socketIOClient from 'socket.io-client';
import { PropTypes } from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';

import { SERVER_API_URL } from '../../../../constants/constants';
import withSocket from '../../../../hocs/withSocket';

import './index.scss';

class ModalOnlineGame extends React.Component {
  state = {
    playerName: '',
    roomID: '',
    createdGame: null,
    isJoinGameButtonClicked: false,
    error: '',
    redirectionToGameBoard: false,
  };

  componentDidMount() {
    const { enableSocket } = this.props;

    enableSocket(socketIOClient(SERVER_API_URL));
  }

  componentDidUpdate() {
    const {
      history,
      modalProps,
      socket,
    } = this.props;

    if (socket) {
      socket.on('newGame', ({ name, room }) => {
        this.setState({
          createdGame: {
            name,
            room,
          },
        });
      });

      socket.on('joinGameError', ({ message }) => {
        this.setState({
          error: message,
        });
      });

      socket.on('startGame', () => {
        this.setState({
          redirectionToGameBoard: true,
        }, () => {
          new Promise((fulfilled) => {
            fulfilled(history.push('/online'));
          })
            .then(() => modalProps.onClose());
        });
      });
    }
  }

  componentWillUnmount() {
    const { redirectionToGameBoard } = this.state;
    const { socket, disableSocket } = this.props;

    if (!redirectionToGameBoard && socket) {
      disableSocket();
    }
  }

  transition = props => (<Slide direction="up" {...props} />);

  handlePlayerNameChange = ({ currentTarget: { value } }) => {
    if (value.length > 15) {
      return;
    }

    this.setState({
      playerName: value,
    });
  };

  handleRoomIDChange = ({ currentTarget: { value } }) => {
    if (value.length > 5 || Number.isNaN(+value)) {
      return;
    }

    this.setState({
      roomID: value.trim(),
      error: '',
    });
  };

  handleCreateGameButtonClick = () => {
    const { playerName } = this.state;
    const { socket } = this.props;

    socket.emit('createGame', playerName);
  };

  handleJoinGameButtonClick = () => {
    this.setState({
      isJoinGameButtonClicked: true,
    });
  };

  handleConfirmJoinGameButtonClick = () => {
    const { playerName, roomID } = this.state;
    const { socket } = this.props;

    socket.emit('joinGame', { name: playerName, room: roomID });
  };

  renderCreatedGameInfo() {
    const { createdGame } = this.state;

    return (
      <DialogContent classes={{
        root: 'modal-online-game__content',
      }}
      >
        Send the room ID to another player to start the game:
        <p className="modal-online-game__room-id-info-block">
          <span>
            {createdGame.room}
          </span>
        </p>
      </DialogContent>
    );
  }

  renderEnterNameDialog() {
    const { playerName, isJoinGameButtonClicked } = this.state;

    return (
      <DialogContent classes={{
        root: 'modal-online-game__content',
      }}
      >
        <DialogContentText>
          To play online, please enter your name:
        </DialogContentText>
        <TextField
          autoComplete="off"
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="name"
          fullWidth
          onChange={this.handlePlayerNameChange}
          value={playerName}
          disabled={isJoinGameButtonClicked}
        />
      </DialogContent>
    );
  }

  renderEnterRoomIdDialog() {
    const { roomID, error } = this.state;

    return (
      <DialogContent classes={{
        root: 'modal-online-game__content',
      }}
      >
        <DialogContentText>
          Enter the ID of the room you want to join:
        </DialogContentText>
        <TextField
          autoComplete="off"
          error={!!error}
          autoFocus
          margin="dense"
          id="room"
          label="room"
          type="room"
          fullWidth
          onChange={this.handleRoomIDChange}
          value={roomID}
        />
        {error && (
          <p className="modal-online-game__error-message">
            {error}
          </p>
        )}
      </DialogContent>
    );
  }

  render() {
    const { isModalShown, modalProps: { onClose } } = this.props;
    const {
      playerName,
      createdGame,
      isJoinGameButtonClicked,
      roomID,
    } = this.state;

    return (
      <div>
        <Dialog
          TransitionComponent={this.transition}
          disableBackdropClick
          open={isModalShown}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
          classes={{
            paper: 'modal-online-game',
          }}
        >
          <DialogTitle
            id="form-dialog-title"
            className="modal-online-game__title"
          >
            Online Mode
            <IconButton aria-label="Close" onClick={onClose}>
              <Icon>
                close icon
              </Icon>
            </IconButton>
          </DialogTitle>
          {!createdGame && this.renderEnterNameDialog()}
          {createdGame && this.renderCreatedGameInfo()}
          {isJoinGameButtonClicked && this.renderEnterRoomIdDialog()}
          <DialogActions>
            {!createdGame && !isJoinGameButtonClicked && (
              <>
                <Button
                  onClick={this.handleCreateGameButtonClick}
                  color="primary"
                  disabled={!playerName}
                >
                  Create Game
                </Button>
                <Button
                  onClick={this.handleJoinGameButtonClick}
                  color="primary"
                  disabled={!playerName}
                >
                  Join Game
                </Button>
              </>
            )}
            {isJoinGameButtonClicked && (
              <Button
                onClick={this.handleConfirmJoinGameButtonClick}
                color="primary"
                disabled={!roomID || !playerName}
              >
                Confirm
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ModalOnlineGame.propTypes = {
  isModalShown: PropTypes.bool.isRequired,
  modalProps: PropTypes.shape(Object).isRequired,
  history: PropTypes.shape(Object).isRequired,
  socket: PropTypes.shape(Object),
  disableSocket: PropTypes.func.isRequired,
  enableSocket: PropTypes.func.isRequired,
};

ModalOnlineGame.defaultProps = {
  socket: null,
};

export default compose(
  withSocket,
  withRouter,
)(ModalOnlineGame);
