import axios from 'axios';
// import sha256 from 'sha256';

export default {

  login(credentials) {
    // credentials.password = sha256(credentials.password);
    return axios.request({
      method: 'POST',
      url: "http://ticketapi.moshare.link/api/login",
      data: credentials
    });
  }
};