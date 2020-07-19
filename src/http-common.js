import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let token = "Token " + cookies.get("token");
const BASE_URL = "http://127.0.0.1:7000";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  }
});
