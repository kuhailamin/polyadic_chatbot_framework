import axios from "axios";

export const BASE_URL = "https://polyadic2-6ea021d6a043.herokuapp.com/";

export const api = axios.create({
  baseURL: BASE_URL,
});
