import api from '@/api';

export default {
  namespaced: true,
  state: {
    contests: null,
    error: null,
  },
  mutations: {
    setContests(state, contests) {
      state.contests = contests;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchAllContests({ commit, rootState }) {
      try {
        const res = await api.getContests(rootState.koneko.sessionID);
        commit('setContests', res.data);
        commit('setError', null);
      } catch (e) {
        commit('setContests', null);
        commit('setError', e);
      }
    },
  },
};
