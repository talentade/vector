import Api from './api';
import app from './app';
import axios from 'axios';
import sha256 from 'sha256';

export default {

  register(credentials, a = false) {
    credentials.password = sha256(credentials.password);
    credentials.time     = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    if(a) {
      credentials.a      = 1;
    }
    return axios.request({
      method: 'POST',
      url: app.hostURL('register'),
      data: credentials
    });
  },

  login(credentials) {
    credentials.password = sha256(credentials.password);
    if(app.isAdmin()) {
      credentials.admin  = true;
    }
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

  resendOTP(t) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('resend/'+t),
      data: {user: app.userid()}
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

  resetQue () {
    if(window.source) {
      window.source.cancel("Component got unmounted");
    }
  },

  getProfile(uid = null) {
    if(window.source) {
      window.source.cancel("Component got unmounted");
    } window.source = axios.CancelToken.source();
    return axios.request({
      method: 'GET',
      cancelToken: window.source.token,
      url: app.hostURL('profile/'+app.noCache()),
      headers: {
        'Authorization': uid ? uid : app.auth()
      }
    });
  },

  addAccount(name, account, pwd, uid = null) {
    let data = {
      u: uid,
      name: name,
      account: account,
      password: sha256(pwd)
    };

    if(uid) {
      data["admin"] = true;
    }

    return axios.request({
      method: 'POST',
      url: app.hostURL('account/new/'+app.userid()),
      headers: {
        'Authorization': app.auth(),
      },
      data: data
    });
  },

  addInstrument(ain) {
    ain.time = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/newInstrument'),
      headers: {
        'Authorization': app.auth(),
      },
      data: ain
    });
  },

  deleteInstrument(id, sym) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/deleteIns/'+id),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        s: sym
      }
    });
  },

  updateInstrument(id, data) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/updateIns/'+id),
      headers: {
        'Authorization': app.auth()
      },
      data: data
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
      url: app.hostURL('pairdata/'+app.account()+app.noCache("?")),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getCalls() {
    return axios.request({
      method: 'GET',
      url: "https://trading.avarizgroup.com/zadarma/?records",
      headers: {
        'Authorization': app.auth()
      }
    })
  },
  
  fundAccount(amount, currency, account, uid = null, use = "", ps = "") {
    if(ps.length) {
      ps = sha256(ps);
    }
    return axios.request({
      method: 'POST',
      url: app.hostURL('deposit/'+account),
      headers: {
        'Authorization': uid ? uid : app.auth(),
      },
      data : {
        currency,
        amount,
        use,
        ps,
        u: uid ? app.auth() : null,
        time: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
      }
    })
  },

  withdrawFunds(amount, currency, account, to) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('withdraw/'+account),
      headers: {
        'Authorization': app.auth(),
      },
      data : { amount, currency, to, time: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}) }
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
    if(window.source) {
      window.source.cancel("Component got unmounted");
    } window.source = axios.CancelToken.source();
    return axios.request({
      method: 'GET',
      cancelToken: window.source.token,
      url: app.hostURL('history?page='+page_no+'&max='+page_size+app.noCache("&")),
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

  closeTrade (id, account, cr, uid = null) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('closetrade/'+account),
      headers: {
        'Authorization': uid ? uid : app.auth()
      },
      data: {
        use: id,
        rate: cr
      }
    });
  },

  newsImage (fd) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('upload-doc/news'),
      headers: {
        'Authorization': app.auth()
      },
      data: fd
    });
  },

  uploadImage(fd) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('upload-doc/profile-img'),
      headers: {
        'Authorization': app.auth()
      },
      data: fd
    });
  },

  uploadDoc(fd, type) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('upload-doc/'+type),
      headers: {
        'Authorization': app.auth()
      },
      data: fd
    });
  },

  changePassword(credentials) {
    credentials.old_password = sha256(credentials.old_password);
    credentials.new_password = sha256(credentials.new_password);
    return axios.request({
      method: 'PUT',
      url: app.hostURL('changePassword'),
      headers: {
        'Authorization': app.auth()
      },
      data: credentials,
    });
  },

  addNewCard(card) {
    card.time = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    return axios.request({
      method: 'POST',
      url: app.hostURL('addCard'),
      headers: {
        'Authorization': app.auth()
      },
      data: card
    });
  },

  deleteCard(id, PAN, uid = null) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('removeCard/'+PAN+'/'+id),
      headers: {
        'Authorization': uid ? uid : app.auth()
      }
    });
  },

  setBankingDetails (data) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('bankingDetails'),
      headers: {
        'Authorization': app.auth()
      },
      data
    });
  },

  getAllUsers() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/users'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getAllAdmins() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/admins'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getUstat() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/ustat'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getFstat() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/fstat'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getAllTask() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/getTasks'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getAllWithdrawals() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/withdrawals'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  processWReq(s, id) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/preq/'+id),
      headers: {
        'Authorization': app.auth()
      },
      data: { s }
    });
  },

  deletePreq(id, uid) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/deletepreq/'+id),
      headers: {
        'Authorization': app.auth()
      },
      data: { u: uid }
    });
  },

  getAllInstrument() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/instruments'),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getUser(u) {
    return axios.request({
      method: 'GET',
      url: app.hostURL('userprofile/'+u),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  getAdmin(u) {
    return axios.request({
      method: 'GET',
      url: app.hostURL('adminprofile/'+u),
      headers: {
        'Authorization': app.auth()
      }
    })
  },

  changeMeetStatus(uid, id, stat) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/user/mstat/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        m: id,
        s: stat
      }
    });
  },

  changeTaskStatus(uid, id, stat) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/user/tstat/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        t: id,
        s: stat
      }
    });
  },

  changeTransferStatus(uid, stat) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/tstat/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        s: stat
      }
    });
  },

  assignAdmin(uid, aid) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/aid/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        aid: aid,
        time: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
      }
    });
  },

  KYCStatus(uid, stat) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/kyc/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        s: stat
      }
    });
  },

  changeLeverage(uid, acc, lev) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/ulev/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        l: lev,
        a: acc
      }
    });
  },

  saveNote(uid, title, note) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/takenote/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        note: note,
        title: title,
        creator: app.name(),
        creator_id: app.id(),
        time: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
      }
    });
  },

  saveNews(data) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/saveNews'),
      headers: {
        'Authorization': app.auth()
      },
      data: data
    });
  },

  sendEmail(data) {
    data.time = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/sendEmail'),
      headers: {
        'Authorization': app.auth()
      },
      data: data
    });
  },

  getNews() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/getNews'),
      headers: {
        'Authorization': app.auth()
      }
    });
  },

  deleteNews(id) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/deleteNews/'+id),
      headers: {
        'Authorization': app.auth()
      },
      data: null
    });
  },

  deleteUser(uid) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/deleteUser/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: null
    });
  },

  saveFunnel(data) {
    data.time = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/saveFunnel'),
      headers: {
        'Authorization': app.auth()
      },
      data: data
    });
  },

  newStage(data) {
    data.time = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/newStage'),
      headers: {
        'Authorization': app.auth()
      },
      data: data
    });
  },

  updateFunnel(uid, fdata) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/ufunnel/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: fdata
    });
  },

  updateUserDetails(uid, valus) {
    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/uudet/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: valus
    });
  },

  getFunnels() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/getFunnels'),
      headers: {
        'Authorization': app.auth()
      }
    });
  },

  getStages(id) {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/getStages/'+id),
      headers: {
        'Authorization': app.auth()
      }
    });
  },

  updateNote(nid, title, note) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/updatenote/'+nid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        note: note,
        title: title,
        time: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
      }
    });
  },

  deleteNote(uid, id) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/delete/note/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        n: id
      }
    });
  },

  saveTask(uid, data) {
    data.creator = app.name();
    data.creator_id = app.id();
    data.time = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});

    return axios.request({
      method: 'POST',
      url: app.hostURL('admin/newtask/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: data
    });
  },

  updateTask(nid, data) {
    data.creator = app.name();
    data.creator_id = app.id();
    data.time = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});

    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/updatetask/'+nid),
      headers: {
        'Authorization': app.auth()
      },
      data: data
    });
  },

  deleteTask(uid, id) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/delete/task/'+uid),
      headers: {
        'Authorization': app.auth()
      },
      data: {
        t: id
      }
    });
  },

  savePermissions(p) {
    return axios.request({
      method: 'PUT',
      url: app.hostURL('admin/savePermissions'),
      headers: {
        'Authorization': app.auth()
      },
      data: { p }
    });
  },

  savedPermissions() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/savedPermissions'),
      headers: {
        'Authorization': app.auth()
      }
    });
  },

  chatList() {
    return axios.request({
      method: 'GET',
      url: app.hostURL('admin/chats'),
      headers: {
        'Authorization': app.auth()
      }
    });
  },

};