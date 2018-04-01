import axios from 'axios';

const baseURL = 'http://localhost:9000';

export default {
  async login(email, password) {
    const res = await axios.post(`${baseURL}/sessions/login`, {
      email,
      password,
    });
    return res;
  },
};
