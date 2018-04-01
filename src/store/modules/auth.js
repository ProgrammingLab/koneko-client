import api from '@/api';

export default {
  namespaced: true,
  state: {
    sessionID: null,
    error: null,
  },
  mutations: {
    setSessionID(state, ID) {
      state.sessionID = ID;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const res = await api.login(email, password);
        commit('setSessionID', res.data.token);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
