import http from "../http-common";

const TOKEN = "Token 0e1dc1e6594382de8033e25ea962ef3f288039f7";
let options = { headers: {
    'Authorization': TOKEN,
    'Access-Control-Allow-Origin': "*",
    'Content-Type': "application/json;charset=utf-8"
  }
}
class PatientDataService {
  getAll() {
    return http.get("/consultation/patients/", options);
  }

  get(id) {
    return http.get(`/consultation/patients/${id}`, options);
  }

  create(data) {
    return http.post("/consultation/patients/", data, options);
  }

  update(id, data) {
    return http.put(`/consultation/patients/${id}`, data, options);
  }

  delete(id) {
    return http.delete(`/consultation/patients/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new PatientDataService();