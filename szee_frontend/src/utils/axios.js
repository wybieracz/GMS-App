import { default as axiosOrigin } from "axios";

const axios = axiosOrigin.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL
})

export default axios