import api from '@/api';

export default {
  namespaced: true,
  state: {
    submissions: [],
    pageLimit: 25,
    submissionLength: 0,
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
  },
  getters: {
    pageLength({ pageLimit, submissionLength }) {
      return Math.ceil(submissionLength / pageLimit);
    },
  },
  actions: {
    async getSubmittions({ commit, rootState }, options = {}) {
      commit('setPageLimit', options.limit || 25);
      try {
        const res = await api.getContestSubmittions(
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
