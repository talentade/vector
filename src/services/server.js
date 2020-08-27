import Api from './api';
import app from './app';
import axios from 'axios';
import sha256 from 'sha256';

export default {
  // register(credentials) {
  //   return Api().post('/signup/form', credentials);
  // },
  // login(credentials) {
  //   credentials.password = sha256(credentials.password);
  //   console.log(credentials);
  //   return Api().post('/login/user', credentials);
  // },
  // verifyEmail(id, otp) {
  //   return Api().get(`/signup/verifyOTP?context=email&user_id=${id}&otp=${otp}`)
  // },
  // verifyPhone(id, otp) {
  //   return Api().get(`/signup/verifyOTP?context=phone_number&user_id=${id}&otp=${otp}`)
  // },
  // getMeeting (user_id) {
  //   let Authorization = user_id;
  //   return axios.request({
  //     method: 'GET',
  //     url: 'https://avariz-core.herokuapp.com/utils/calendar/booking/history',
  //     headers: {
  //       'Authorization': app.auth()
  //     }
  //   });
  // },
  // bookMeeting (user_id, email, year, month, day, h, m, am_pm) {
  //   let Authorization = user_id;
  //   return axios.request({
  //     method: 'POST',
  //     url: 'https://avariz-core.herokuapp.com/calendar/meeting/new?year='+year+'&month='+(month > 9 ? month : ""+month)+'&day='+(day > 9 ? day : ""+day)+'&h='+(h > 9 ? h : ""+h)+'&m='+(m > 9 ? m : ""+m)+'&am_pm='+am_pm+'&dur_h=1&dur_m=30',
  //     headers: {
  //       'Authorization': app.auth()
  //     },
  //     data: {
  //           "meeting_title" :         "Scheduled call with broker",
  //           "meeting_description":    "We're meeting for 30 minutes, to talk about the basics of trading on Avariz platform",
  //           "meeting_host" :          "dean@avarizgroup.com",
  //           "meeting_participants" :  [email]
  //         }
  //   });
  // },
  // getProfile() {
  //   return axios.request({
  //     method: 'GET',
  //     url: `https://avariz-core.herokuapp.com/profile/fetch/${app.email()}/${app.id()}`,
  //     headers: { 'Authorization': app.auth() }
  //   });
  // },
  // addAccount(account, pwd) {
  //   return axios.request({
  //     method: 'GET',
  //     url: 'https://avariz-core.herokuapp.com/signup/secondary/form',
  //     headers: {
  //       'Authorization': app.auth(),
  //       'auth': app.auth(),
  //       'password': sha256(pwd),
  //       'account_type': account
  //     },
  //     // data: {account: app.account(), password: pwd}
  //   });
  // },
  // getAllPairs() {
  //   return axios.request({
  //     method: 'GET',
  //     url: 'https://avariz-core.herokuapp.com/trading/pairs/fetch?category=all&account='+app.account(),
  //     headers: {'Authorization': app.auth()}
  //   })
  // },
  // historicalData (pair, time = "10D") {
  //   return axios.request({
  //     method: 'GET',
  //     url: 'https://avariz-core.herokuapp.com/trading/data/historical?pair='+pair+'&timecode='+time+'&email='+app.email(),
  //     headers: {'Authorization': app.auth()}
  //   });
  // },
  // sendEmail(firstName, lastName, email, otp) {
  //   return Api().get(`/utils/sendEmail/verifyEmail?context=Email&first_name=${firstName}&last_name=${lastName}&email=${email}&otp=${otp}&otp_verification_link=https://avariz-app.herokuapp.com/VerifyEmail`);
  // },
  // sendSMS(phone, otp) {
  //   return Api().get(`/utils/sendSMS/verifyPhoneNumber?phone_number=${phone}&otp=${otp}`);
  // },
  // getMarketAndNewsData() {
  //   return axios.request({
  //     method: 'GET',
  //     url:  `https://avariz-core.herokuapp.com/trading/market?account=`+app.account(),
  //     headers: {'Authorization': app.auth()}
  //   })
  // },
  // fundAccount(amount, currency, account) {
  //   return axios.request({
  //     method: 'GET',
  //     url:  `https://avariz-core.herokuapp.com/wallet/fund?email=${app.email()}&account=${account}&currency=${currency}&amount=${amount}&tx_type=CREDIT&tx_code=FA`,
  //     headers: {
  //       'Authorization': app.auth(),
  //     }
  //   })
  // },
  // transferFunds(from, to, amount, currency) {
  //   return axios.request({
  //     method: 'GET',
  //     url:  'https://avariz-core.herokuapp.com/wallet/transfer?email='+app.email()+'&payer_account='+from+'&currency='+currency+'&amount='+amount+'&payee_account='+to,
  //     headers: {
  //       'Authorization': app.auth(),
  //     }
  //   })
  // },
  // placeOrder(mode, pair, pip, lots, margin, order) {
  //   console.log(order);
  //   return axios.request({
  //     method: 'PUT',
  //     url: 'https://avariz-core.herokuapp.com/wallet/'+mode+'/order?email='+app.email()+'&account='+app.account()+'&currency='+pair.split(" ")[0].trim(),
  //     headers: {
  //       'Authorization': app.auth()
  //     },
  //     data: {
  //       order: order
  //       // {
  //       //   "pip_value" : pip,
  //       //   "volume_lots": lots,
  //       //   "required_margin" : margin,
  //       //   "stop_loss" : null, // {"configs" : null},
  //       //   "take_profit" : null, // {"configs" : null},
  //       //   "sell_when" : null, // {"configs" : null}
  //       // }
  //     }
  //   });
  // },  
  // getTransactionHistory(email, id, page_size, page_no, account) {
  //   return axios.request({
  //     method: 'GET',
  //     url:  `https://avariz-core.herokuapp.com/wallet/history?email=${email}&account=${app.account()}&tracker_code=transactions&pageSize=${page_size}&thisPage=${page_no}`,
  //     headers: {
  //       'Authorization': app.auth(),
  //     }
  //   })
  // },
  // loadCore(user_id, link) {
  //   let Authorization = user_id;
  //   return axios.request({
  //     method: 'GET',
  //     url: link,
  //     headers: {
  //       'Authorization': app.auth()
  //     }
  //   });
  // },






  register(credentials) {
    credentials.password = sha256(credentials.password);
    return axios.request({
      method: 'POST',
      url: app.hostURL('register'),
      data: credentials
    });
  },

  login(credentials) {
    credentials.password = sha256(credentials.password);
    return axios.request({
      method: 'POST',
      url: app.hostURL('login'),
      data: credentials
    });
  },

  verifyEmail(otp) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('verify/email'),
      data: {user: app.userid(), otp}
    });
  },

  verifyPhone(otp) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('verify/phone'),
      data: {user: app.userid(), otp}
    });
  },

  getMeeting () {
    return axios.request({
      method: 'GET',
      url: app.hostURL('calls/'+app.userid()),
    });
  },

  bookMeeting (year, month, day, h, m, am_pm) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('call/new/'+app.userid()),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        type:    "meeting",
        year:    year,
        month:   month > 9 ? month : "0"+month,
        day:     day > 9 ? day : "0"+day,
        h:       h > 9 ? h : "0"+h,
        m:       m > 9 ? m : "0"+m,
        md:      am_pm
      }
    });
  },

  getProfile() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('profile/'+app.userid()),
      headers: {
        'Authorization': app.auth()
      }
    });
  },

  addAccount(name, account, pwd) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('account/new/'+app.userid()),
      headers: {
        'Authorization': app.auth(),
      },
      data: {
        name: name,
        account: account,
        password: sha256(pwd)
      }
    });
  },

  getAllPairs() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('instruments'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  historicalData (pair, time = "1Y", ft = null) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('historical/'+pair.replace(/\//g, "_")+'/'+time),
      headers: {
        'Authorization': app.auth()
      },
      data: ft
    });
  },

  getMarketAndNewsData() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('pairdata/'+app.account()),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  fundAccount(amount, currency, account) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('deposit/'+account),
      headers: {
        'Authorization': app.auth(),
      },
      data : { currency, amount, time: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) }
    })
  },
  
  transferFunds(from, to, amount, currency) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('transfer/'+from),
      headers: {
        'Authorization': app.auth(),
      },
      data : { currency, currency, account: to, amount: amount, time: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) }
    })
  },

  placeOrder (data) {
    let mode = data.mode;
    delete data.mode;
    return axios.request({
      method: 'POST',
      url: app.hostURL('trade/'+mode+'/'+app.account()),
      headers: {
        'Authorization': app.auth()
      },
      data: data
    });
  },

  getTransactionHistory(page_size, page_no) {
    return axios.request({
      method: 'GET',
      url: app.hostURL('history?page='+page_no+'&max='+page_size),
      headers: {
        'Authorization': app.auth(),
      },
    })
  },

  fetchNews() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('news'),
      headers: {
        'Authorization': app.auth(),
      },
    })
  },

  loadLink(link) {
    return axios.request({
      method: 'GET',
      url: app.hostURL(link),
      headers: {
        'Authorization': app.auth()
      }
    });
  },



















  changePassword(credentials, Authorization, email) {
    return axios.request({
      method: 'PUT',
      url: `https://avariz-core.herokuapp.com/profile/changePassword/${email}`,
      headers: {
        'Authorization': app.auth()
      },
      data: credentials,
    });
  },
  getId(email) {
    return Api().get(`/utils/inspect/${email}/user_id`);
  },
  getPairHistory(user_id, pair, hr) {
    let Authorization = user_id;
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/trading/data/historical?pair='+pair+'&timecode='+hr+'H&email='+localStorage.getItem("email"),
      headers: {'Authorization': app.auth()}
    })
  },
  uploadImage(id, credentials) {
    return axios.request({
      method: 'POST',
      url: 'https://avariz-core.herokuapp.com/utils/upload/profile_image/'+app.id(),
      headers: {
        'Authorization': app.auth()
      },
      data: credentials
    });
  },
  addNewCard(credentials) {
    return axios.request({
      method: 'POST',
      url: 'https://avariz-core.herokuapp.com/profile/addCard',
      headers: {
        'Authorization': app.auth()
      },
      data: credentials
    });
  },
  deleteCard(id, PAN) {
    return axios.request({
      method: 'PUT',
      url: 'https://avariz-core.herokuapp.com/profile/removeCard/'+id+'/'+PAN,
      headers: {
        'Authorization': app.auth()
      }
    });
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
  getRealTimeData(pair) {
    return axios.request({
      method: 'GET',
      url:  `https://avariz-core.herokuapp.com/trading/ticker/fetch?pair=${pair}`,
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  // ===============================================================



  newMessageThread (message) {
    return axios.request({
      method: 'POST',
      url: 'https://avariz-core.herokuapp.com/utils/messages/thread/user/new?username='+app.email()+'&account='+app.account(),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        "subject": "Message Follow-up",
        "message": message.trim()
      }
    });
  },

  getMessages () {
    return axios.request({
      method: 'GET',
      url: 'http://avariz-core.herokuapp.com/utils/messages/'+app.email()+'/'+app.account()+'/pull',
      headers: {
        'Authorization': app.auth()
      }
    });
  },

  deleteMeeting (user_id, date, id) {
    let Authorization = user_id;
    let nd = date.split("-");
        // nd[1] = nd[1] > 9 ? parseInt(nd[1]) : "0"+parseInt(nd[1]);
        // nd[2] = nd[2] > 9 ? parseInt(nd[2]) : "0"+parseInt(nd[2]);
        // console.log(nd);
    return axios.request({
      method: 'DELETE',
      url: 'https://avariz-core.herokuapp.com/calendar/meeting/delete/'+nd.join("-")+'/'+id,
      headers: {
        'Authorization': app.auth()
      }
    });
  },

  fetchFav() {
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/trading/favorites/fetch?account='+app.account(),
      headers: {
        'Authorization': app.auth()
      },
      data: {account: app.account()}
    });
  },

  addToFav(user_id, account, pair) {
    let Authorization = user_id;
    return axios.request({
      method: 'PUT',
      url: 'https://avariz-core.herokuapp.com/trading/favorites/add?account='+app.account()+'&pair='+pair.split(" ")[0].trim(),
      headers: {
        'Authorization': app.auth()
      },
      data: {pair: pair, account: app.account()}
    });
  },

  removeFav(user_id, account, pair) {
    let Authorization = user_id;
    return axios.request({
      method: 'PUT',
      url: 'https://avariz-core.herokuapp.com/trading/favorites/remove?account='+app.account()+'&pair='+pair.split(" ")[0].trim(),
      headers: {
        'Authorization': app.auth()
      },
      data: {pair: pair, account: app.account()}
    });
  },

  getAccounts(user_id) {
    let Authorization = user_id;
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/utils/accounts/list',
      headers: {
        'Authorization': app.auth()
      },
    });
  },

  tradeHistory(type, page_size = 10, page = 1) {
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/wallet/history?email='+app.email()+'&account='+app.account()+'&tracker_code='+type+'_trades&pageSize='+page_size+'&thisPage='+page,
      headers: {'Authorization': app.auth()}
    })
  },

  tradeAnalysis(pair, mode, lots) {
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/trading/analysis?pair='+pair.split(" ")[0].trim()+'&mode='+mode+'&account='+app.account()+'&lots='+lots,
      headers: {'Authorization': app.auth()}
    })
  },

  getSeries(pair, interval = 30) {
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/utils/chart/series?pair='+pair+'&interval='+interval,
      headers: {'Authorization': app.auth()}
    })
  },

  addBankingDetails (details) {
    return axios.request({
      method: 'POST',
      url: 'https://avariz-core.herokuapp.com/utils/data/banking/add/'+app.email()+'/'+app.auth(),
      headers: {
        'Authorization': app.auth()
      },
      data: details
    });
  },

  setBankingDetails (id, details) {
    return axios.request({
      method: 'PUT',
      url: 'https://avariz-core.herokuapp.com/utils/data/banking/edit/'+app.email()+'/'+app.auth()+'/'+id,
      headers: {
        'Authorization': app.auth()
      },
      data: {update: details}
    });
  },

  closeTrade (id, instrument) {
    return axios.request({
      method: 'GET',
      url: 'https://avariz-core.herokuapp.com/admin/trades/TI/migrate?trading_account='+app.account()+'&instrument='+instrument+'&TI_id='+id+'&mode1=open&mode2=closed&username='+app.email(),
      headers: {'Authorization': '__AVARIZ_ROBOTIC_CONTROLLER__'}
    })
  }



};
