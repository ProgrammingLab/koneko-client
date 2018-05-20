import api from '@/api';
import detail from './detail';

export default {
  namespaced: true,
  state: {
    results: [],
    pageLimit: 25,
    resultLength: 0,
    currentPage: 1,
  },
  mutations: {
    setResults(state, results) {
      state.results = results;
    },
    setPageLimit(state, pageLimit) {
      state.pageLimit = pageLimit;
    },
    setResultLength(state, length) {
      state.resultLength = length;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  getters: {
    pageLength({ pageLimit, resultLength }) {
      // 0件の時でも1ページはある
      return Math.max(Math.ceil(resultLength / pageLimit), 1);
    },
  },
  actions: {
    async getResults({ commit, rootState }, options = {}) {
      commit('setPageLimit', options.limit || 25);
      commit('setCurrentPage', options.page || 1);
      try {
        const res = await api.getContestResults(
          rootState.koneko.sessionID,
          rootState.koneko.contests.id,
          options,
        );
        commit('setResults', res.data.submissions);
        commit('setResultLength', res.data.total);
      } catch (e) {
        commit('koneko/contests/setError', e, { root: true });
      }
    },
  },
  modules: {
    detail,
  },
};
