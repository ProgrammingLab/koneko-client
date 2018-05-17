import api from '@/api';

export default {
  namespaced: true,
  state: {
    submissions: [],
    pageLimit: 25,
    submissionLength: 0,
    currentPage: 1,
  },
  mutations: {
    setSubmissions(state, submissions) {
      state.submissions = submissions;
    },
    setPageLimit(state, pageLimit) {
      state.pageLimit = pageLimit;
    },
    setSubmissioonLength(state, length) {
      state.submissionLength = length;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  getters: {
    pageLength({ pageLimit, submissionLength }) {
      return Math.ceil(submissionLength / pageLimit);
    },
  },
  actions: {
    async getSubmissions({ commit, rootState }, options = {}) {
      commit('setPageLimit', options.limit || 25);
      commit('setCurrentPage', options.page || 1);
      try {
        const res = await api.getContestSubmissions(
          rootState.koneko.sessionID,
          rootState.koneko.contests.id,
          options,
        );
        commit('setSubmissions', res.data.submissions);
        commit('setSubmissioonLength', res.data.total);
      } catch (e) {
        commit('koneko/contests/setError', e, { root: true });
      }
    },
  },
};
