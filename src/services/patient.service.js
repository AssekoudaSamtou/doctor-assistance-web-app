import http from "../http-common";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let token = "Token " + cookies.get("token");

let options = {
  headers: {
    'Authorization': token,
  }
};

class PatientDataService {
  getAll() {
    return http.get("/patients/", options);
  }

  get(id) {
    return http.get(`/patients/${id}/`, options);
  }

  create(data) {
    return http.post("/patients/", data, options);
  }

  update(id, data) {
    return http.put(`/patients/${id}/`, data, options);
  }

  delete(id) {
    return http.delete(`/patients/${id}/`, options);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new PatientDataService();