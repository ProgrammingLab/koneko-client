import api from '@/api';

export default {
  namespaced: true,
  state: {
    submissionID: null,
    detail: {},
  },
  mutations: {
    setSubmissionID(state, submissionID) {
      state.submissionID = submissionID;
    },
    setDetail(state, detail) {
      state.detail = detail;
    },
  },
  actions: {
    async getDetail({ commit, rootState, state }) {
      try {
        const res = await api.getResultDetail(
          rootState.koneko.sessionID,
          state.submissionID,
        );
        commit('setDetail', res.data);
      } catch (e) {
        commit('koneko/contests/setError', e, { root: true });
      }
    },
  },
};
