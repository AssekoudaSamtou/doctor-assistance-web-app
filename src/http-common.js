import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let token = "Token " + cookies.get("token");
// alert(process.env.API_URL);
// console.log(process.env.API_URL);
const BASE_URL = "https://doctorassistance.herokuapp.com";
// const BASE_URL = "http://127.0.0.1:7000";
// const BASE_URL = process.env.API_URL || "http://127.0.0.1:7000";

export {BASE_URL};
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  }
});
