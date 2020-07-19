export default {
  id: () => {
    return localStorage.getItem("id").toLowerCase();
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
  accountDetail: () => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    let account = profile[localStorage.getItem("accountType")];
        account = account.live ? account.live : account.demo;
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
  profile: () => {
    return JSON.parse(localStorage.getItem("profile"));
  },
};