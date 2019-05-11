import React from 'react';
import { PropTypes } from 'prop-types';
import { isEmpty, range } from 'lodash';
import { compose } from 'redux';

import GameBoard from '../../components/GameBoard';
import InfoBlock from '../../components/InfoBlock';
import Cell from '../../components/GameBoard/Cell';
import withModal from '../../hocs/withModal';
import withSocket from '../../hocs/withSocket';

class GameOnline extends React.Component {
  state = {
    cells: null,
    winnerLine: [],
    isDraw: false,
    gameScore: {
      player1: 0,
      player2: 0,
      draws: 0,
    },
    player1: null,
    player2: null,
    room: null,
  };

  componentDidMount() {
    const { socket, history } = this.props;

    if (!socket) {
      history.push('/');
      return;
    }

    socket.on('game', (data) => {
      const player1 = socket.id === data.player1.id ? data.player1 : data.player2;
      const player2 = socket.id === data.player1.id ? data.player2 : data.player1;

      this.setState({
        ...data,
        player1,
        player2,
      });
    });

    socket.on('playerTurned', (data) => {
      const player1 = socket.id === data.player1.id ? data.player1 : data.player2;
      const player2 = socket.id === data.player1.id ? data.player2 : data.player1;

      this.setState({
        ...data,
        player1,
        player2,
        winnerLine: data.winner ? data.winner.line : [],
      });
    });

    socket.on('winner', (data) => {
      const { player1, player2 } = this.state;

      this.setState({
        gameScore: {
          ...data,
          player1: data[player1.name],
          player2: data[player2.name],
        },
      });
    });

    socket.on('playerDisconnected', (data) => {
      const { showModal, hideModal } = this.props;

      showModal({
        modalType: 'MODAL_INFO',
        modalProps: {
          onClose: () => {
            hideModal();
            history.push('/');
          },
          message: {
            title: `Player "${data.name}" left the game`,
            text: 'You will be redirected to offline mode',
          },
        },
      });
    });
  }

  componentWillUnmount() {
    const { disableSocket, socket } = this.props;

    if (socket) {
      disableSocket();
    }
  }

  handleCellClick = index => () => {
    const {
      player1,
      player2,
      room,
      cells,
      gameScore,
      winnerLine,
    } = this.state;
    const { socket } = this.props;

    if (cells[index] || !isEmpty(winnerLine)) {
      return;
    }

    if (player1.nextTurn) {
      socket.emit('playTurn', {
        cell: index,
        icon: player1.icon,
        room,
        cells,
        player1,
        player2,
        gameScore,
      });
    }
  };

  handleToggleOnlineModeButtonClick = () => {
    const {
      history,
      socket,
      showModal,
      hideModal,
    } = this.props;
    const { room, player1: { id, name } } = this.state;

    showModal({
      modalType: 'MODAL_CONFIRM',
      modalProps: {
        message: 'Are you sure you want to go offline?',
        onClose: () => hideModal(),
        onConfirm: () => {
          hideModal();

          socket.emit('leaveGame', {
            id,
            name,
            room,
          });

          history.push('/');
        },
      },
    });
  };

  renderGameBlock() {
    const {
      cells,
      winnerLine,
      isDraw,
      gameScore,
      player1,
      player2,
    } = this.state;

    if (!cells) {
      return null;
    }

    return (
      <>
        <GameBoard>
          {(range(9).map(index => (
            <Cell
              key={index}
              index={index}
              value={cells[index]}
              onClick={this.handleCellClick(index)}
              isWinnerShown={winnerLine.includes(index)}
              isDrawShown={isDraw}
            />
          )))}
        </GameBoard>
        <InfoBlock
          gameScore={{
            player1: player1 ? gameScore[player1.name] : 0,
            player2: player2 ? gameScore[player2.name] : 0,
            draws: gameScore.draws,
          }}
          xIsNext={player1.nextTurn}
          highlighted={isDraw}
          isOnePlayerMode={false}
          handleToggleOnlineModeButtonClick={this.handleToggleOnlineModeButtonClick}
          toggleOnlineModeButtonName="Play offline"
          player1={player1}
          player2={player2}
        />
      </>
    );
  }

  render() {
    return (
      <div className="game">
        <div className="game__main-block">
          {this.renderGameBlock()}
        </div>
      </div>
    );
  }
}

GameOnline.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  socket: PropTypes.shape(Object),
  disableSocket: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

GameOnline.defaultProps = {
  socket: null,
};

export default compose(
  withModal,
  withSocket,
)(GameOnline);
