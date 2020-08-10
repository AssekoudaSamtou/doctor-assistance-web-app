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
  countPatients(data) {
    return http.post("count/patients/", data, options);
  }
  update(id, data) {
    return http.put(`/patients/${id}/`, data, options);
  }

  delete(id) {
    return http.delete(`/patients/${id}/`, options);
  }
}

export default new PatientDataService();