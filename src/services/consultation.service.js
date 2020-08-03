import http from "../http-common";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let token = "Token " + cookies.get("token");

let options = {
  headers: {
    'Authorization': token,
  }
};

class ConsultationDataService {
  getAll() {
    return http.get("/consultations/", options);
  }

  get(id) {
    return http.get(`/consultations/${id}/`, options);
  }

  create(data,args=null) {
    if(args.detail=="detail"){
      return http.post(`/consultations/?medecin_pk=${args?.medecin_pk}&structure_sanitaire_pk=${args?.structure_sanitaire_pk}&detail=${args?.detail}`, data, options);
    }else{
      return http.post(`/consultations/`, data, options);
    }
  }

  update(id, data) {
    return http.put(`/consultations/${id}/`, data, options);
  }

  delete(id) {
    return http.delete(`/consultations/${id}/`, options);
  }
}

export default new ConsultationDataService();