import { combineReducers } from 'redux';
import {
  userInfoReducer,
  sideNav,
  outterNav,
  profileImage,
  userProfile,
  setAccountType,
  setAccounts,
  toggleAddCardModal,
  filterInstrument,
  setHotStocks,
  transactionNav
} from './reducers';

export default combineReducers({
  user: userInfoReducer,
  sideNav,
  transactionNav,
  outterNav,
  profileImage,
  userProfile,
  setAccountType,
  setAccounts,
  showAddCardModal: toggleAddCardModal,
  filter: filterInstrument,
  topStocks: setHotStocks,
});
