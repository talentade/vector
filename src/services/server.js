import Api from './api';
import axios from 'axios';

export default {
  register(credentials) {
    return Api().post('/signup/form', credentials);
  },
  sendEmail(firstName, lastName, email, otp) {
    return Api().get(`/utils/sendEmail/verifyEmail?context=Email&first_name=${firstName}&last_name=${lastName}&email=${email}&otp=${otp}&otp_verification_link=https://avariz-app.herokuapp.com/VerifyEmail`);
  },
  sendSMS(phone, otp) {
    return Api().get(`/utils/sendSMS/verifyPhoneNumber?phone_number=${phone}&otp=${otp}`);
  },
  verifyEmail(id, otp) {
    return Api().get(`/signup/verifyOTP?context=email&user_id=${id}&otp=${otp}`)
  },
  verifyPhone(id, otp) {
    return Api().get(`/signup/verifyOTP?context=phone_number&user_id=${id}&otp=${otp}`)
  },
  login(credentials) {
    return Api().post('/login/user', credentials);
  },
  getProfile(id, email) {
    // return Api().get(`/profile/fetch/${email}/${id}`)
    let Authorization = id;
    return axios.request({
      method: 'GET',
      url: `https://avariz-core.herokuapp.com/profile/fetch/${email}/${id}`,
      headers: { 'Authorization': Authorization }
    });
  },
  changePassword(credentials, Authorization, email) {
    return axios.request({
      method: 'PUT',
      url: `https://avariz-core.herokuapp.com/profile/changePassword/${email}`,
      headers: {
        'Authorization': Authorization
      },
      data: credentials,
    });
  },
  getId(email) {
    return Api().get(`/utils/inspect/${email}/user_id`);
  },
  getAllPairs(Authorization) {
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/trading/pairs/fetch?category=all',
      headers: {'Authorization': Authorization}
    })
  },
  // addPairs(Authorization, pairs) {
  //   return axios.request({
  //     method: 'PUT',
  //     url: 'https://avariz-core.herokuapp.com/trading/pairs/add?category=all',
  //     headers: {'Authorization': Authorization},
  //     data: pairs,
  //   })
  // },
  // removePairs(Authorization, pairs) {
  //   return axios.request({
  //     method: 'PUT',
  //     url: 'https://avariz-core.herokuapp.com/trading/pairs/remove?category=all',
  //     headers: {'Authorization': Authorization},
  //     data: pairs,
  //   })
  // },
  uploadImage(id, credentials) {
    return Api().post(`/utils/upload/profile_image/${id}`, credentials);
  },
  addNewCard(credentials) {
    return Api().post('profile/addCard', credentials);
  },
  deleteCard(id, PAN) {
    return Api().put(`/profile/removeCard/${id}/${PAN}`);
  },
  getMyProfile(email) {
    return Api().get(`/utils/inspect/${email}/userdata`);
  },
  logout(id, email) {
    return Api().put(`/logout/${email}/${id}`);
  },
  sendResetEmail(email) {
    return Api().get(`/utils/sendEmail/forgotPassword?email=${email}&change_password_link=https://avariz-app.herokuapp.com/ChangePassword`);
  },
  resetPassword(credentials) {
    return Api().post('/utils/resetPassword', credentials);
  },
  getRealTimeData(pair, Authorization) {
    return axios.request({
      method: 'GET',
      url:  `https://avariz-core.herokuapp.com/trading/ticker/fetch?pair=${pair}`,
      headers: {
        'Authorization': Authorization
      }
    })
  },
  getMarketAndNewsData(Authorization) {
    return axios.request({
      method: 'GET',
      url:  `https://avariz-core.herokuapp.com/trading/market`,
      headers: {'Authorization': Authorization}
    })
  },
  fundAccount(email, amount, currency, id, account) {
    return axios.request({
      method: 'GET',
      url:  `https://avariz-core.herokuapp.com/wallet/fund?email=${email}&account=${account}&currency=${currency}&amount=${amount}&tx_type=CREDIT&tx_code=FA`,
      headers: {
        'Authorization': id,
      }
    })
  },
  transferFunds(from, account, currency, amount, to, id) {
    return axios.request({
      method: 'GET',
      url:  `https://avariz-core.herokuapp.com/wallet/transfer?payer_email=${from}&account=${account}&currency=${currency}&amount=${amount}&payee_email=${to}&=`,
      headers: {
        'Authorization': id,
      }
    })
  },
  getTransactionHistory(email, id, page_size, page_no, account) {
    return axios.request({
      method: 'GET',
      url:  `https://avariz-core.herokuapp.com/wallet/history?email=${email}&account=${account}&tracker_code=deposits.all&pageSize=${page_size}&thisPage=${page_no}`,
      headers: {
        'Authorization': id,
      }
    })
  }
};
