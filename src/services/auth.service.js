import http from "../http-common";


class AuthService {
  login(data) {
    return http.post("/login/", data);
  }

  register(data) {
    return http.post(`/register/`, data);
  }
}

export default new AuthService();