const axiosOrigin = require('axios');

const axios = axiosOrigin.create({
  baseURL: process.env.IOT_HUB
});

axios.defaults.headers.common['Authorization'] = process.env.IOT_SAS;

export default axios