import axios from 'axios';

const API_ENDPOINT = process.env.API_ENDPOINT;

export default {
  async login(email, password) {
    const res = await axios.post(`${API_ENDPOINT}/sessions/login`, {
      email,
      password,
    });
    return res;
  },
};
