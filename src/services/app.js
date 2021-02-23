export default {
  access_token: (t = "") => {
  	t.length ? localStorage.setItem("vec_token", t) : localStorage.getItem("vec_token");
  },
  logout: () => {
  	localStorage.removeItem("vec_token");
  	window.location.href = "/Login";
  },
  loggedIn: () => {
  	return (localStorage.getItem("vec_token") || "").length > 0;
  }
}