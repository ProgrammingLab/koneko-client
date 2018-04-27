export default {
  namespaced: true,
  state: {
    isActive: false,
    body: null,
  },
  mutations: {
    setActive(state, { isActive }) {
      state.isActive = isActive;
    },
    setBody(state, { body }) {
      state.body = body;
    },
  },
  actions: {
    openInformationModel({ commit }, body) {
      commit('setBody', { body });
      commit('setActive', { isActive: true });
    },
    closeInformationModel({ commit }) {
      commit('setActive', { isActive: false });
    },
  },
};
