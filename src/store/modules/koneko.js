import api from '@/api';
import dashboard from './dashboard';

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
      // エラーハンドリングの方法これでいいかわからない
      try {
        const res = await api.login(email, password);
        commit('setSessionID', res.data.token);
        commit('setError', null);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
  modules: {
    dashboard,
  },
};
