import Axios from 'axios'
import config from '../config'

const axios = Axios.create({
    baseURL: config.apiUrl,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
  },
    withXSRFToken: true,
    withCredentials: true,
});

export default axios