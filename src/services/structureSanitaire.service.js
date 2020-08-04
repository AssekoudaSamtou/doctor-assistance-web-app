import http from "../http-common";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let token = "Token " + cookies.get("token");

let options = {
  headers: {
    'Authorization': token,
  }
};

class StructureSanitaireDataService {
  getAll() {
    return http.get("/structureSanitaires/", options);
  }

  getMine() {
    return http.get("/structureSanitaires/my/", options);
  }

  get(id) {
    return http.get(`/structureSanitaires/${id}/`, options);
  }

  create(data) {
    return http.post("/structureSanitaires/", data, options);
  }

  update(id, data) {
    return http.put(`/structureSanitaires/${id}/`, data, options);
  }

  delete(id) {
    return http.delete(`/structureSanitaires/${id}/`, options);
  }
}

export default new StructureSanitaireDataService();