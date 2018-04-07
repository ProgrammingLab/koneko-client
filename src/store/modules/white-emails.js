import api from '@/api';

export default {
  namespaced: true,
  state: {
    whiteEmails: null,
    error: null,
  },
  mutations: {
    setWhiteEmails(state, emails) {
      state.whiteEmails = emails;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchWhiteEmails({ commit }, { sessionID }) {
      try {
        const res = await api.getWhiteEmails(sessionID);
        commit('setWhiteEmails', res.data);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
