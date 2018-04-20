import axios from 'axios';

const API_ENDPOINT = process.env.API_ENDPOINT;

function getAuthHeader(sessionID) {
  return { Authorization: `Bearer ${sessionID}` };
}

function getConfig(sessionID) {
  return {
    headers: getAuthHeader(sessionID),
  };
}

export default {
  async login(email, password) {
    const res = await axios.post(`${API_ENDPOINT}/sessions/login`, {
      email,
      password,
    });
    return res;
  },
  async getSelf(sessionID) {
    const res = await axios.get(`${API_ENDPOINT}/user`, getConfig(sessionID));
    return res;
  },
  async getWorkers(sessionID) {
    const res = await axios.get(`${API_ENDPOINT}/workers`, getConfig(sessionID));
    return res;
  },
  async getWhiteEmails(sessionID) {
    const res = await axios.get(`${API_ENDPOINT}/white_emails`, getConfig(sessionID));
    return res;
  },
  async addWhiteEmail(sessionID, email) {
    const res = await axios.post(`${API_ENDPOINT}/white_emails`, { Email: email }, getConfig(sessionID));
    return res;
  },
  async deleteWhiteEmail(sessionID, id) {
    const res = await axios.delete(`${API_ENDPOINT}/white_emails/${id}`, getConfig(sessionID));
    return res;
  },
  async getUsers(sessionID) {
    const res = await axios.get(`${API_ENDPOINT}/users`, getConfig(sessionID));
    return res;
  },
  async createContest(sessionID, contest) {
    const res = await axios.post(`${API_ENDPOINT}/contests`, contest, getConfig(sessionID));
    return res;
  },
};
