export const userInfoReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "ADD_USER_INFO":
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        gender: payload.gender,
        otpPhone: payload.otpPhone,
        otpEmail: payload.otpEmail,
        id: payload.id,
      }

    default:
      return state;
  }
};

export const sideNav = (state = false, { type }) => {
  switch (type) {
    case "TOGGLE_SIDE_NAV":
      return !state;

    default:
      return state;
  }
};

export const transactionNav = (state = false, { type }) => {
  switch (type) {
    case "TOGGLE_TRANSACTION_NAV":
      return !state;

    default:
      return state;
  }
};

export const outterNav = (state = false, { type }) => {
  switch (type) {
    case "TOGGLE_OUTTER_NAV":
      return !state;

    default:
      return state;
  }
};

export const profileImage = (state = '', { type, payload }) => {
  switch (type) {
    case "SAVE_PROFILE_PICTURE":
      return payload;

    default:
      return state;
  }
};

export const userProfile = (state = {}, { type, payload }) => {
  switch (type) {
    case "SAVE_USER_PROFILE":
      return payload;

    default:
      return state;
  }
};

export const setAccounts = (state = [], { type, payload }) => {
  switch (type) {
    case "SET_ACCOUNTS":
      return payload

    default:
      return state;
  }
}

export const setAccountType = (state = '', { type, payload }) => {
  switch (type) {
    case "SET_ACCOUNT_TYPE":
      return payload

    default:
      return state;
  }
};

export const toggleAddCardModal = (state = false, { type }) => {
  switch (type) {
    case "TOGGLE_ADD_CARD_MODAL":
      return !state

    default:
      return state;
  }
};

export const filterInstrument = (state = '', { type, payload }) => {
  switch (type) {
    case "FILTER_INSTRUMENT":
      return payload;

    default:
      return state;
  }
};

export const setHotStocks = (state = [], { type, payload }) => {
  switch (type) {
    case "SET_HOT_STOCKS":
      return payload;

    default:
      return state;
  }
};
