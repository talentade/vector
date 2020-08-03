export default {
  id: () => {
    return (localStorage.getItem("id") ? localStorage.getItem("id").toLowerCase() : false);
  },
  userid: () => {
    return localStorage.getItem("id").toLowerCase();
  },
  auth: () => {
    return localStorage.getItem("id").toLowerCase();
  },
  account: (a = "") => {
    return a.length ? localStorage.setItem("accountType", a) : localStorage.getItem("accountType");
  },
  accountDetail: (acc = null) => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    let selectd = acc ? acc : localStorage.getItem("accountType");
    let account = profile[selectd];
        account = account["demo"] ? account["demo"] : account["live"];
    let ret = [];
    Object.keys(account).forEach(key => {
      if(key.toLowerCase().match(/(demo|live)/g)) {
        ret[key.replace(/(demo_|live_)/g, "")] = account[key];
      } else {
        ret[key] = account[key];
      }
    });
    return ret;
  },
  allPairs: (a = null) => {
    return a ? localStorage.setItem('allPairs', JSON.stringify(a)) : JSON.parse(localStorage.getItem('allPairs'));
  },
  accounts: () => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    let accounts = [];
    Object.keys(profile).forEach(key => {
      if(key.toLowerCase().match(/(demo|live)/g)) {
        accounts.push(key);
      }
    });
    return accounts;
  },
  email: () => {
    return localStorage.getItem("email").trim();
  },
  retryLimit: 10,
  profile: (p = null) => {
    if(p) {
      localStorage.setItem('profile', JSON.stringify(p));
    }
    return JSON.parse(localStorage.getItem("profile"));
  },
  isAdmin: () => {
    return false;
  }
};
