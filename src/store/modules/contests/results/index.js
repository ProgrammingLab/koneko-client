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
      return Math.ceil(resultLength / pageLimit);
    },
  },
  actions: {
    async getResults({ commit, rootState, state }, options = {}) {
      const localOptions = {
        limit: options.limit || state.pageLimit,
        page: options.page || state.currentPage,
      };
      commit('setPageLimit', localOptions.limit);
      commit('setCurrentPage', localOptions.page);
      try {
        const res = await api.getContestResults(
          rootState.koneko.sessionID,
          rootState.koneko.contests.id,
          localOptions,
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
