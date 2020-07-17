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
      url: 'https://avariz-core.herokuapp.com/trading/pairs/fetch?category=all&showFavs=true&account='+localStorage.getItem("accountType").split("-")[0].toLowerCase(),
      headers: {'Authorization': Authorization}
    })
  },
  getPairHistory(user_id, pair, hr) {
    let Authorization = user_id;
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/trading/data/historical?pair='+pair+'&timecode='+hr+'H&email=adeoyetalent@gmail.com',
      headers: {'Authorization': Authorization}
    })
  },
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
      url:  `https://avariz-core.herokuapp.com/trading/market?&account=`+localStorage.getItem("accountType").split("-")[0].trim().toLowerCase(),
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
  },

  // ===============================================================

  getMeeting (user_id) {
    let Authorization = user_id;
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/utils/calendar/booking/history',
      headers: {
        'Authorization': Authorization
      }
    });
  },

  deleteMeeting (user_id, date, id) {
    let Authorization = user_id;
    return axios.request({
      method: 'DELETE',
      url: 'http://avariz-core.herokuapp.com/calendar/meeting/delete/'+date+'/'+id,
      headers: {
        'Authorization': Authorization
      }
    });
  },

  bookMeeting (user_id, email, year, month, day, h, m, am_pm) {
    let Authorization = user_id;
    return axios.request({
      method: 'POST',
      url: 'http://avariz-core.herokuapp.com/calendar/meeting/new?year='+year+'&month='+month+'&day='+day+'&h='+h+'&m='+m+'&am_pm='+am_pm+'&dur_h=1&dur_m=30',
      headers: {
        'Authorization': Authorization
      },
      data: {
            "meeting_title" :         "Scheduled call with broker", 
            "meeting_description":    "We're meeting for 30 minutes, to talk about the basics of trading on Avariz platform", 
            "meeting_host" :          "dean@avarizgroup.com",
            "meeting_participants" :  [email]
          }
    });
  },

  placeOrderBuy(user_id, email, account, currency) {
    let Authorization = user_id;
    return axios.request({
      method: 'PUT',
      url: 'https://avariz-core.herokuapp.com/wallet/buy/order?email='+email+'&account='+account+'&currency='+currency,
      headers: {
        'Authorization': Authorization
      },
      data: {email: email, currency: currency, account: account}
    });
  },

  fetchFav(user_id, account) {
    // account => [demo, live]
    let Authorization = user_id;
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/trading/favorites/fetch?account='+account,
      headers: {
        'Authorization': Authorization
      },
      data: {account: account}
    });
  },

  addToFav(user_id, account, pair) {
    // account => [demo, live]
    let Authorization = user_id;
    return axios.request({
      method: 'PUT',
      url: 'https://avariz-core.herokuapp.com/trading/favorites/add?account='+account+'&pair='+pair,
      headers: {
        'Authorization': Authorization
      },
      data: {pair: pair, account: account}
    });
  },

  removeFav(user_id, account, pair) {
    // account => [demo, live]
    let Authorization = user_id;
    return axios.request({
      method: 'PUT',
      url: 'https://avariz-core.herokuapp.com/trading/favorites/remove?account='+account+'&pair='+pair,
      headers: {
        'Authorization': Authorization
      },
      data: {pair: pair, account: account}
    });
  },

  tradeHistory(user_id, email, account, type) {
    // type => [pending, open, closed]
    let Authorization = user_id;
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/wallet/history?email='+email+'&account='+account+'&tracker_code=trades.'+type,
      headers: {'Authorization': Authorization}
    })
  },





};