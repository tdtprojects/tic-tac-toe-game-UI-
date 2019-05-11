import { combineReducers } from 'redux';

import modal from '../features/Modals/reducer';
import gameOnline from '../features/GameOnline/reducer';

export default combineReducers({
  modal,
  gameOnline,
});
