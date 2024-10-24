import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://192.168.1.11:8000/',
  headers: {
    "Content-Type": "application/json"
  },
});

export default Axios;
