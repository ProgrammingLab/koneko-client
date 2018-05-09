import api from '@/api';

export default {
  namespaced: true,
  state: {
    languages: null,
    error: null,
  },
  mutations: {
    setLanguages(state, languages) {
      state.languages = languages;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchLanguages({ commit, rootState }) {
      try {
        const res = await api.getLanguages(rootState.koneko.sessionID);
        commit('setLanguages', res.data);
        commit('setError', null);
      } catch (e) {
        this.setError(e);
      }
    },
  },
};
