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
  async logout(sessionID) {
    const res = await axios.delete(`${API_ENDPOINT}/sessions/logout`, getConfig(sessionID));
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
  async getUser(userName) {
    const res = await axios.get(`${API_ENDPOINT}/users/${userName}`);
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
  async getContestProblems(sessionID, contestID) {
    const res = await axios.get(`${API_ENDPOINT}/contests/${contestID}/problems`, getConfig(sessionID));
    return res;
  },
  async getContestStatuses(sessionID, contestID) {
    const res = await axios.get(`${API_ENDPOINT}/contests/${contestID}/statuses`, getConfig(sessionID));
    return res;
  },
  async getContestStandings(sessionID, contestID) {
    const res = await axios.get(`${API_ENDPOINT}/contests/${contestID}/standings`, getConfig(sessionID));
    return res;
  },
  async enterContest(sessionID, contestID) {
    const res = await axios.post(`${API_ENDPOINT}/contests/${contestID}/enter`, {}, getConfig(sessionID));
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
  async updateCaseSetScores(sessionID, problem) {
    const scores = problem.caseSets.map(val => val.point);
    const res = await axios.put(`${API_ENDPOINT}/problems/${problem.id}/cases`, scores, getConfig(sessionID));
    return res;
  },
  async submit(sessionID, val, problemID) {
    const res = await axios.post(`${API_ENDPOINT}/problems/${problemID}/submissions`, val, getConfig(sessionID));
    return res;
  },
  async rejudgeProblem(sessionID, problemID) {
    const res = await axios.post(`${API_ENDPOINT}/problems/${problemID}/rejudge`, null, getConfig(sessionID));
    return res;
  },
  async getLanguages(sessionID) {
    const res = await axios.get(`${API_ENDPOINT}/languages`, getConfig(sessionID));
    return res;
  },
  async sendPasswordResetMail(email) {
    const res = await axios.post(`${API_ENDPOINT}/password_reset`, { email });
    return res;
  },
  async resetPassword(password, token) {
    const res = await axios.post(`${API_ENDPOINT}/password_reset/${token}`, { password });
    return res;
  },
  async verifyPasswordResetToken(token) {
    const res = await axios.get(`${API_ENDPOINT}/password_reset/${token}`);
    return res;
  },
  async verifyEmailConfirmationToken(token) {
    const res = await axios.get(`${API_ENDPOINT}/registrations/${token}`);
    return res;
  },
  async registerUser(user, token) {
    const res = await axios.post(`${API_ENDPOINT}/registrations/${token}`, user);
    return res;
  },
};
