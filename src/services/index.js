import axios from "axios";
/* import $router from "@/router"; */

let ServiceAuth = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

let Service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

Service.interceptors.request.use((request) => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  console.log("daj token: ", token);
  try {
    request.headers["Authorization"] = "Bearer " + token;
  } catch (e) {
    console.error(e);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Auth.logout();
    }
  }
);

let Auth = {
  async login(email, password) {
    try {
      let response = await ServiceAuth.post("/auth/user", {
        email: email,
        password: password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error(error.response.data.error);
      return {
        false: false,
        error: error.response.data.error
      };
    }
  },

  logout() {
    localStorage.removeItem("user");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  getUserToken() {
    let user = Auth.getUser();
    console.log("probica: ", user);
    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },

  authenticated() {
    let user = Auth.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  },

  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { ServiceAuth, Service, Auth };
