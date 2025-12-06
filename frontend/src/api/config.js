import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://xlense-analytics-2-d369.onrender.com/api',
  timeout: 10000,
});

export default instance;
