export const addUserInformation = (userInfo) => ({
  type: 'ADD_USER_INFO',
  payload: userInfo
});


export const toggleSideNav = () => ({
  type: 'TOGGLE_SIDE_NAV',
});

export const toggleTransactionNav = () => ({
  type: 'TOGGLE_TRANSACTION_NAV',
});

export const toggleOutterNav = () => ({
  type: 'TOGGLE_OUTTER_NAV',
});

export const saveProfilePicture = (payload) => ({
  type: 'SAVE_PROFILE_PICTURE',
  payload,
});

export const saveUserProfile = (payload) => ({
  type: 'SAVE_USER_PROFILE',
  payload,
})

export const setAccountType = (payload) => ({
  type: 'SET_ACCOUNT_TYPE',
  payload,
})

export const setAccounts = (payload) => ({
  type: 'SET_ACCOUNTS',
  payload,
})

export const toggleAddCardModal = () => ({
  type: 'TOGGLE_ADD_CARD_MODAL',
})

export const filterInstrument = (payload) => ({
  type: 'FILTER_INSTRUMENT',
  payload,
})

export const setHotStocks = (payload) => ({
  type: 'SET_HOT_STOCKS',
  payload,
})