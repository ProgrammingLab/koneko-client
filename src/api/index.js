import axios from 'axios';

const baseURL = 'http://localhost:9000';

function getAuthHeader(sessionID) {
  return { Authorization: `Bearer ${sessionID}` };
}

function getConfig(sessionID) {
  return { headers: getAuthHeader(sessionID) };
}

export default {
  async login(email, password) {
    const res = await axios.post(`${baseURL}/sessions/login`, {
      email,
      password,
    });
    return res;
  },
  async getWorkers(sessionID) {
    const res = await axios.get(`${baseURL}/workers`, getConfig(sessionID));
    return res;
  },
};
