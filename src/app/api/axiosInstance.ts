import axios from 'axios';
// import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.openf1.org/v1',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});
