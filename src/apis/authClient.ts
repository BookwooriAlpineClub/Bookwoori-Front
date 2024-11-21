import apiUrl from "@src/constants/apiUrl";
import axios, { AxiosInstance } from "axios";

const authClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default authClient;