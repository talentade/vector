const app = {
  uid: (u) => {
    u = u.split("-");
    return u[u.length - 1].toUpperCase();
  },
  id: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile.user_id;
  },
  time: () => {
    return new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
  },
  name: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return (profile.first_name+" "+profile.last_name).ucwords();
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
  leverage: () => {
    return parseInt(app.accountDetail()["leverage"].replace("1:", ""));
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
  accountList: () => {
    let profile = JSON.parse(localStorage.getItem("avariz_profile"));
    if(!profile) window.location.href = "/login";
    return profile.accounts;
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
    let live = true;
    if(type > 0) {
      return live ? "wss://avarizserver.herokuapp.com/" : "ws://localhost:3003";
    } else {
      return live ? "https://avarizserver.herokuapp.com/"+url : "http://localhost:3003/"+url;
    }
  },
  isAdmin: () => {
    return !false;
  },
  cleanDate: (d) => {
    return d.trim().replace(/-/g, "/").replace(/,/g, "");
  },
  cleanTime: (d) => {
    return d.trim().replace(/,/g, "").split(" ")[1];
  },
  altField: (f) => {
    return f ? (f.trim().length ? f : "NOT STATED") : "NOT STATED";
  },
  floatFormat: (x, dp = 5, txt = false) => {
    if(dp < 0) {
      let rst = String(x);
      // alert(rst+" "+(rst.length+dp));
      return Number(rst.substr(0, rst.length+dp));
    }
    let currency = parseFloat(parseFloat(x).toFixed(dp));
    return txt ? currency.toLocaleString('en-US', {minimumFractionDigits: dp}) : currency;
  },
  noCache: (x = "/") => {
    return (x != "/" ? x+'nocache=' : '')+(new Date().getTime());
  },
  guessTimate: (x, raw = false) => {
    let str = String(x).substr(0, 7);
    let chill = Math.floor((Math.random() * 100) + 1);
    if(!raw || chill <= 30) {
      return Number(str);
    }
    var y = Math.random();
        y = y < 0.5 ? Math.floor(y) : Math.ceil(y);
    let bfd = parseInt(str);
    let afd = str.split(".")[1];
    if(afd && afd.length > 1) {
      let scp = Math.floor((Math.random() * 5));
      let af_ = String(Number(afd)+(y ? scp : -scp));
      let rpt = afd.length-af_.length;
      let _fd = Number(String(bfd)+"."+(rpt > 0 ? "0".repeat(rpt) : "")+af_);
      return _fd;
    } else {
      return Number(str);
    }
  }
};

export default app;
