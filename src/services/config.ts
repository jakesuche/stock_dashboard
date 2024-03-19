import axios from "axios";



export const axioInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL,
});
