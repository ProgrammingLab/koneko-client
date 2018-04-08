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
    addWhiteEmail(state, email) {
      state.whiteEmails.push(email);
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchWhiteEmails({ commit }, { sessionID }) {
      try {
        const res = await api.getWhiteEmails(sessionID);
        // ソート済みかどうかは保証されていないので
        res.data.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (b.id < a.id) {
            return 1;
          }
          return 0;
        });
        commit('setWhiteEmails', res.data);
        commit('setError', null);
      } catch (e) {
        commit('setError', e);
      }
    },
    async addWhiteEmail({ commit }, { sessionID, email }) {
      try {
        await api.addWhiteEmail(sessionID, email);
        commit('setError', null);
      } catch (e) {
        commit('setError', e);
      }
    },
    async deleteWhiteEmail({ commit }, { sessionID, id }) {
      try {
        await api.deleteWhiteEmail(sessionID, id);
        commit('setError', null);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
