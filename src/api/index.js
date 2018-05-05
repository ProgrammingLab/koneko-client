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
  async getContest(sessionID, contestID) {
    const res = await axios.get(`${API_ENDPOINT}/contests/${contestID}`, getConfig(sessionID));
    return res;
  },
  async updateContest(sessionID, contest) {
    const res = await axios.put(`${API_ENDPOINT}/contests/${contest.id}`, contest, getConfig(sessionID));
    return res;
  },
  async createContestProblem(sessionID, contestID, problem) {
    const res = await axios.post(`${API_ENDPOINT}/contests/${contestID}/problems/new`, problem, getConfig(sessionID));
    return res;
  },
  async deleteProblem(sessionID, problemID) {
    const res = await axios.delete(`${API_ENDPOINT}/problems/${problemID}`, getConfig(sessionID));
    return res;
  },
  async getProblem(sessionID, problemID) {
    const res = await axios.get(`${API_ENDPOINT}/problems/${problemID}`, getConfig(sessionID));
    return res;
  },
  async updateProblem(sessionID, problem) {
    const res = await axios.put(`${API_ENDPOINT}/problems/${problem.id}`, problem, getConfig(sessionID));
    return res;
  },
  async uploadTestCases(sessionID, problemID, file) {
    const res = await axios.post(`${API_ENDPOINT}/problems/${problemID}/cases/upload`, file, getConfig(sessionID));
    return res;
  },
};
