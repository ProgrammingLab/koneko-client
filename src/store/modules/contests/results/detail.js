import api from '@/api';

export default {
  namespaced: true,
  state: {
    detail: null,
  },
  mutations: {
    setDetail(state, detail) {
      state.detail = detail;
    },
  },
  actions: {
    async getDetail({ commit, rootState }, id) {
      try {
        const res = await api.getResultDetail(
          rootState.koneko.sessionID,
          id,
        );
        commit('setDetail', res.data);
      } catch (e) {
        commit('koneko/contests/setError', e, { root: true });
      }
    },
  },
};
