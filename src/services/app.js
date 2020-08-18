const app = {
  id: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile.user_id;
  },
  userid: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile.user_id;
  },
  auth: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile.user_id;
  },
  account: (a = "") => {
    if(a.length) {
      return localStorage.setItem("avariz_active", a);
    }
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    if(!profile.accounts.length) return "";
    if(localStorage.getItem("avariz_active") && Object.values(app.accounts()).indexOf(localStorage.getItem("avariz_active")) > 0) {
      return localStorage.getItem("avariz_active");
    } else {
      localStorage.setItem("avariz_active", profile.accounts[0].account_name);
      return profile.accounts[0].account_name;
    }
  },
  accountDetail: (acc = null) => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    if(!profile.accounts.length) return [];
    let selectd = acc ? acc : (app.account() || profile.accounts[0].account_name);
    let ret     = null;
    profile.accounts.forEach((acc2) => {
      if(selectd.toLowerCase() == acc2["account_name"].toLowerCase()) {
        ret = acc2;
      }
    });
    return ret;
  },
  allPairs: (a = null) => {
    return a ? localStorage.setItem('avariz_pairs', JSON.stringify(a)) : JSON.parse(localStorage.getItem('avariz_pairs') || '{}');
  },
  accounts: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    let accounts = [];
    profile.accounts.forEach((acc) => {
      accounts.push(acc["account_name"]);
    });
    return accounts;
  },
  email: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile.email.trim();
  },
  phone: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile.phone_number.trim();
  },
  retryLimit: 10,
  profile: (p = null) => {
    if(p) {
      localStorage.setItem('avariz_profile', JSON.stringify(p));
    }
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile;
  },
  info: (i = null) => {
    if(i) {
      localStorage.setItem('avariz_info', JSON.stringify(i));
    }
    return JSON.parse(localStorage.getItem("avariz_info"));
  },
  hostURL: (url, type = 0) => {
    let live = !true;
    if(type > 0) {
      return live ? "wss://avarizserver.herokuapp.com/" : "ws://localhost:3003";
    } else {
      return live ? "https://avarizserver.herokuapp.com/"+url : "http://localhost:3003/"+url;
    }
  },
  isAdmin: () => {
    return false;
  },
  floatFormat: (x, dp = 4, txt = false) => {
    let currency = parseFloat(parseFloat(x).toFixed(dp));
    return txt ? currency.toLocaleString('en-US', {minimumFractionDigits: dp}) : currency;
  }
};

export default app;