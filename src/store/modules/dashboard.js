import api from '@/api';

export default {
  namespaced: true,
  state: {
    workers: null,
    error: null,
  },
  mutations: {
    setWorkers(state, workers) {
      state.workers = workers;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getWorkers({ commit }, { sessionID }) {
      try {
        const res = await api.getWorkers(sessionID);
        commit('setWorkers', res.data);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
