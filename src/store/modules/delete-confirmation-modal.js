export default {
  namespaced: true,
  state: {
    isActive: false,
    body: null,
    argument: null,
  },
  mutations: {
    setActive(state, { isActive }) {
      state.isActive = isActive;
    },
    setBody(state, { body }) {
      state.body = body;
    },
    setArgument(state, { argument }) {
      state.argument = argument;
    },
  },
  actions: {
    openDeleteConfirmationModal({ commit }, { body, argument }) {
      commit('setBody', { body });
      commit('setArgument', { argument });
      commit('setActive', { isActive: true });
    },
    closeDeleteConfirmationModal({ commit }) {
      commit('setActive', { isActive: false });
    },
  },
};
