import api from '@/api';

export default {
  namespaced: true,
  state: {
    users: null,
    error: null,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchUsers({ commit, rootState }) {
      try {
        const res = await api.getUsers(rootState.koneko.sessionID);
        commit('setUsers', res.data);
        commit('setError', null);
      } catch (e) {
        this.setError(e);
      }
    },
  },
};
