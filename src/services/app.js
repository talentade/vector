export default {
  id: function () {
    return localStorage.getItem("id").toLowerCase();
  },
  auth: function () {
    return localStorage.getItem("id").toLowerCase();
  },
  account: function () {
    return localStorage.getItem("accountType");
  },
  accounts: function () {
    return JSON.parse(localStorage.getItem('accounts'));
  },
  email: function () {
    return localStorage.getItem("email").trim();
  }
};