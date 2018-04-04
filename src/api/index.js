import axios from 'axios';

const API_ENDPOINT = process.env.API_ENDPOINT;

function getAuthHeader(sessionID) {
  return { Authorization: `Bearer ${sessionID}` };
}

function getConfig(sessionID) {
  return { headers: getAuthHeader(sessionID) };
}

export default {
  async login(email, password) {
    const res = await axios.post(`${API_ENDPOINT}/sessions/login`, {
      email,
      password,
    });
    return res;
  },
  async getWorkers(sessionID) {
    const res = await axios.get(`${API_ENDPOINT}/workers`, getConfig(sessionID));
    return res;
  },
};
